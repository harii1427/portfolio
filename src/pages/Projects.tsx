import React from 'react';
import AnimatedTitle from '../components/AnimatedTitle';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../types';

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: "1",
      title: "AI-Powered Medical Assistant",
      description: "A health guidance system using Streamlit and LLMs to analyze medical reports and provide personalized suggestions.",
      tags: ["AI", "Healthcare", "Python", "Streamlit"],
      image: "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      details: "This project leverages large language models to analyze medical reports, extract key findings, and generate personalized health recommendations for users. Built with Streamlit for the frontend and integrated with advanced NLP techniques."
    },
    {
      id: "2",
      title: "Hack Blocker",
      description: "Chrome extension that flags phishing websites using Gradient Boosting Classifier with a Flask backend API.",
      tags: ["Cybersecurity", "ML", "JavaScript", "Flask"],
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      details: "A browser extension that protects users from phishing attacks by analyzing website features in real-time. Uses a Gradient Boosting Classifier model deployed via a Flask API to detect suspicious sites and alert users."
    },
    {
      id: "3",
      title: "DDoS Attack Resistance System",
      description: "Detects and blocks suspicious IPs based on traffic spikes and request thresholds for enhanced security.",
      tags: ["Cybersecurity", "Network Security", "Python"],
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      details: "A robust system designed to detect and mitigate DDoS attacks in real-time. Analyzes network traffic patterns, identifies anomalies, and automatically blocks suspicious IP addresses to maintain service availability during attack attempts."
    },
    {
      id: "4",
      title: "Deepfake Detection System",
      description: "Multimodal system leveraging EfficientNetV2 for spotting fake media with a simple Flask frontend.",
      tags: ["Computer Vision", "Deep Learning", "Flask", "AI"],
      image: "https://images.pexels.com/photos/8404702/pexels-photo-8404702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      details: "This project uses state-of-the-art deep learning models to detect manipulated images and videos. Leverages EfficientNetV2 architecture to identify visual inconsistencies and artifacts that are characteristic of deepfake content."
    },
    {
      id: "5",
      title: "Trend Miner",
      description: "Real-time sentiment analysis on social media using Big Data tools to track opinion trends.",
      tags: ["NLP", "Big Data", "Sentiment Analysis", "Python"],
      image: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      details: "A data analytics platform that processes large volumes of social media content to extract sentiment patterns and trending topics. Helps businesses understand public perception and make data-driven decisions."
    },
    {
      id: "6",
      title: "Preventing Digital Fraud",
      description: "A security-focused project aimed at detecting and preventing online fraud patterns across platforms.",
      tags: ["Security", "Machine Learning", "Pattern Recognition"],
      image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      details: "This comprehensive security solution detects fraudulent activities across digital platforms by identifying suspicious patterns and behaviors. Combines machine learning algorithms with rule-based systems to provide a robust fraud prevention framework."
    }
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="container-custom">
        <AnimatedTitle 
          title="My Projects"
          subtitle="Explore my technical portfolio showcasing AI, cybersecurity, and full-stack development projects."
          center
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;