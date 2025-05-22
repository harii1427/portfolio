import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Package, Stethoscope } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardCheck size={48} className="text-midnight-600" />,
    title: 'Take a 2-Min Quiz',
    description: 'Answer a few questions about your health history, goals, and concerns to help our doctors understand your needs.',
  },
  {
    icon: <Stethoscope size={48} className="text-forest-600" />,
    title: 'Get Matched to Treatments',
    description: 'Our medical team reviews your profile and recommends personalized treatment options backed by science.',
  },
  {
    icon: <Package size={48} className="text-mint-600" />,
    title: 'Delivered with Support',
    description: 'Receive your treatment kit at your door with clear instructions and ongoing support from our medical experts.',
  },
];

const HowItWorks: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our simple process makes getting effective treatment easier than ever before.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="card p-8 text-center h-full flex flex-col items-center"
              variants={itemVariants}
            >
              <div className="mb-6 p-4 bg-charcoal-50 rounded-full">
                {step.icon}
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-charcoal-800 mb-4">
                {step.title}
              </h3>
              <p className="text-charcoal-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;