
import React from 'react';
import { Shield, Scale, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from '@/components/ui/section-header';

const Legal = () => {
  const legalSections = [
    {
      title: "Compliance & Regulations",
      description: "We strictly adhere to all local and federal regulations regarding Delta-8 THC products.",
      icon: <Shield className="h-12 w-12 text-primary" />,
      content: "Our products contain federally legal hemp derivatives with Delta-9 THC concentration of less than 0.3% on a dry weight basis."
    },
    {
      title: "Age Verification",
      description: "Strict age verification process to ensure compliance with legal requirements.",
      icon: <Scale className="h-12 w-12 text-primary" />,
      content: "We employ rigorous age verification systems to ensure all customers are 21 years or older."
    },
    {
      title: "Documentation",
      description: "Comprehensive legal documentation and transparency.",
      icon: <FileText className="h-12 w-12 text-primary" />,
      content: "All our products come with detailed lab reports and documentation to ensure transparency and compliance."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <SectionHeader 
        title="Legal Information"
        subtitle="Understanding our commitment to compliance and safety"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {legalSections.map((section, index) => (
          <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 flex items-center justify-center">
                {section.icon}
              </div>
              <CardTitle className="text-xl text-center">{section.title}</CardTitle>
              <CardDescription className="text-center">
                {section.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                {section.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 prose max-w-none">
        <div className="bg-secondary/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Our Legal Commitment</h2>
          <p className="text-muted-foreground">
            Cleveland Cartridge Co. is committed to maintaining full compliance with all applicable laws and regulations. 
            We work diligently to ensure our products meet all legal requirements while providing our customers with 
            high-quality, safe Delta-8 THC products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legal;
