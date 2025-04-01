
import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const LabResults = () => {
  const labReports = [
    {
      id: "batch-001",
      name: "Batch #001 - January 2023",
      date: "January 15, 2023",
      type: "Full Panel Analysis",
      description: "Complete analysis of contents, purity, and safety.",
      pdfUrl: "#"
    },
    {
      id: "batch-002",
      name: "Batch #002 - March 2023",
      date: "March 22, 2023",
      type: "Full Panel Analysis",
      description: "Complete analysis of contents, purity, and safety.",
      pdfUrl: "#"
    },
    {
      id: "batch-003",
      name: "Batch #003 - June 2023",
      date: "June 18, 2023",
      type: "Full Panel Analysis",
      description: "Complete analysis of contents, purity, and safety.",
      pdfUrl: "#"
    },
    {
      id: "batch-004",
      name: "Batch #004 - September 2023",
      date: "September 5, 2023",
      type: "Full Panel Analysis",
      description: "Complete analysis of contents, purity, and safety.",
      pdfUrl: "#"
    },
    {
      id: "batch-005",
      name: "Batch #005 - December 2023",
      date: "December 12, 2023",
      type: "Full Panel Analysis",
      description: "Complete analysis of contents, purity, and safety.",
      pdfUrl: "#"
    },
    {
      id: "batch-006",
      name: "Batch #006 - March 2024",
      date: "March 28, 2024",
      type: "Full Panel Analysis",
      description: "Complete analysis of contents, purity, and safety.",
      pdfUrl: "#"
    }
  ];

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
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="recent">Recent (2024)</TabsTrigger>
            <TabsTrigger value="2023">2023</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
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
                    <Button variant="outline" className="w-full gap-2">
                      <FileText className="h-4 w-4" />
                      <span>View Report</span>
                    </Button>
                    <Button variant="secondary" className="w-full mt-2 gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labReports.filter(report => report.date.includes("2024")).map((report) => (
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
                    <Button variant="outline" className="w-full gap-2">
                      <FileText className="h-4 w-4" />
                      <span>View Report</span>
                    </Button>
                    <Button variant="secondary" className="w-full mt-2 gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="2023" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labReports.filter(report => report.date.includes("2023")).map((report) => (
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
                    <Button variant="outline" className="w-full gap-2">
                      <FileText className="h-4 w-4" />
                      <span>View Report</span>
                    </Button>
                    <Button variant="secondary" className="w-full mt-2 gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
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
