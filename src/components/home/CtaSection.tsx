import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const CtaSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-r from-midnight-700 to-forest-700 overflow-hidden">
      <ParticleBackground id="cta-particles" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Your Personalized Plan Awaits
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Take the first step toward a healthier, more confident you with a customized treatment plan designed by medical experts.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              to="/quiz" 
              className="btn bg-white text-midnight-700 hover:bg-charcoal-100 shadow-lg hover:shadow-xl"
            >
              Start Quiz
            </Link>
            <Link 
              to="/products" 
              className="btn border-2 border-white/80 text-white hover:bg-white/10"
            >
              Browse Products
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;