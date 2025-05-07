
import React from 'react';
import { BeakerIcon, ClipboardCheck, ShieldCheck, Microscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SectionHeader = ({ title, description, icon: Icon }) => (
  <div className="flex items-start mb-6">
    <div className="p-3 rounded-lg bg-primary/10 mr-4">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const LabResults = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Lab Results</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          All our products undergo rigorous third-party laboratory testing to ensure quality, potency, and safety.
        </p>

        <div className="space-y-12">
          <section>
            <SectionHeader 
              title="Third-Party Testing" 
              description="Independent labs verify our products meet the highest standards" 
              icon={BeakerIcon}
            />
            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="mb-4">
                  Cleveland Cartridge Co. partners with ISO-certified laboratories to ensure all products are thoroughly tested.
                  These independent facilities analyze our products for potency, purity, and safety, providing unbiased verification
                  that our products meet or exceed industry standards.
                </p>
                <p>
                  Each batch undergoes comprehensive analysis before release, and we continuously monitor quality through regular testing.
                  We believe in complete transparency, which is why we make our lab results readily available to our customers.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <SectionHeader 
              title="Latest Test Results" 
              description="Current batch testing information" 
              icon={ClipboardCheck}
            />
            <Card className="mb-6 border-primary/50">
              <CardContent className="pt-6">
                <div className="bg-primary/5 p-6 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold mb-3">Current Batch: CC2024-001</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-primary mb-2">Cannabinoid Profile</h4>
                      <ul className="space-y-1">
                        <li className="flex justify-between">
                          <span>Delta-8 THC:</span>
                          <span className="font-medium">94.2%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Delta-9 THC:</span>
                          <span className="font-medium">&lt;0.3%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>CBD:</span>
                          <span className="font-medium">1.2%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>CBN:</span>
                          <span className="font-medium">0.5%</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary mb-2">Safety Tests</h4>
                      <ul className="space-y-1">
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                          <span>No heavy metals detected</span>
                        </li>
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                          <span>No pesticides detected</span>
                        </li>
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                          <span>No residual solvents detected</span>
                        </li>
                        <li className="flex items-center">
                          <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                          <span>No microbial contaminants detected</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Testing Date: April 2024</span>
                      <span className="text-sm font-medium">Lab: CannaLytics Research Center</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Full detailed lab reports are available upon request. Contact us for more information.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <SectionHeader 
              title="Testing Standards" 
              description="Comprehensive quality assurance protocols" 
              icon={Microscope}
            />
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4">
                  Our rigorous testing protocols exceed industry standards to ensure every product
                  is safe, effective, and consistent in quality. Each batch undergoes a comprehensive testing process:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Chemical Analysis</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium mr-2 mt-0.5">1</div>
                        <div>
                          <span className="font-medium block">Cannabinoid profile</span>
                          <span className="text-sm text-muted-foreground">Full spectrum analysis of all cannabinoids</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium mr-2 mt-0.5">2</div>
                        <div>
                          <span className="font-medium block">Terpene profile</span>
                          <span className="text-sm text-muted-foreground">Identification and quantification of terpenes</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium mr-2 mt-0.5">3</div>
                        <div>
                          <span className="font-medium block">Residual solvents</span>
                          <span className="text-sm text-muted-foreground">Testing for any remaining extraction solvents</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Safety Screening</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium mr-2 mt-0.5">4</div>
                        <div>
                          <span className="font-medium block">Pesticides</span>
                          <span className="text-sm text-muted-foreground">Screening for over 100 common pesticides</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium mr-2 mt-0.5">5</div>
                        <div>
                          <span className="font-medium block">Heavy metals</span>
                          <span className="text-sm text-muted-foreground">Testing for lead, arsenic, cadmium, and mercury</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium mr-2 mt-0.5">6</div>
                        <div>
                          <span className="font-medium block">Microbial screening</span>
                          <span className="text-sm text-muted-foreground">Testing for molds, yeasts, and bacteria</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LabResults;
