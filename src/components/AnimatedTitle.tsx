import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title, subtitle, center = false }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: {},
    visible: {}
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const words = title.split(' ');

  return (
    <div className={`${center ? 'text-center' : ''}`}>
      <motion.div
        className="overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{amount: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          {words.map((word, wordIndex) => (
            <motion.span 
              key={wordIndex} 
              className="inline-block mr-2"
              variants={wordVariants}
            >
              {Array.from(word).map((letter, letterIndex) => (
                <motion.span 
                  key={letterIndex} 
                  className="inline-block"
                  variants={letterVariants}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </h2>
      </motion.div>
      
      {subtitle && (
        <motion.p

  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ amount: 0.3 }} // removed 'once: true'
>
        
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedTitle;