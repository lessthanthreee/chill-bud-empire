
import React from 'react';
import { Truck, Clock, Package, Map, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from '@/components/ui/section-header';

const Shipping = () => {
  const shippingFeatures = [
    {
      icon: <Truck className="h-12 w-12 text-primary" />,
      title: "Same-Day Local Delivery",
      description: "Available in Cleveland area",
      content: "Orders placed before 6 PM EST will be delivered the same day within Cleveland."
    },
    {
      icon: <Package className="h-12 w-12 text-primary" />,
      title: "Nationwide Shipping",
      description: "Available where legal",
      content: "Free shipping on orders over $75. Standard shipping takes 3-5 business days."
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-primary" />,
      title: "Discreet Packaging",
      description: "Privacy guaranteed",
      content: "All orders are shipped in unmarked, discreet packaging for your privacy."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <SectionHeader 
        title="Shipping Policy"
        subtitle="Fast, discreet, and reliable delivery"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shippingFeatures.map((feature, index) => (
          <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
              <CardDescription className="text-center">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                {feature.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-secondary/50 rounded-lg p-8">
          <div className="flex items-center gap-4 mb-4">
            <Map className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Delivery Areas</h2>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Same-day delivery available in Cleveland and surrounding areas</li>
            <li>• Nationwide shipping to states where Delta-8 is legal</li>
            <li>• International shipping not available at this time</li>
          </ul>
        </div>

        <div className="bg-secondary/50 rounded-lg p-8">
          <div className="flex items-center gap-4 mb-4">
            <Clock className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Processing Times</h2>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Local orders: Same-day delivery if placed before 6 PM EST</li>
            <li>• Standard shipping: Orders processed within 24 hours</li>
            <li>• Tracking number provided via email</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
