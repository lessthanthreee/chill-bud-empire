
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Gift, 
  CreditCard, 
  Calendar, 
  Mail, 
  Copy, 
  DollarSign, 
  Camera,
  CircleHelp,
  MailCheck 
} from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";

const giftCardAmounts = [25, 50, 75, 100, 150, 200];

const GiftCards = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("email");
  const [designIndex, setDesignIndex] = useState(0);

  // Sample gift card designs
  const giftCardDesigns = [
    {
      name: "Classic Green",
      background: "bg-primary",
      description: "Elegant design with our brand colors"
    },
    {
      name: "Leaf Pattern",
      background: "leaf-pattern",
      description: "Subtle leaf pattern background"
    },
    {
      name: "Minimalist",
      background: "bg-secondary",
      description: "Clean, simple minimalist design"
    },
    {
      name: "Gradient",
      background: "bg-gradient-to-r from-primary/80 to-emerald-600/80",
      description: "Modern gradient effect"
    }
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustomAmount(false);
  };

  const handleCustomAmountToggle = () => {
    setIsCustomAmount(!isCustomAmount);
    if (!isCustomAmount) {
      setCustomAmount("");
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and limit to 3 digits
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '' || (parseInt(value) >= 10 && parseInt(value) <= 500)) {
      setCustomAmount(value);
    }
  };

  const getAmount = () => {
    if (isCustomAmount && customAmount) {
      return parseInt(customAmount);
    }
    return selectedAmount;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Gift Card Purchase Initiated",
      description: `Your $${getAmount()} gift card purchase is being processed. You'll receive further instructions for payment via cryptocurrency.`,
    });
  };

  const handleGiftCardCodeChange = (value: string) => {
    setGiftCardCode(value);
  };

  const handleCheckBalance = () => {
    if (giftCardCode.length < 6) {
      toast({
        title: "Incomplete Code",
        description: "Please enter a complete gift card code.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Checking Balance",
      description: "We're checking the balance for your gift card.",
    });
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Gift Card Balance",
        description: "Your gift card has a balance of $50.00",
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Gift Cards</h1>
        <p className="text-muted-foreground max-w-3xl">
          Share the gift of Delta 8 with friends and family. Our digital gift cards are the perfect 
          present for any occasion, allowing recipients to choose their own products.
        </p>
      </div>

      <Tabs defaultValue="purchase" className="w-full mb-16">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="purchase" className="flex items-center">
            <Gift className="h-4 w-4 mr-2" />
            Purchase a Gift Card
          </TabsTrigger>
          <TabsTrigger value="redeem" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Check Balance & Redeem
          </TabsTrigger>
        </TabsList>

        {/* Purchase Gift Card Tab */}
        <TabsContent value="purchase">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gift Card Preview */}
            <div className="order-2 lg:order-1">
              <h2 className="text-xl font-semibold mb-6">Gift Card Preview</h2>
              
              <div className="mb-6">
                <Label className="text-sm mb-2 block">Select Design</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {giftCardDesigns.map((design, index) => (
                    <div 
                      key={index}
                      className={`
                        h-24 rounded-md cursor-pointer p-1
                        ${designIndex === index ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70'}
                      `}
                      onClick={() => setDesignIndex(index)}
                    >
                      <div className={`${design.background} w-full h-full rounded flex items-center justify-center`}>
                        <span className="text-xs text-white font-medium text-center px-2">
                          {design.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className={`w-full overflow-hidden ${giftCardDesigns[designIndex].background}`}>
                <CardContent className="p-6">
                  <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-white font-bold text-xl">Delta Cannabis</h3>
                        <p className="text-white/90 text-sm">Premium Delta 8 Products</p>
                      </div>
                      <div className="bg-white/30 backdrop-blur-sm p-2 rounded-full">
                        <Gift className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    
                    <div className="text-center my-4">
                      <div className="text-white font-bold text-3xl">
                        ${getAmount()}.00
                      </div>
                      <div className="text-white/90 text-sm mt-1">
                        Gift Card
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between items-end">
                      <div>
                        <div className="text-white/90 text-xs">To:</div>
                        <div className="text-white text-sm font-medium">
                          {deliveryMethod === "email" ? "Email Recipient" : "Print & Share"}
                        </div>
                      </div>
                      <div className="text-white/80 text-xs">
                        Valid online only
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 text-sm text-muted-foreground space-y-2">
                <p>• Gift cards never expire and can be used for any product</p>
                <p>• Recipient must be 21+ years old to redeem</p>
                <p>• Cannot be exchanged for cash</p>
                <p>• Digital gift cards will be delivered via email within 24 hours after payment</p>
              </div>
            </div>

            {/* Gift Card Form */}
            <div className="order-1 lg:order-2">
              <h2 className="text-xl font-semibold mb-6">Purchase a Gift Card</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount Selection */}
                <div className="space-y-3">
                  <Label className="text-base">Select Amount</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {giftCardAmounts.map(amount => (
                      <Button
                        key={amount}
                        type="button"
                        variant={(!isCustomAmount && selectedAmount === amount) ? "default" : "outline"}
                        className="text-lg font-medium"
                        onClick={() => handleAmountSelect(amount)}
                      >
                        ${amount}
                      </Button>
                    ))}
                    <Button
                      type="button"
                      variant={isCustomAmount ? "default" : "outline"}
                      onClick={handleCustomAmountToggle}
                      className="flex items-center justify-center"
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      Custom
                    </Button>
                  </div>
                  
                  {isCustomAmount && (
                    <div className="mt-3">
                      <Label htmlFor="custom-amount">Enter Amount ($10-$500)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="custom-amount"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="pl-10"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Delivery Method */}
                <div className="space-y-3">
                  <Label className="text-base">Delivery Method</Label>
                  <RadioGroup 
                    defaultValue="email" 
                    value={deliveryMethod}
                    onValueChange={setDeliveryMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="delivery-email" />
                      <FormLabel htmlFor="delivery-email" className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email to Recipient
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="print" id="delivery-print" />
                      <FormLabel htmlFor="delivery-print" className="flex items-center">
                        <Copy className="h-4 w-4 mr-2" />
                        Print at Home
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </div>

                {/* Recipient Info (if email delivery) */}
                {deliveryMethod === "email" && (
                  <>
                    <div className="space-y-3">
                      <Label htmlFor="recipient-name">Recipient's Name</Label>
                      <Input id="recipient-name" placeholder="Enter recipient's name" />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="recipient-email">Recipient's Email</Label>
                      <Input id="recipient-email" type="email" placeholder="Enter recipient's email" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="delivery-date">Delivery Date</Label>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <CircleHelp className="h-4 w-4 text-muted-foreground cursor-help" />
                          </HoverCardTrigger>
                          <HoverCardContent>
                            Choose "Send Now" for immediate delivery after purchase, or select a future date for special occasions.
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <Select defaultValue="now">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Send timing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="now">Send Now</SelectItem>
                            <SelectItem value="custom">Select Date</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="space-y-3">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Add a personal message to your gift card"
                    className="resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Max 200 characters
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="your-name">Your Name</Label>
                  <Input id="your-name" placeholder="Enter your name" />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="your-email">Your Email</Label>
                  <Input id="your-email" type="email" placeholder="Enter your email" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I confirm the recipient is 21+ years of age and eligible to use Delta 8 products in Ohio
                  </Label>
                </div>
                
                <Button type="submit" className="w-full">
                  Purchase Gift Card
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        {/* Redeem Gift Card Tab */}
        <TabsContent value="redeem">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Check Gift Card Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="gift-card-code">Enter Gift Card Code</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={giftCardCode}
                      onChange={handleGiftCardCodeChange}
                      render={({ slots }) => (
                        <InputOTPGroup>
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Enter the 6-digit code from your gift card
                  </p>
                </div>
                <Button 
                  onClick={handleCheckBalance} 
                  className="w-full"
                  disabled={giftCardCode.length < 6}
                >
                  Check Balance
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6">How to Redeem</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">During Checkout</h3>
                    <p className="text-muted-foreground text-sm">
                      Apply your gift card code during checkout to pay for your purchase. The balance will be automatically applied to your order total.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <Camera className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Scan Physical Cards</h3>
                    <p className="text-muted-foreground text-sm">
                      If you have a printed gift card, you can scan the QR code or manually enter the 6-digit code during checkout.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Lost Your Code?</h3>
                    <p className="text-muted-foreground text-sm">
                      If you've lost your gift card code, we can help you recover it. Please contact our customer support with your email address and purchase details.
                    </p>
                  </div>
                </div>
              </div>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <MailCheck className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Need Help with Your Gift Card?</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Our team is here to assist you with any questions about your gift card, balance, or redemption.
                      </p>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do digital gift cards work?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our digital gift cards are delivered via email to the recipient (or to you if you choose the print-at-home option). 
                Each card contains a unique code that can be used during checkout to apply the gift card balance to the purchase.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I use multiple gift cards for one purchase?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, you can apply multiple gift cards to a single purchase. During checkout, you'll have the option to add 
                multiple gift card codes. The combined value will be applied to your order total.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do gift cards expire?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No, our gift cards never expire. You can use them at any time for any of our products.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What if the recipient doesn't receive the email?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If the recipient doesn't receive the gift card email, please check their spam folder first. If it's still not there, 
                contact our customer support with your order details, and we'll resend the gift card or help you resolve the issue.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
