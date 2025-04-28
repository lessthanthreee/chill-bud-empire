
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, HelpCircle, Truck, CreditCard, Leaf, BookOpen, ShieldCheck, MessageSquare } from "lucide-react";

const faqCategories = [
  { id: "general", label: "General" },
  { id: "products", label: "Products" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "legal", label: "Legal" }
];

const faqItems = [
  // General FAQs
  {
    id: 1,
    question: "What is Delta 8 THC?",
    answer: "Delta 8 THC is a naturally occurring cannabinoid found in the cannabis plant. It's chemically similar to Delta 9 THC (the main psychoactive compound in cannabis) but with some distinct differences in its effects. Delta 8 typically provides a milder, clearer high with less anxiety and paranoia than Delta 9 THC.",
    category: "general"
  },
  {
    id: 2,
    question: "Is Delta 8 legal in Ohio?",
    answer: "Yes, Delta 8 THC is currently legal in Ohio under state and federal law, as long as it is derived from hemp and contains less than 0.3% Delta 9 THC. However, regulations are subject to change, so we always recommend staying updated on current laws.",
    category: "general"
  },
  {
    id: 3,
    question: "Will Delta 8 get me high?",
    answer: "Yes, Delta 8 THC does produce psychoactive effects and will cause a 'high,' though it's generally reported to be milder and clearer than the high from Delta 9 THC. Many users describe it as providing relaxation, euphoria, and mood elevation with less anxiety and paranoia.",
    category: "general"
  },
  {
    id: 4,
    question: "Will Delta 8 show up on a drug test?",
    answer: "Most standard drug tests cannot distinguish between different types of THC metabolites. Since Delta 8 THC metabolizes in a similar way to Delta 9 THC, it can cause a positive result on a drug test. If you're subject to drug testing, you should avoid using Delta 8 products.",
    category: "general"
  },
  
  // Product FAQs
  {
    id: 5,
    question: "What Delta 8 products do you offer?",
    answer: "We offer a wide range of Delta 8 products including gummies, vape cartridges, tinctures, and flower. Each product is available in various strains and flavors to suit different preferences and needs.",
    category: "products"
  },
  {
    id: 6,
    question: "How do I choose the right product for me?",
    answer: "The right product depends on your preferences and desired effects. Gummies and tinctures offer longer-lasting effects but take longer to kick in. Vape cartridges provide faster effects but don't last as long. Consider factors like onset time, duration, discretion, and flavor when choosing a product. Our staff is always happy to provide personalized recommendations.",
    category: "products"
  },
  {
    id: 7,
    question: "Are your products tested for safety?",
    answer: "Absolutely! All our products undergo rigorous third-party testing for potency and purity. We test for cannabinoid content, pesticides, heavy metals, residual solvents, and microbial contaminants. Lab results are available for every batch and can be viewed on our Lab Results page.",
    category: "products"
  },
  {
    id: 8,
    question: "What's the difference between Indica, Sativa, and Hybrid strains?",
    answer: "Indica strains typically provide more relaxing, body-focused effects that may help with sleep and pain relief. Sativa strains tend to offer more energizing, cerebral effects that can enhance creativity and focus. Hybrid strains combine characteristics of both. However, individual experiences may vary based on personal body chemistry and the specific product.",
    category: "products"
  },
  
  // Shipping FAQs
  {
    id: 9,
    question: "Do you ship Delta 8 products?",
    answer: "Yes, we ship within Ohio only. Due to varying state laws regarding Delta 8, we cannot currently ship to other states. For customers in the Columbus area, we also offer local pickup.",
    category: "shipping"
  },
  {
    id: 10,
    question: "How long does shipping take?",
    answer: "Standard shipping within Ohio typically takes 2-4 business days. Expedited shipping options are available at checkout for faster delivery. Local pickup in Columbus is usually available within 24 hours of order placement.",
    category: "shipping"
  },
  {
    id: 11,
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by visiting our Track Order page and entering your order number and email address.",
    category: "shipping"
  },
  
  // Payment FAQs
  {
    id: 12,
    question: "What payment methods do you accept?",
    answer: "Due to banking restrictions, we currently accept cryptocurrency payments only. We accept Bitcoin, Ethereum, and several other popular cryptocurrencies. After placing your order, you'll receive instructions for completing your payment.",
    category: "payment"
  },
  {
    id: 13,
    question: "How do I pay with cryptocurrency if I've never used it before?",
    answer: "If you're new to cryptocurrency, don't worry! After placing your order, we'll send you detailed, step-by-step instructions on how to set up a wallet and make your payment. You can also contact our customer support team for assistance.",
    category: "payment"
  },
  {
    id: 14,
    question: "Do you offer refunds?",
    answer: "We stand behind the quality of our products. If you're not satisfied with your purchase for any reason, please contact us within 14 days of receiving your order. Unopened products in their original packaging may be eligible for a refund or exchange.",
    category: "payment"
  },
  
  // Legal FAQs
  {
    id: 15,
    question: "What is the legal status of Delta 8 in Ohio?",
    answer: "Delta 8 THC derived from hemp containing less than 0.3% Delta 9 THC is currently legal in Ohio under both state law and the 2018 Federal Farm Bill. However, laws and regulations can change, so we recommend staying informed about current legislation.",
    category: "legal"
  },
  {
    id: 16,
    question: "What is the minimum age to purchase Delta 8 products?",
    answer: "You must be 21 years or older to purchase Delta 8 products, both online and in-store. We verify age for all purchases.",
    category: "legal"
  },
  {
    id: 17,
    question: "Is it legal to drive after using Delta 8?",
    answer: "No, it is not legal to drive under the influence of Delta 8 THC. Like alcohol or other substances, Delta 8 can impair your motor skills, reaction time, and judgment. Never drive or operate heavy machinery after consuming Delta 8 products.",
    category: "legal"
  }
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<typeof faqItems>([]);
  const [hasSearched, setHasSearched] = React.useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const results = faqItems.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-3xl">
          Find answers to the most common questions about Delta 8 THC, our products, shipping, 
          payment methods, and more. If you can't find what you're looking for, feel free to contact us.
        </p>
      </div>

      {/* Search */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            Search Results
          </h2>
          
          {searchResults.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <h3 className="text-lg font-medium mb-2">No matches found</h3>
                <p className="text-muted-foreground mb-4">
                  Try different keywords or browse categories below
                </p>
                <Button variant="outline" onClick={() => setHasSearched(false)}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchTerm}"
              </p>
              <Button variant="ghost" size="sm" onClick={() => setHasSearched(false)}>
                Clear Search
              </Button>
              <Accordion type="single" collapsible className="w-full">
                {searchResults.map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4">
                        <p className="text-muted-foreground">{item.answer}</p>
                        <p className="text-sm mt-4">
                          Category: <span className="font-medium capitalize">{item.category}</span>
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      )}

      {/* Categorized FAQs */}
      {!hasSearched && (
        <Tabs defaultValue="general" className="w-full">
          <div className="flex overflow-x-auto pb-2 mb-8">
            <TabsList className="flex-1 md:flex-initial">
              {faqCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                  {category.id === "general" && <HelpCircle className="h-4 w-4 mr-2" />}
                  {category.id === "products" && <Leaf className="h-4 w-4 mr-2" />}
                  {category.id === "shipping" && <Truck className="h-4 w-4 mr-2" />}
                  {category.id === "payment" && <CreditCard className="h-4 w-4 mr-2" />}
                  {category.id === "legal" && <BookOpen className="h-4 w-4 mr-2" />}
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                {category.id === "general" && <HelpCircle className="h-5 w-5 mr-2" />}
                {category.id === "products" && <Leaf className="h-5 w-5 mr-2" />}
                {category.id === "shipping" && <Truck className="h-5 w-5 mr-2" />}
                {category.id === "payment" && <CreditCard className="h-5 w-5 mr-2" />}
                {category.id === "legal" && <BookOpen className="h-5 w-5 mr-2" />}
                {category.label} Questions
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                {faqItems
                  .filter(item => item.category === category.id)
                  .map(item => (
                    <AccordionItem key={item.id} value={`item-${item.id}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground py-2">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                }
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      )}

      <Separator className="my-16" />

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Can't Find Your Answer?</h2>
          <p className="text-muted-foreground mb-6">
            If you couldn't find the information you're looking for, please don't hesitate to reach out. Our 
            knowledgeable team is ready to assist you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Contact Us</h3>
                <p className="text-sm text-muted-foreground">
                  Email us at clevelandcartridge@gmail.com or use our contact form.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Compliance Concerns</h3>
                <p className="text-sm text-muted-foreground">
                  For questions about legal compliance, email clevelandcartridge@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Quick Contact Form</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input id="subject" placeholder="Question subject" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea 
                  id="message" 
                  className="w-full min-h-[120px] px-3 py-2 border rounded-md border-input bg-background"
                  placeholder="Your question or comment"
                ></textarea>
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
