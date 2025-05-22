// src/components/FluidCursor.tsx
'use client';
import { useEffect, useRef } from 'react';
import useFluidCursor from '../hooks/useFluidCursor'; // Adjust path as needed

import React from 'react';

const RainbowCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      useFluidCursor(); // Initialize the fluid cursor logic
    }
  }, []);

  return (
    <div className='fixed top-0 left-0 z-2'>
      <canvas
        id="fluid"
        ref={canvasRef}
        className="w-screen h-screen pointer-events-none"
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
};
export default RainbowCursor;