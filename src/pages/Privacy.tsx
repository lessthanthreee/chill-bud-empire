
import React from "react";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Cleveland Cartridge Co.</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose prose-stone max-w-none">
            <p className="text-muted-foreground mb-4">
              Last Updated: April 15, 2025
            </p>
            
            <p className="lead mb-6">
              At Cleveland Cartridge Co., we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make purchases from us.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide when placing an order or contacting us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 mb-4">
              <li>Contact information (name, email address, shipping address)</li>
              <li>Payment information (cryptocurrency transaction IDs only, we do not store wallet addresses)</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>
            <p>
              We also automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Pages visited and actions taken on our website</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Detect and prevent fraud</li>
              <li>Resolve disputes and troubleshoot problems</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>All sensitive data is encrypted using industry-standard methods</li>
              <li>We use secure database systems with protection against SQL injection attacks</li>
              <li>Regular security audits and penetration testing</li>
              <li>Strict internal access controls and staff training</li>
              <li>DDoS protection and rate limiting on our servers</li>
            </ul>
            <p className="mt-4">
              While we use commercially reasonable measures to protect your information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except in the following cases:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Shipping partners (only to fulfill deliveries)</li>
              <li>Service providers who assist us in operating our website and conducting business</li>
              <li>Legal requirements (court orders, law enforcement requests)</li>
            </ul>
            <p className="mt-4">
              All third parties are required to keep your information confidential and secure.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Age Verification</h2>
            <p>
              Our website and products are only available to individuals who are at least 21 years of age. We collect age information during the checkout process to verify eligibility for purchase. We do not knowingly collect information from anyone under 21 years of age.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cookies and Tracking</h2>
            <p>
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings, but disabling them may impact your experience on our site.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy unless a longer retention period is required by law. Order information is retained for tax and business recordkeeping purposes in accordance with applicable laws.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>The right to access personal information we hold about you</li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your information (subject to legal requirements)</li>
              <li>The right to restrict or object to processing of your information</li>
              <li>The right to data portability</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at contact@clevelandcartridge.co.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated policy will be posted on this page with a revised "Last Updated" date.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
            <p>
              If you have questions or concerns about this privacy policy or our data practices, please contact us at:
            </p>
            <p className="mt-2">
              Email: contact@clevelandcartridge.co<br />
              Website: clevelandcartridge.co
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
