
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MessageCircle, Twitter, FileText, Shield, Truck, FlaskConical } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center text-primary-foreground font-bold text-sm">CCC</div>
              <span className="font-bold text-lg">Cleveland Cartridge Co.</span>
            </div>
            <p className="text-muted-foreground text-sm">
              The DoorDash for Delta-8 in Cleveland. Premium Delta-8 THC products delivered to your door with speed and discretion.
            </p>
            <p className="text-muted-foreground text-sm">
              We also ship to most states where Delta-8 is legal!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/lab-results" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" />
                  Lab Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Cleveland, Ohio</li>
              <li>clevelandcartridge@gmail.com</li>
              <li>Hours: Mon-Sat: 10am - 8pm</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Cleveland Cartridge Co. All rights reserved.
          </p>
          <p className="mt-2">
            You must be 21 years or older to purchase products from this site.
          </p>
          <p className="mt-2">
            The statements on this website have not been evaluated by the Food and Drug Administration. 
            This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <p className="mt-2">
            Our products contain delta-8 THC and may cause intoxication. Delta-8 THC's legal status varies by state. 
            It is your responsibility to know whether delta-8 THC is legal in your state. Use responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
