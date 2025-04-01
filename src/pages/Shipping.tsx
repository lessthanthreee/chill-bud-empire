
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
          <p className="text-muted-foreground mb-4">
            Last Updated: April 1, 2025
          </p>
          
          <p className="lead mb-6">
            Cleveland Cartridge Co. (established March 25, 2025) is committed to providing reliable, secure, and efficient shipping services for all our customers. This Shipping Policy outlines our procedures, rates, and guidelines for product delivery.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Rates</h2>
          <p>
            We offer the following shipping options for all orders within the continental United States:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Free Shipping:</strong> On all orders over $75</li>
            <li><strong>Standard Shipping:</strong> $6.00 for orders under $75 (delivery in 3-5 business days)</li>
            <li><strong>Express Shipping:</strong> $15.00 (delivery in 2-3 business days)</li>
            <li><strong>Priority Shipping:</strong> $25.00 (delivery in 1-2 business days)</li>
          </ul>
          <p className="mt-2">
            Shipping costs are calculated at checkout based on the order value, weight, and delivery address. Any applicable taxes or duties are the responsibility of the customer and will be collected at checkout or upon delivery as required by law.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Order Processing Time</h2>
          <p>
            All orders are processed within 1-2 business days from the time of purchase. Orders placed after 2:00 PM EST will begin processing the following business day. Orders placed on weekends or holidays will be processed on the next business day.
          </p>
          <p className="mt-2">
            During high-volume periods (such as holidays or special promotions), processing times may be slightly longer. We will notify customers of any significant delays via email.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Carriers</h2>
          <p>
            We utilize reliable shipping carriers including USPS, UPS, and FedEx to deliver our products. The specific carrier used for your order will depend on your location, the shipping method selected, and product availability.
          </p>
          <p className="mt-2">
            All shipments include tracking information which will be provided to you via email once your order is shipped.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Time</h2>
          <p>
            After your order is processed and shipped, delivery typically takes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Standard Shipping:</strong> 3-5 business days</li>
            <li><strong>Express Shipping:</strong> 2-3 business days</li>
            <li><strong>Priority Shipping:</strong> 1-2 business days</li>
          </ul>
          <p className="mt-2">
            Please note that these are estimated delivery times and not guaranteed. Shipping times may be affected by factors outside our control, such as weather conditions, carrier delays, customs clearance (where applicable), or other unforeseen circumstances.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Tracking Information</h2>
          <p>
            Once your order ships, you will receive a confirmation email with tracking information. You can use this information to track the status of your delivery through the carrier's website. If you create an account on our website, you can also track your orders through your account dashboard.
          </p>
          <p className="mt-2">
            If you have not received tracking information within 3 business days after placing your order, please contact our customer service team at contact@clevelandcartridge.com.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Restrictions</h2>
          <p>
            We currently ship to the continental United States only. We do not ship to PO boxes, APO/FPO addresses, or international destinations at this time.
          </p>
          <p className="mt-2">
            Due to regulatory requirements, we are unable to ship to certain states. Please check our FAQ section for up-to-date information on shipping restrictions by location.
          </p>
          <p className="mt-2">
            Age verification is required for all deliveries. The recipient must be 21 years of age or older and present a valid government-issued photo ID upon delivery.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Package Handling and Delivery</h2>
          <p>
            All packages require an adult signature (21+ years) upon delivery. Our carriers will make up to three delivery attempts. If delivery cannot be completed after three attempts, the package may be returned to us, and you will be responsible for any re-shipping costs.
          </p>
          <p className="mt-2">
            To ensure successful delivery, please provide a shipping address where an adult will be available to receive the package during business hours.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Lost or Damaged Packages</h2>
          <p>
            If your package appears to be lost or damaged during shipping, please contact us within 7 days of the expected delivery date. We will work with the carrier to resolve the issue and, if necessary, arrange for a replacement shipment.
          </p>
          <p className="mt-2">
            To file a claim for a damaged package, please take photos of the damaged packaging and products before disposing of any materials, as these may be required for the claim process.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Address Changes</h2>
          <p>
            If you need to change your shipping address after placing an order, please contact us immediately at contact@clevelandcartridge.com or call our customer service at [Phone Number]. We cannot guarantee that we will be able to change the address if the order has already been processed or shipped.
          </p>
          <p className="mt-2">
            Address change requests must be received within 4 hours of placing your order to be considered. Any address changes may delay your order processing time.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Insurance</h2>
          <p>
            All orders are automatically insured against loss or damage during transit up to the full value of the purchase. There is no additional cost for this coverage.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Holiday Shipping</h2>
          <p>
            During major holidays, shipping carriers may experience delays. We recommend placing orders early during holiday seasons to ensure timely delivery. We will post notices on our website regarding any expected delays during these periods.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about our shipping policy or need assistance with a shipment, please contact our customer service team:
          </p>
          <p className="mt-2">
            Email: contact@clevelandcartridge.com<br />
            Hours of Operation: Monday-Saturday, 10am - 8pm EST
          </p>
        </div>
      </div>
    </>
  );
};

export default Shipping;
