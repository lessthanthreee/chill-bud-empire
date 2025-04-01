
import React from "react";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Cleveland Cartridge Co.</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-stone max-w-none">
          <p className="lead">
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Cleveland Cartridge Co.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Personal Information We Collect</h2>
          <p>
            When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
          </p>
          <p>
            Additionally, as you browse the site, we collect information about the individual web pages that you view, what websites or search terms referred you to the site, and information about how you interact with the site.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Personal Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fulfill orders and process transactions</li>
            <li>Communicate with you about your order or our products</li>
            <li>Screen orders for potential risk or fraud</li>
            <li>Provide customer support</li>
            <li>Improve and optimize our website</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Sharing Your Personal Information</h2>
          <p>
            We share your Personal Information with third parties to help us use your Personal Information, as described above. We also use Google Analytics to help us understand how our customers use the site.
          </p>
          <p>
            We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p>
            If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Retention</h2>
          <p>
            When you place an order through the site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes</h2>
          <p>
            We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at contact@clevelandcartridge.com.
          </p>
        </div>
      </div>
    </>
  );
};

export default Privacy;
