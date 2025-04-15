
import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p>We collect information that you provide directly to us, including your name, shipping address, email address, and payment information. We use industry-standard encryption to protect your sensitive data.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Age Verification</h2>
          <p>To comply with legal requirements, we verify that all users are 21 years or older. This information is stored securely and used solely for age verification purposes.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
          <p>Your payment and shipping information is encrypted and stored securely. We never share your personal information with third parties except as required to fulfill your orders or comply with legal obligations.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Communication Preferences</h2>
          <p>By providing your email address, you may receive order confirmations and shipping updates. You can opt out of marketing communications at any time.</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
