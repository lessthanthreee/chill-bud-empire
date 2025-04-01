
import React from "react";
import { Helmet } from "react-helmet";

const Shipping = () => {
  return (
    <>
      <Helmet>
        <title>Shipping Policy | Cleveland Cartridge Co.</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>
        
        <div className="prose prose-stone max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Rates</h2>
          <p>
            We offer the following shipping options:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Free Shipping:</strong> On all orders over $75</li>
            <li><strong>Standard Shipping:</strong> $6.00 for orders under $75</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Processing Time</h2>
          <p>
            All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Time</h2>
          <p>
            After your order is processed, shipping typically takes 3-5 business days, depending on your location. Please note that shipping times may be affected by factors outside our control, such as weather conditions or carrier delays.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Tracking Information</h2>
          <p>
            Once your order ships, you will receive a confirmation email with tracking information. You can use this to track the status of your delivery.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Restrictions</h2>
          <p>
            We currently ship to the continental United States only. We do not ship to PO boxes, APO/FPO addresses, or international destinations at this time.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Lost or Damaged Packages</h2>
          <p>
            If your package appears to be lost or damaged during shipping, please contact us within 7 days of the expected delivery date. We will work with the carrier to resolve the issue.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Address Changes</h2>
          <p>
            If you need to change your shipping address after placing an order, please contact us immediately. We cannot guarantee that we will be able to change the address if the order has already been processed.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about our shipping policy, please contact us at contact@clevelandcartridge.com.
          </p>
        </div>
      </div>
    </>
  );
};

export default Shipping;
