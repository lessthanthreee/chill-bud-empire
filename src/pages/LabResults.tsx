
import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const LabResults = () => {
  const labReports = [
    {
      id: "batch-001",
      name: "Batch #125 - March 2025",
      date: "March 15, 2025",
      type: "Full Panel Analysis",
      description: "Complete analysis of contents, potency, and safety.",
      pdfUrl: "#"
    },
    {
      id: "batch-002",
      name: "Batch #124 - February 2025",
      date: "February 22, 2025",
      type: "Full Panel Analysis",
      description: "Complete analysis of contents, potency, and safety.",
      pdfUrl: "#"
    },
    {
      id: "batch-003",
      name: "Batch #123 - January 2025",
      date: "January 18, 2025",
      type: "Full Panel Analysis",
      description: "Complete analysis of contents, potency, and safety.",
      pdfUrl: "#"
    }
  ];

  const SampleLabReport = () => (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Laboratory Analysis Report</h3>
      <div className="mb-4">
        <p><strong>Sample ID:</strong> CCC-2025-{Math.floor(Math.random() * 1000)}</p>
        <p><strong>Product Name:</strong> Delta-8 THC Vape Cartridge</p>
        <p><strong>Batch Number:</strong> {labReports[0].name.split('-')[1].trim()}</p>
        <p><strong>Test Date:</strong> {labReports[0].date}</p>
        <p><strong>Laboratory:</strong> Cleveland Analytics</p>
      </div>
      
      <div className="mb-4">
        <h4 className="font-bold">Cannabinoid Profile</h4>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Cannabinoid</th>
              <th className="p-2 text-right">Result (%)</th>
              <th className="p-2 text-right">Result (mg/g)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="p-2">Delta-8 THC</td>
              <td className="p-2 text-right">91.2%</td>
              <td className="p-2 text-right">912.0</td>
            </tr>
            <tr className="border-t border-border">
              <td className="p-2">CBD</td>
              <td className="p-2 text-right">0.5%</td>
              <td className="p-2 text-right">5.0</td>
            </tr>
            <tr className="border-t border-border">
              <td className="p-2">CBG</td>
              <td className="p-2 text-right">0.3%</td>
              <td className="p-2 text-right">3.0</td>
            </tr>
            <tr className="border-t border-border">
              <td className="p-2">CBN</td>
              <td className="p-2 text-right">0.2%</td>
              <td className="p-2 text-right">2.0</td>
            </tr>
            <tr className="border-t border-border">
              <td className="p-2">Delta-9 THC</td>
              <td className="p-2 text-right">< 0.3%</td>
              <td className="p-2 text-right">< 3.0</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mb-4">
        <h4 className="font-bold">Microbiological Testing</h4>
        <p className="text-green-600 font-semibold">PASS</p>
        <p className="text-sm">All microbiological tests are within acceptable limits.</p>
      </div>
      
      <div className="mb-4">
        <h4 className="font-bold">Residual Solvents</h4>
        <p className="text-green-600 font-semibold">PASS</p>
        <p className="text-sm">All residual solvents are within acceptable limits.</p>
      </div>
      
      <div className="mb-4">
        <h4 className="font-bold">Heavy Metals</h4>
        <p className="text-green-600 font-semibold">PASS</p>
        <p className="text-sm">All heavy metals are within acceptable limits.</p>
      </div>
      
      <div className="mb-4">
        <h4 className="font-bold">Pesticides</h4>
        <p className="text-green-600 font-semibold">PASS</p>
        <p className="text-sm">All pesticide tests are within acceptable limits.</p>
      </div>
      
      <div className="mt-8 text-sm text-muted-foreground">
        <p>This report is for informational purposes only. Actual lab reports may vary in format and content.</p>
        <p>Contact Cleveland Cartridge Co. for complete lab results.</p>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Lab Results | Cleveland Cartridge Co.</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Lab Results</h1>
        
        <div className="mb-8">
          <p className="text-lg mb-4">
            At Cleveland Cartridge Co., quality and safety are our top priorities. We ensure all our products undergo rigorous third-party laboratory testing to verify purity, potency, and safety.
          </p>
          <p className="text-lg mb-4">
            Our testing protocol includes screening for:
          </p>
          <ul className="list-disc pl-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>Potency Analysis</li>
            <li>Residual Solvents</li>
            <li>Pesticides</li>
            <li>Heavy Metals</li>
            <li>Microbial Impurities</li>
            <li>Foreign Materials</li>
          </ul>
          <div className="bg-muted p-4 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold">Important Delta-8 THC Information</h3>
                <p className="text-sm mt-1">
                  Our products contain delta-8 THC derived from hemp and comply with the 2018 Farm Bill, containing less than 0.3% delta-9 THC. 
                  All our products undergo comprehensive testing to ensure they meet safety standards and legal requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labReports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle>{report.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Test Date: {report.date}</p>
                  <p className="text-sm text-muted-foreground mb-3">Type: {report.type}</p>
                  <p className="text-sm mb-4">{report.description}</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full gap-2">
                      <FileText className="h-4 w-4" />
                      <span>View Report</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{report.name} - Lab Report</DialogTitle>
                    </DialogHeader>
                    <SampleLabReport />
                  </DialogContent>
                </Dialog>
                <Button variant="secondary" className="w-full mt-2 gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Understanding Lab Reports</h2>
          <p className="mb-4">
            Our lab reports provide detailed information about the composition and safety of our products. If you have any questions about interpreting these reports, please don't hesitate to contact us.
          </p>
          <p>
            For more information or to request specific test results, please email us at <a href="mailto:labs@clevelandcartridge.com" className="text-primary underline">labs@clevelandcartridge.com</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default LabResults;
