
import React from 'react';

const LabResults = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Lab Results</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Testing</h2>
          <p>All Cleveland Cartridge Co. products undergo rigorous third-party laboratory testing to ensure quality, potency, and safety. Our lab results are regularly updated to provide you with the most current information.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Latest Test Results</h2>
          <div className="bg-secondary p-6 rounded-lg">
            <p className="text-lg mb-4">Current Batch: CC2024-001</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delta-8 THC Content: 94.2%</li>
              <li>Delta-9 THC Content: &lt;0.3%</li>
              <li>No heavy metals detected</li>
              <li>No residual solvents detected</li>
              <li>Testing Date: April 2024</li>
            </ul>
            <p className="mt-4 text-sm">Full lab report available upon request.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Testing Standards</h2>
          <p>Our products are tested for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cannabinoid profile</li>
            <li>Terpene profile</li>
            <li>Pesticides</li>
            <li>Heavy metals</li>
            <li>Residual solvents</li>
            <li>Microbiological contaminants</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LabResults;
