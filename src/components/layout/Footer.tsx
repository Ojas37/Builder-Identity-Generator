import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
          <span>&copy; {new Date().getFullYear()} HH-GOA.</span>
          <span className="h-1 w-1 rounded-full bg-neutral-600" />
          <span>LATE NIGHT BUILDING STATION.</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
          <a
            href="https://hhgoa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Goa, India
          </a>
          <span className="h-1 w-1 rounded-full bg-neutral-600" />
          <span className="text-accent-blue/80 hover:text-accent-blue font-semibold">2:47 PM STUDIO</span>
        </div>
      </div>
    </footer>
  );
};
