import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Laptop, ShieldCheck, Lightbulb } from 'lucide-react';
import AnimatedTitle from '../components/AnimatedTitle';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="container-custom">
        <AnimatedTitle 
          title="About Me"
          subtitle="Learn more about my journey, skills, and passion for AI and technology."
          center
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{amount: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary-100 rounded-lg transform -rotate-3"></div>
              <img 
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Hariharan" 
                className="w-full h-auto rounded-lg shadow-xl relative z-10"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ amount: 0.3 }}
          >
            <h3 className="text-3xl font-bold mb-6">Who I Am</h3>
            <p className="text-gray-700 mb-6">
              I'm Hariharan, a passionate and driven B.Tech student in Artificial Intelligence and Data Science at 
              Sri Ramakrishna Engineering College, Coimbatore. With a strong foundation in AI, machine learning, 
              and full-stack development, I am deeply committed to building innovative solutions that bridge the gap 
              between advanced technology and real-world problems.
            </p>
            <p className="text-gray-700 mb-6">
              Growing up in a single-parent household, I've developed resilience and a self-driven mindset, 
              which reflects in my projects and learning journey. My interests span across Cybersecurity, IoT, 
              Edge AI, and Big Data, and I believe in the power of implementing AI on real-time edge devices 
              to create smarter, efficient systems.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="/resume.pdf" className="btn btn-primary" download>
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-16">Key Strengths</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BrainCircuit size={40} />,
                title: "AI & Machine Learning",
                description: "Experience with Generative AI, deep learning models, and sentiment analysis."
              },
              {
                icon: <Laptop size={40} />,
                title: "Full-Stack Development",
                description: "Skilled in Python, JavaScript, Flask, Firebase, and Flutter for building scalable applications."
              },
              {
                icon: <ShieldCheck size={40} />,
                title: "Cybersecurity",
                description: "Hands-on with DDoS detection systems, phishing detection using ML, and secure browser extensions."
              },
              {
                icon: <Lightbulb size={40} />,
                title: "Problem Solver",
                description: "Focused on real-time implementation of solutions that improve user safety, healthcare, and digital interactions."
              }
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ amount: 0.1 }}
              >
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                  {skill.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{skill.title}</h4>
                <p className="text-gray-600">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;