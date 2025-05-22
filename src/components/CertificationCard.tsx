import React from 'react';
import { motion } from 'framer-motion';
import { Certification } from '../types';
import { ExternalLink } from 'lucide-react';

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification, index }) => {
  return (
    <motion.div
      className="card flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-40 bg-gray-100 overflow-hidden">
        <img 
          src={certification.image} 
          alt={certification.title} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-bold mb-1">{certification.title}</h3>
        <p className="text-gray-600 mb-1">{certification.issuer}</p>
        <p className="text-gray-500 text-sm mb-4">{certification.date}</p>
        
        {certification.link && (
          <a 
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline inline-flex items-center gap-2 mt-auto self-start"
          >
            View Certificate
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default CertificationCard;