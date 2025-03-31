
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FileText, Download, Filter, Beaker, Shield, CheckCircle } from "lucide-react";

// Sample lab results data
const labResults = [
  {
    id: "LR-2023-001",
    productName: "Delta 8 Gummies - Berry Blast",
    batchNumber: "B00123",
    testDate: "2023-06-15",
    category: "Edibles",
    results: {
      delta8: "24.8mg per gummy",
      delta9: "<0.3%",
      cbd: "Not detected",
      terpenes: "Mixed berry terpene profile",
      pesticides: "None detected",
      heavy_metals: "Below detection limit",
      microbials: "Pass",
      residual_solvents: "Pass"
    },
    certificates: ["COA_B00123.pdf", "Terpene_Analysis_B00123.pdf"],
    lab: "Green Analytics Lab",
    status: "Pass"
  },
  {
    id: "LR-2023-002",
    productName: "Delta 8 Vape Cartridge - OG Kush",
    batchNumber: "B00245",
    testDate: "2023-07-10",
    category: "Vapes",
    results: {
      delta8: "892mg per cartridge",
      delta9: "<0.3%",
      cbd: "48mg per cartridge",
      terpenes: "OG Kush terpene profile (4.2%)",
      pesticides: "None detected",
      heavy_metals: "Below detection limit",
      microbials: "Pass",
      residual_solvents: "Pass"
    },
    certificates: ["COA_B00245.pdf", "Terpene_Analysis_B00245.pdf"],
    lab: "Green Analytics Lab",
    status: "Pass"
  },
  {
    id: "LR-2023-003",
    productName: "Delta 8 Tincture - Mint",
    batchNumber: "B00387",
    testDate: "2023-08-22",
    category: "Tinctures",
    results: {
      delta8: "33.4mg/ml (1002mg total)",
      delta9: "<0.3%",
      cbd: "6.7mg/ml (201mg total)",
      terpenes: "Mint terpene profile (2.1%)",
      pesticides: "None detected",
      heavy_metals: "Below detection limit",
      microbials: "Pass",
      residual_solvents: "Pass"
    },
    certificates: ["COA_B00387.pdf", "Terpene_Analysis_B00387.pdf"],
    lab: "Pure Test Labs",
    status: "Pass"
  },
  {
    id: "LR-2023-004",
    productName: "Delta 8 Flower - Blue Dream",
    batchNumber: "B00429",
    testDate: "2023-09-05",
    category: "Flower",
    results: {
      delta8: "17.9%",
      delta9: "0.29%",
      cbd: "0.4%",
      terpenes: "Blue Dream terpene profile (3.7%)",
      pesticides: "None detected",
      heavy_metals: "Below detection limit",
      microbials: "Pass",
      residual_solvents: "Pass"
    },
    certificates: ["COA_B00429.pdf", "Terpene_Analysis_B00429.pdf"],
    lab: "Pure Test Labs",
    status: "Pass"
  },
  {
    id: "LR-2023-005",
    productName: "Delta 8 Gummies - Watermelon",
    batchNumber: "B00521",
    testDate: "2023-10-12",
    category: "Edibles",
    results: {
      delta8: "25.2mg per gummy",
      delta9: "<0.3%",
      cbd: "Not detected",
      terpenes: "Watermelon terpene profile",
      pesticides: "None detected",
      heavy_metals: "Below detection limit",
      microbials: "Pass",
      residual_solvents: "Pass"
    },
    certificates: ["COA_B00521.pdf", "Terpene_Analysis_B00521.pdf"],
    lab: "Green Analytics Lab",
    status: "Pass"
  }
];

// Categories for filtering
const categories = ["All", "Edibles", "Vapes", "Tinctures", "Flower"];

const LabResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedResult, setSelectedResult] = useState<typeof labResults[0] | null>(null);

  // Filter lab results based on search and category
  const filteredResults = labResults.filter(result => {
    const matchesSearch = 
      result.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || result.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleViewResult = (result: typeof labResults[0]) => {
    setSelectedResult(result);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Lab Results</h1>
        <p className="text-muted-foreground max-w-3xl">
          We believe in complete transparency. All our products undergo rigorous third-party testing to ensure safety, 
          purity, and accurate potency. Browse our lab results below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Lab Testing Information */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Beaker className="h-5 w-5 mr-2" />
                Our Testing Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Independent Labs</h3>
                  <p className="text-sm text-muted-foreground">
                    All testing is performed by ISO-certified third-party laboratories.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Comprehensive Testing</h3>
                  <p className="text-sm text-muted-foreground">
                    Products are tested for potency, terpenes, pesticides, heavy metals, microbials, and residual solvents.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Batch Testing</h3>
                  <p className="text-sm text-muted-foreground">
                    Every product batch is tested before reaching our shelves.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Compliance Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    We ensure all products comply with federal and Ohio state regulations.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="bg-secondary/50 p-4 rounded-lg w-full">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-medium">Our Quality Guarantee</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  If any product doesn't meet our strict quality standards, it never makes it to our shelves. Your safety is our priority.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Lab Results Content */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          {selectedResult ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Lab Result Details</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedResult(null)}
                >
                  Back to List
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Product Name</h3>
                    <p className="font-medium">{selectedResult.productName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Batch Number</h3>
                    <p className="font-medium">{selectedResult.batchNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Testing Date</h3>
                    <p className="font-medium">{selectedResult.testDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Testing Lab</h3>
                    <p className="font-medium">{selectedResult.lab}</p>
                  </div>
                </div>

                <Tabs defaultValue="cannabinoids">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="cannabinoids">Cannabinoids</TabsTrigger>
                    <TabsTrigger value="terpenes">Terpenes</TabsTrigger>
                    <TabsTrigger value="contaminants">Contaminants</TabsTrigger>
                    <TabsTrigger value="certificates">Certificates</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="cannabinoids">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Compound</TableHead>
                          <TableHead>Result</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Delta-8 THC</TableCell>
                          <TableCell>{selectedResult.results.delta8}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Delta-9 THC</TableCell>
                          <TableCell>{selectedResult.results.delta9}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">CBD</TableCell>
                          <TableCell>{selectedResult.results.cbd}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="terpenes">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {selectedResult.results.terpenes}
                      </p>
                      <p className="text-sm">
                        For a complete terpene profile, please download the detailed analysis report below.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="contaminants">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Test</TableHead>
                          <TableHead>Result</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Pesticides</TableCell>
                          <TableCell>{selectedResult.results.pesticides}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Heavy Metals</TableCell>
                          <TableCell>{selectedResult.results.heavy_metals}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Microbial Screening</TableCell>
                          <TableCell>{selectedResult.results.microbials}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Residual Solvents</TableCell>
                          <TableCell>{selectedResult.results.residual_solvents}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="certificates">
                    <div className="space-y-4">
                      {selectedResult.certificates.map((cert, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-md"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-primary" />
                            <span>{cert}</span>
                          </div>
                          <Button size="sm" variant="outline" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by product name or batch number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto flex items-center"
                    onClick={() => setSelectedCategory("All")}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {selectedCategory !== "All" ? `Filtered: ${selectedCategory}` : "All Categories"}
                  </Button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Results Table */}
              <Card>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Batch #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">View</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResults.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <p className="text-muted-foreground">No lab results found. Try adjusting your search.</p>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredResults.map(result => (
                          <TableRow key={result.id}>
                            <TableCell className="font-medium">{result.productName}</TableCell>
                            <TableCell>{result.batchNumber}</TableCell>
                            <TableCell>{result.testDate}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                {result.status}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewResult(result)}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabResults;
