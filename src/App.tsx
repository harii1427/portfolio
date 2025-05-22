import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import ScrollToTop from './components/ScrollToTop'; // <<< IMPORTANT: Likely remove this
import RainbowCursor from './components/RainbowCursor';
import ThemeToggle from './components/ThemeToggle';
// HeroAnimation is used in Home.tsx
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ScrollNavigationHandler from './components/ScrollNavigationHandler'; // Import the new handler

function App() {
  useEffect(() => {
    document.title = "Hariharan | AI & Data Science Portfolio";
  }, []);

  return (
    <ThemeProvider>
      <Router>
        {/* <ScrollToTop /> */} {/* This will conflict. When you navigate via scroll,
                                   ScrollToTop will scroll to the top of the new page,
                                   which could immediately trigger an "scroll up" navigation.
                                   It's best to remove it for this navigation scheme. */}
        <RainbowCursor />
        <ThemeToggle />
        <ScrollNavigationHandler /> {/* Add the global handler here */}
        <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white transition-colors duration-200">
          <Navbar />
          {/* The main content area might need overflow control if pages aren't 100vh */}
          <main className="flex-grow relative"> {/* Consider `overflow-hidden` if needed */}
              <Routes>
  <Route path="/" element={<Home />} />
  <Route path="*" element={<NotFound />} />
</Routes>

            <Footer/>
          </main>
           {/* Pass the ref to the Footer */}
           
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;