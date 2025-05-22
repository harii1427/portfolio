import React from 'react';
import AnimatedTitle from '../components/AnimatedTitle';
import CertificationCard from '../components/CertificationCard';
import { Certification } from '../types';

const Certifications: React.FC = () => {
  const certifications: Certification[] = [
    {
      id: "1",
      title: "Machine Learning Specialization",
      issuer: "Coursera - Stanford University",
      date: "December 2023",
      image: "https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#"
    },
    {
      id: "2",
      title: "Deep Learning Specialization",
      issuer: "Coursera - DeepLearning.AI",
      date: "August 2023",
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#"
    },
    {
      id: "3",
      title: "AWS Certified Machine Learning – Specialty",
      issuer: "Amazon Web Services",
      date: "April 2023",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#"
    },
    {
      id: "4",
      title: "Python for Data Science and Machine Learning",
      issuer: "Udemy",
      date: "January 2023",
      image: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#"
    },
    {
      id: "5",
      title: "Full Stack Web Development",
      issuer: "freeCodeCamp",
      date: "November 2022",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#"
    },
    {
      id: "6",
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "September 2022",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="container-custom">
        <AnimatedTitle 
          title="My Certifications"
          subtitle="A collection of my professional certifications and educational achievements in the fields of AI, machine learning, and software development."
          center
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {certifications.map((certification, index) => (
            <CertificationCard 
              key={certification.id} 
              certification={certification} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;