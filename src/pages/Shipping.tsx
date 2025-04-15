
import React from "react";
import { Helmet } from "react-helmet";

const Shipping = () => {
  return (
    <>
      <Helmet>
        <title>Shipping Policy | Cleveland Cartridge Co.</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
          
          <div className="prose prose-stone max-w-none">
            <p className="text-muted-foreground mb-4">
              Last Updated: April 15, 2025
            </p>
            
            <p className="lead mb-6">
              Cleveland Cartridge Co. is committed to providing fast, reliable shipping services for all customers. Our unique model combines same-day local delivery in Cleveland with nationwide shipping to states where Delta-8 is legal.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Cleveland Same-Day Delivery</h2>
            <p>
              For customers in Cleveland, Ohio, we offer same-day delivery service:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 mb-4">
              <li><strong>Delivery Area:</strong> All neighborhoods within Cleveland city limits and select surrounding suburbs</li>
              <li><strong>Order Cutoff:</strong> Orders placed by 4:00 PM EST qualify for same-day delivery</li>
              <li><strong>Delivery Window:</strong> Between 4:00 PM and 8:00 PM EST</li>
              <li><strong>Delivery Fee:</strong> $5.99 (Free on orders over $50)</li>
              <li><strong>Minimum Order:</strong> $25</li>
            </ul>
            <p>
              Our delivery personnel will require age verification (21+) upon delivery. Please have a valid ID ready to present.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Nationwide Shipping</h2>
            <p>
              We ship to most states where Delta-8 THC is legal:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Processing Time:</strong> Orders are processed within 1-2 business days</li>
              <li><strong>Shipping Method:</strong> USPS Priority Mail (2-3 business days)</li>
              <li><strong>Shipping Fee:</strong> $7.99 (Free on orders over $75)</li>
              <li><strong>Tracking:</strong> All shipments include tracking information sent via email</li>
            </ul>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <p className="font-medium">Important Note on Legality:</p>
              <p className="text-sm mt-2">
                Due to varying state laws, we do not ship to states where Delta-8 THC is prohibited. It is the customer's responsibility to verify that Delta-8 THC products are legal in their state before placing an order. Cleveland Cartridge Co. is not responsible for any legal issues arising from shipments to states where Delta-8 THC is restricted.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Packaging and Discretion</h2>
            <p>
              We understand the importance of discretion. All products are shipped in plain, unmarked packaging with no indication of the contents. Your privacy is our priority:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Plain, odor-proof packaging</li>
              <li>No branding or product information visible on outer packaging</li>
              <li>Professional, discreet labeling</li>
              <li>Secure sealing to prevent tampering</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Order Tracking</h2>
            <p>
              Once your order ships, you'll receive an email with tracking information. You can also track your order by:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Logging into your account on our website</li>
              <li>Using the tracking link in your shipping confirmation email</li>
              <li>Contacting customer service at orders@clevelandcartridge.co</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Delivery Issues</h2>
            <p>
              In the rare event of a delivery issue:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Missing or Damaged Items:</strong> Please contact us within 48 hours of delivery</li>
              <li><strong>Failed Delivery Attempts:</strong> For local delivery, we'll contact you to reschedule. For shipped orders, carrier policies apply for redelivery</li>
              <li><strong>Incorrect Address:</strong> Please double-check your shipping information at checkout. Address changes after shipping may incur additional fees</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Returns and Exchanges</h2>
            <p>
              Due to the nature of our products:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>We accept returns of unopened, unused products within 14 days of delivery</li>
              <li>Returns must be in original, sealed packaging</li>
              <li>Return shipping costs are the customer's responsibility</li>
              <li>Refunds are processed to the original payment method</li>
            </ul>
            <p className="mt-4">
              To initiate a return, please contact orders@clevelandcartridge.co with your order number and reason for return.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Information</h2>
            <p>
              For any questions regarding shipping, delivery, or returns:
            </p>
            <p className="mt-2">
              Email: orders@clevelandcartridge.co<br />
              Response time: Within 24 hours, Monday-Friday
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
