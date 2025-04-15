
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card,
  CardContent 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ClockIcon, MapPin, MailIcon, PhoneIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null, 
            subject: formData.subject,
            message: formData.message
          }
        ]);
        
      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions about our products or need assistance? We're here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-lg mb-2">Location</h3>
                    <p className="text-muted-foreground">Cleveland, Ohio</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <MailIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-lg mb-2">Email Us</h3>
                    <p className="text-muted-foreground">contact@clevelandcartridge.co</p>
                    <p className="text-muted-foreground">orders@clevelandcartridge.co</p>
                    <p className="text-muted-foreground">info@clevelandcartridge.co</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <ClockIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-lg mb-2">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 10am - 8pm</p>
                    <p className="text-muted-foreground">Saturday: 10am - 6pm</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number (Optional)
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Select value={formData.subject} onValueChange={handleSelectChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-question">Product Question</SelectItem>
                        <SelectItem value="order-status">Order Status</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="text-sm text-muted-foreground mb-4">
                  <p>
                    By submitting this form, you confirm that you are 21 years of age or older.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Find Us</h2>
        <div className="border border-border rounded-lg overflow-hidden h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94940.49317622156!2d-81.73183590777925!3d41.49932699645865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830ef2ee3686b2d%3A0xed04cb55f7621842!2sCleveland%2C%20OH!5e0!3m2!1sen!2sus!4v1681737626037!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
          ></iframe>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="my-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium text-lg mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept cryptocurrency payments for all online orders, including Bitcoin, Ethereum, and other major cryptocurrencies. Payment instructions will be sent via email after your order is placed.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium text-lg mb-2">
                Do you ship nationwide?
              </h3>
              <p className="text-muted-foreground">
                Yes, we ship to all states where Delta-8 is legal. We offer same-day delivery in Cleveland and standard shipping to legal states nationwide. Free shipping on orders over $75!
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium text-lg mb-2">
                Are your products lab-tested?
              </h3>
              <p className="text-muted-foreground">
                Yes, all of our products undergo rigorous third-party lab testing for purity and potency. Lab results are available in the Lab Results section of our website.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium text-lg mb-2">
                Is my information secure?
              </h3>
              <p className="text-muted-foreground">
                Absolutely. We use industry-standard encryption to protect all customer data. We never share or sell your personal information, and your shipping address is stored securely using advanced encryption protocols.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
