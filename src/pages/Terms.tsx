
import React from "react";
import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Cleveland Cartridge Co.</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-stone max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using our website, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the website.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Age Restriction</h2>
          <p>
            You must be 21 years of age or older to purchase products from our website. By using this website, you confirm that you are at least 21 years old.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Products</h2>
          <p>
            All products sold on our website are intended for legal use in accordance with local, state, and federal laws. We reserve the right to discontinue any product at any time.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Orders and Payment</h2>
          <p>
            All orders are subject to acceptance and availability. We reserve the right to refuse any order. Payment for all orders must be made in full at the time of purchase.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Shipping and Delivery</h2>
          <p>
            We will make every effort to deliver products within the estimated timeframes. However, we cannot guarantee specific delivery times and are not responsible for delays.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Returns and Refunds</h2>
          <p>
            Please refer to our Returns Policy for information on returns and refunds.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
          <p>
            The content on this website, including text, graphics, logos, images, and software, is the property of Cleveland Cartridge Co. and is protected by copyright and other intellectual property laws.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
          <p>
            In no event shall Cleveland Cartridge Co. be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the state of Ohio, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the website following any changes indicates your acceptance of the new terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at contact@clevelandcartridge.com.
          </p>
        </div>
      </div>
    </>
  );
};

export default Terms;
