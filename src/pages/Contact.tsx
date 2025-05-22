import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import AnimatedTitle from '../components/AnimatedTitle';
import ContactForm from '../components/ContactForm';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="container-custom">
        <AnimatedTitle 
          title="Contact Me"
          subtitle="Have a project in mind or just want to connect? Feel free to reach out!"
          center
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ amount: 0.3 }} // removed 'once: true'
>
            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
            <p className="text-gray-600 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Location</h4>
                  <p className="text-gray-600">Coimbatore, Tamil Nadu, India</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Email</h4>
                  <p className="text-gray-600">contact@example.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Phone</h4>
                  <p className="text-gray-600">+91 9876543210</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;