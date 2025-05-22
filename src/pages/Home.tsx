// src/pages/Home.tsx
import React from 'react';
import About from './About';
import Projects from './Projects';
import Certifications from './Certifications';
import Contact from './Contact';
import HeroAnimation from '../components/HeroAnimation';

const Home = () => {
  return (
    <>
      <section id="hero" className="min-h-screen"> <HeroAnimation /> </section>
      <section id="about" className="min-h-screen"> <About /> </section>
      <section id="projects" className="min-h-screen"> <Projects /> </section>
      <section id="certifications" className="min-h-screen"> <Certifications /> </section>
      <section id="contact" className="min-h-screen"> <Contact /> </section>
    </>
  );
};

export default Home;
