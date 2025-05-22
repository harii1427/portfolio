import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Heart, Shield } from 'lucide-react';

const publications = [
  'Medical Journal', 'Health Today', 'Wellness Weekly', 'Science Review', 'Medical Times'
];

const TrustedSection: React.FC = () => {
  return (
    <section className="section bg-charcoal-50">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Trusted by Experts</h2>
          <p className="section-subtitle">
            Our treatments are formulated by certified medical professionals and backed by scientific research.
          </p>
        </motion.div>

        {/* Logos Section */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {publications.map((publication, index) => (
            <div key={index} className="text-charcoal-400 font-playfair text-xl font-medium">
              {publication}
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <CheckCircle className="mb-4 text-midnight-600" size={28} />
            <h3 className="text-lg font-semibold mb-2">Clinically Proven</h3>
            <p className="text-charcoal-600 text-sm">All treatments undergo rigorous clinical testing and review.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Shield className="mb-4 text-forest-600" size={28} />
            <h3 className="text-lg font-semibold mb-2">Medical-Grade</h3>
            <p className="text-charcoal-600 text-sm">Prescription-strength solutions available only through licensed providers.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Award className="mb-4 text-mint-600" size={28} />
            <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
            <p className="text-charcoal-600 text-sm">Board-certified physicians and specialists with decades of experience.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Heart className="mb-4 text-rose-500" size={28} />
            <h3 className="text-lg font-semibold mb-2">Personalized Care</h3>
            <p className="text-charcoal-600 text-sm">Treatment plans customized to your unique needs and health profile.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;