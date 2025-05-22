// src/contexts/NavigationDirectionContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Direction = 1 | -1; // 1 for down/next, -1 for up/prev

interface NavigationDirectionContextType {
  direction: Direction;
  setNavigationDirection: (dir: Direction) => void;
  previousPath: string | null; // To store the path we just navigated FROM
  setPreviousPathContext: (path: string | null) => void; // Setter for previousPath in context
}

const NavigationDirectionContext = createContext<NavigationDirectionContextType | undefined>(undefined);

export const NavigationDirectionProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [direction, setDirection] = useState<Direction>(1);
  const [previousPath, setPreviousPathState] = useState<string | null>(null); // State for previousPath

  const setNavigationDirection = (dir: Direction) => {
    setDirection(dir);
  };

  const setPreviousPathContext = (path: string | null) => {
    setPreviousPathState(path);
  };

  return (
    <NavigationDirectionContext.Provider 
      value={{ 
        direction, 
        setNavigationDirection, 
        previousPath,        
        setPreviousPathContext 
      }}
    >
      {children}
    </NavigationDirectionContext.Provider>
  );
};

export const useNavigationDirection = (): NavigationDirectionContextType => {
  const context = useContext(NavigationDirectionContext);
  if (!context) {
    throw new Error('useNavigationDirection must be used within a NavigationDirectionProvider');
  }
  return context;
};