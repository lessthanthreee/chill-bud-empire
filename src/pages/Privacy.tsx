
import React from 'react';
import { Lock, Shield, Eye, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from '@/components/ui/section-header';

const Privacy = () => {
  const privacyPolicies = [
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Data Security",
      content: "We employ industry-standard encryption and security measures to protect your personal information. All sensitive data is encrypted both in transit and at rest."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Information Collection",
      content: "We collect only essential information needed to process your orders and verify your age. This includes your name, shipping address, and age verification documents."
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Data Usage",
      content: "Your information is used solely for order processing, shipping, and compliance purposes. We never share or sell your personal data to third parties."
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "Data Retention",
      content: "We retain your data only for as long as necessary to provide our services and comply with legal requirements. You can request data deletion at any time."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <SectionHeader 
        title="Privacy Policy"
        subtitle="How we protect and handle your personal information"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {privacyPolicies.map((policy, index) => (
          <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-4">
                {policy.icon}
                <CardTitle>{policy.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{policy.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 space-y-8">
        <div className="bg-secondary/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Right to access your personal data</li>
            <li>Right to correct inaccurate information</li>
            <li>Right to request deletion of your data</li>
            <li>Right to opt-out of marketing communications</li>
            <li>Right to file a complaint with relevant authorities</li>
          </ul>
        </div>

        <div className="bg-secondary/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            For any privacy-related concerns or requests, please contact us at:
            <br />
            Email: contact@clevelandcartridge.co
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
