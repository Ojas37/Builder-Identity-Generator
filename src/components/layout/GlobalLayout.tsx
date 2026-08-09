import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

export const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      {/* Background Gradients & Grids */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      
      {/* Top Cyber/Ocean Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-accent-blue/10 via-transparent to-transparent blur-[120px] pointer-events-none z-0 animate-glow-pulse" />
      
      {/* Bottom Beach Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-green/5 blur-[120px] pointer-events-none z-0" />

      {/* App Content */}
      <Navbar />
      <main className="flex-grow relative z-10 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};
