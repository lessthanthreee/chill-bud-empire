
import React from 'react';
import { Flask, FileCheck, Search, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from '@/components/ui/section-header';

const LabResults = () => {
  const currentBatch = {
    id: "CC2024-001",
    date: "April 2024",
    thcContent: "94.2%",
    delta9Content: "<0.3%",
    terpenes: ["β-Caryophyllene", "Limonene", "α-Humulene"],
    testing: ["Heavy Metals", "Pesticides", "Residual Solvents", "Microbiological"]
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <SectionHeader 
        title="Laboratory Results"
        subtitle="Transparency through third-party testing"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Flask className="h-12 w-12 text-primary" />
            </div>
            <CardTitle>Current Batch Analysis</CardTitle>
            <CardDescription>Batch ID: {currentBatch.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Cannabinoid Profile</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Delta-8 THC Content: {currentBatch.thcContent}</li>
                  <li>Delta-9 THC Content: {currentBatch.delta9Content}</li>
                </ul>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Key Terpenes</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {currentBatch.terpenes.map((terpene, index) => (
                    <li key={index}>{terpene}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <FileCheck className="h-12 w-12 text-primary" />
            </div>
            <CardTitle>Safety Testing</CardTitle>
            <CardDescription>Comprehensive Analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentBatch.testing.map((test, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>{test} - Passed</span>
                </div>
              ))}
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  All tests performed by ISO-certified laboratories. 
                  Full lab reports available upon request.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-primary/20">
          <CardHeader>
            <Search className="h-8 w-8 text-primary mx-auto" />
            <CardTitle className="text-center">Batch Lookup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Every product includes a QR code linking to its specific lab results
            </p>
          </CardContent>
        </Card>

        <Card className="border border-primary/20">
          <CardHeader>
            <Flask className="h-8 w-8 text-primary mx-auto" />
            <CardTitle className="text-center">Testing Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Each batch undergoes rigorous testing before release
            </p>
          </CardContent>
        </Card>

        <Card className="border border-primary/20">
          <CardHeader>
            <Shield className="h-8 w-8 text-primary mx-auto" />
            <CardTitle className="text-center">Quality Guarantee</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Products exceeding quality standards are never released
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabResults;
