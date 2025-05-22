import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Heart, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center mb-4">
              <Stethoscope size={32} className="mr-2 text-mint-400" />
              <span className="font-playfair text-xl font-semibold">NCL Private Clinic</span>
            </div>
            <p className="text-charcoal-300 mb-6">
              Premium, science-backed, medically supervised solutions for hair restoration and weight management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-charcoal-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-charcoal-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-charcoal-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-charcoal-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-charcoal-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-charcoal-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-charcoal-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-charcoal-300 hover:text-white transition-colors">Treatments</Link></li>
              <li><Link to="/quiz" className="text-charcoal-300 hover:text-white transition-colors">Take the Quiz</Link></li>
              <li><Link to="/faq" className="text-charcoal-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-charcoal-700 pb-2">Our Treatments</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-charcoal-300 hover:text-white transition-colors">Hair Restoration</a></li>
              <li><a href="#" className="text-charcoal-300 hover:text-white transition-colors">Weight Management</a></li>
              <li><a href="#" className="text-charcoal-300 hover:text-white transition-colors">Hormone Therapy</a></li>
              <li><a href="#" className="text-charcoal-300 hover:text-white transition-colors">Skin Rejuvenation</a></li>
              <li><a href="#" className="text-charcoal-300 hover:text-white transition-colors">Wellness Plans</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-charcoal-700 pb-2">Contact</h3>
            <ul className="space-y-2">
              <li className="text-charcoal-300">123 Wellness Drive</li>
              <li className="text-charcoal-300">New York, NY 10001</li>
              <li className="text-charcoal-300 mt-4">support@nclclinic.com</li>
              <li className="text-charcoal-300">+1 (800) 555-1234</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-charcoal-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-charcoal-400 text-sm mb-4 md:mb-0">
              © 2025 NCL Private Clinic. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-charcoal-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-charcoal-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-charcoal-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
          <div className="mt-6 text-xs text-charcoal-500 text-center">
            <p>Medical Disclaimer: Products and services offered are not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before starting any treatment.</p>
            <p className="mt-2 flex items-center justify-center">
              Made with <Heart size={12} className="mx-1 text-rose-400" /> by NCL Private Clinic Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;