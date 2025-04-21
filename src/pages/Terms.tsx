
import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Age Requirement</h2>
          <p>You must be 21 years or older to purchase products from Cleveland Cartridge Co. By using our website and services, you confirm that you meet this age requirement.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Product Usage</h2>
          <p>Our Delta-8 THC products are intended for use only in jurisdictions where they are legally permitted. It is your responsibility to verify local laws and regulations regarding Delta-8 THC products.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. FDA Disclaimer</h2>
          <p>The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure, or prevent any disease.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Return Policy</h2>
          <p>Due to the nature of our products, we cannot accept returns once items have been opened. Damaged or incorrect items will be replaced at our discretion.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Payment & Shipping</h2>
          <p>We accept cryptocurrency payments for all orders. Shipping is available to states where Delta-8 THC is legal. Same-day delivery is available in Cleveland, Ohio.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
