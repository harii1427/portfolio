import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Treatments', path: '/products' },
    { name: 'FAQ', path: '/faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center"
        >
          <Stethoscope 
            size={32} 
            className={`mr-2 transition-colors duration-300 ${
              isScrolled ? 'text-midnight-600' : 'text-white'
            }`} 
          />
          <span 
            className={`font-playfair text-xl font-semibold transition-colors duration-300 ${
              isScrolled ? 'text-charcoal-800' : 'text-white'
            }`}
          >
            NCL Private Clinic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-charcoal-700' : 'text-white'
              } hover:text-midnight-500`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/quiz" 
            className="btn btn-primary"
          >
            Take the Quiz
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className="text-charcoal-800" />
          ) : (
            <Menu 
              size={24} 
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-charcoal-800' : 'text-white'
              }`} 
            />
          )}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 right-0 bg-white shadow-lg p-6 pt-20 md:hidden"
            >
              <nav className="flex flex-col space-y-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-charcoal-700 hover:text-midnight-500 text-lg"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  to="/quiz" 
                  className="btn btn-primary w-full text-center mt-4"
                >
                  Take the Quiz
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;