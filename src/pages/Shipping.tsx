
import React from 'react';

const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Local Delivery</h2>
          <p>We offer same-day delivery in Cleveland, Ohio! Orders placed before 6 PM EST will be delivered the same day.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nationwide Shipping</h2>
          <p>We ship to all states where Delta-8 THC is legal. Free shipping on orders over $75! Standard shipping typically takes 3-5 business days.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tracking</h2>
          <p>Once your order ships, you'll receive a tracking number via email. You can also track your order through your account dashboard.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Discreet Packaging</h2>
          <p>All orders are shipped in discrete, unmarked packaging to ensure your privacy.</p>
        </section>
      </div>
    </div>
  );
};

export default Shipping;
