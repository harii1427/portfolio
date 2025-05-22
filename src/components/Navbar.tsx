import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { animateScroll as scroll, scroller } from 'react-scroll';

const sections = ['home', 'about', 'projects', 'certifications', 'contact'];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // default active is home
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Fix: Set activeSection to 'home' when near top
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      let visibleSectionId: string | null = null;
      let maxRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          visibleSectionId = entry.target.id;
        }
      });

      if (visibleSectionId) {
        setActiveSection(visibleSectionId);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: [0.5, 0.75, 1],
    });

    const observer = observerRef.current;

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      if (observer) {
        sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el) observer.unobserve(el);
        });
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollTo = (target: string) => {
    if (target === 'home') {
      scroll.scrollToTop({ duration: 800 });
    } else {
      scroller.scrollTo(target, {
        smooth: true,
        duration: 800,
        offset: -70,
      });
    }
    closeMenu();
  };

  const navbarStyles = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  return (
    <nav className={navbarStyles}>
      <div className="container-custom flex justify-between items-center">
        <button
          onClick={() => scroll.scrollToTop({ duration: 800 })}
          className="text-2xl font-bold text-primary-600"
        >
          Hariharan
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => scrollTo(sec)}
              className={`nav-link transition-all duration-300 ${
                activeSection === sec
                  ? 'text-primary-600 font-semibold'
                  : 'text-gray-700'
              }`}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            onClick={toggleMenu}
            className="p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-white pt-16"
        >
          <div className="container-custom flex flex-col space-y-4 mt-4">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => scrollTo(sec)}
                className={`text-xl py-3 px-4 border-b border-gray-100 ${
                  activeSection === sec
                    ? 'text-primary-600 font-medium'
                    : 'text-gray-800'
                }`}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
