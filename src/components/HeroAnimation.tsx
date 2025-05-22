import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParticleLayerConfig {
  count: number;
  size: number;
  color: string;
  depth: number;
  parallaxFactor: number;
}

const HeroAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const particleLayersRef = useRef<THREE.Points[]>([]);

  useEffect(() => {
    if (!containerRef.current || !letterContainerRef.current || !contentRef.current) return;

    const threeContainer = containerRef.current;
    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;

    // Scene setup
    scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeContainer.appendChild(renderer.domElement);
    camera.position.z = 5;

    const layerConfigs: ParticleLayerConfig[] = [
      { count: 1500, size: 0.025, color: '#0e94ea', depth: 0, parallaxFactor: 0.1 },
      { count: 800, size: 0.035, color: '#0a6aa8', depth: -2, parallaxFactor: 0.07 },
      { count: 500, size: 0.05, color: '#074062', depth: -4, parallaxFactor: 0.04 },
    ];

    particleLayersRef.current = layerConfigs.map(config => {
      const positions = new Float32Array(config.count * 3).map(() => (Math.random() - 0.5) * 15);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: config.size,
        color: config.color,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      particles.position.z = config.depth;
      scene.add(particles);
      return particles;
    });

    const handleMouseMove = (event: MouseEvent) => {
      if (isTransitioning) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      particleLayersRef.current.forEach((layer, index) => {
        const config = layerConfigs[index];
        gsap.to(layer.rotation, {
          x: y * config.parallaxFactor,
          y: x * config.parallaxFactor,
          duration: 0.8,
          ease: 'power2.out',
        });
      });

      if (letterContainerRef.current) {
        gsap.to(letterContainerRef.current, {
          x: x * 10,
          y: y * 10,
          rotateX: y * 2,
          rotateY: x * 2,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particleLayersRef.current.forEach((layer, i) => {
        layer.rotation.y += 0.0005 * (layerConfigs.length - i);
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 1.5}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
      onStart: () => setIsTransitioning(true),
      onComplete: () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'auto' });
          if (contentRef.current) {
            gsap.set(contentRef.current, { display: 'none' });
          }
          setIsTransitioning(false);
        } else {
          setIsTransitioning(false);
        }
      }
    });

    tl.to(letterContainerRef.current, {
      scale: 30,
      duration: 2,
      ease: 'power2.inOut',
    }, 0)
    .to('.fade-out-on-scroll', {
      opacity: 0,
      y: -50,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.inOut',
    }, 0)
    .to(letterContainerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.in',
    }, ">-0.6");

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([letterContainerRef.current, '.fade-out-on-scroll', contentRef.current]);

      if (renderer && renderer.domElement.parentNode === threeContainer) {
        threeContainer.removeChild(renderer.domElement);
      }

      particleLayersRef.current.forEach(layer => {
        layer.geometry.dispose();
        Array.isArray(layer.material)
          ? layer.material.forEach(m => m.dispose())
          : layer.material.dispose();
      });

      particleLayersRef.current = [];
      scene.clear();
      renderer.dispose();
      setIsTransitioning(false);
    };
  }, []);

  return (
    <div ref={contentRef} className="h-screen w-full relative">
      <div className="h-screen w-full flex flex-col items-center justify-center sticky top-0 overflow-hidden">
        <div ref={containerRef} className="absolute inset-0 z-0" />

        <motion.div className="text-center relative z-10">
          <div
            ref={letterContainerRef}
            className="transform-gpu"
            style={{ perspective: '1000px', willChange: 'transform, opacity' }}
          >
            <motion.h1
              className="text-[15rem] font-black text-blue-600 mb-6 select-none"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, type: "spring", delay: 0.2 }}
              style={{
                textShadow: '0 0 20px rgba(14, 148, 234, 0.3)',
                WebkitTextStroke: '2px rgba(14, 148, 234, 0.5)',
              }}
            >
              H
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-2xl text-gray-700 dark:text-gray-300 fade-out-on-scroll"
          >
            Welcome to my portfolio
          </motion.p>
        </motion.div>

<motion.div
  className="absolute bottom-10 z-10 fade-out-on-scroll flex flex-col items-center"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 1.2,
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse"
  }}
>
  <ChevronDown size={32} className="text-blue-600" />
  <span className="text-blue-600 mt-2 select-none text-sm font-medium">Scroll down</span>
</motion.div>

      </div>
    </div>
  );
};

export default HeroAnimation;
