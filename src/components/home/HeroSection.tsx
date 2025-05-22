import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const subtextVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.3,
        duration: 0.6
      } 
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.6,
        duration: 0.6
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particle background */}
      <ParticleBackground id="hero-particles" />
      
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-[-1] bg-gradient-to-r from-midnight-800 to-forest-800 opacity-90"
      >
        <div 
          className="parallax-bg"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
            transform: `translateY(${scrollY * 0.4}px)` 
          }}
        />
      </div>
      
      <div className="container-custom relative z-10 text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-medium mb-6 leading-tight"
            initial="hidden"
            animate="visible"
            variants={headlineVariants}
          >
            Personalized Hair & Weight Loss Treatments That Actually Work
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={subtextVariants}
          >
            Medical-grade care, custom-tailored to your body's needs. Delivered to your door with ongoing support from our experts.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <Link to="/quiz" className="btn bg-gradient-to-r from-mint-500 to-mint-600 text-white hover:from-mint-600 hover:to-mint-700 shadow-lg hover:shadow-xl">
              Take the Quiz
            </Link>
            <Link to="/products" className="btn border-2 border-white/80 text-white hover:bg-white/10">
              Browse Treatments
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;