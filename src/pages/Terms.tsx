
import React from 'react';
import { ScrollText, AlertCircle, Check, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from '@/components/ui/section-header';

const Terms = () => {
  const keyTerms = [
    {
      icon: <AlertCircle className="h-8 w-8 text-primary" />,
      title: "Age Requirement",
      content: "You must be 21 years or older to purchase products from Cleveland Cartridge Co. Age verification is required for all purchases."
    },
    {
      icon: <Check className="h-8 w-8 text-primary" />,
      title: "Product Usage",
      content: "Our Delta-8 THC products are intended for use only in jurisdictions where they are legally permitted. Verify your local laws before purchasing."
    },
    {
      icon: <HelpCircle className="h-8 w-8 text-primary" />,
      title: "Return Policy",
      content: "Due to the nature of our products, we cannot accept returns once items have been opened. Damaged or incorrect items will be replaced."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <SectionHeader 
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {keyTerms.map((term, index) => (
          <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 flex items-center justify-center">
                {term.icon}
              </div>
              <CardTitle className="text-center">{term.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">{term.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 space-y-8">
        <div className="bg-secondary/50 rounded-lg p-8">
          <div className="flex items-center gap-4 mb-4">
            <ScrollText className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">FDA Disclaimer</h2>
          </div>
          <p className="text-muted-foreground">
            The statements made regarding these products have not been evaluated by the Food and Drug Administration. 
            The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended 
            to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>

        <div className="bg-secondary/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Payment & Shipping</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Cryptocurrency payments accepted for all orders</li>
            <li>• Shipping available to states where Delta-8 THC is legal</li>
            <li>• Same-day delivery available in Cleveland, Ohio</li>
            <li>• No refunds on opened products</li>
            <li>• Tracking provided for all shipped orders</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Terms;
