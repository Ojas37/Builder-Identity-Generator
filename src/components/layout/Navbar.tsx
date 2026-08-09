import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { FaGithub } from 'react-icons/fa6';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Stylized Brand Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
            <span className="font-mono text-sm tracking-[0.25em] font-extrabold text-white">
              HH<span className="text-accent-blue font-light">GOA</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:inline-block">
              2026 Selections
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to={ROUTES.HOME}
              end
              className={({ isActive }) =>
                `text-xs font-mono tracking-wider uppercase transition-colors hover:text-white ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-400'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={ROUTES.FRAME}
              className={({ isActive }) =>
                `text-xs font-mono tracking-wider uppercase transition-colors hover:text-white ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-400'
                }`
              }
            >
              PFP Frame
            </NavLink>
            <NavLink
              to={ROUTES.BUILDER}
              className={({ isActive }) =>
                `text-xs font-mono tracking-wider uppercase transition-colors hover:text-white ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-400'
                }`
              }
            >
              Builder Card
            </NavLink>
          </nav>
        </div>

        {/* Action Button & GitHub Link */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            title="GitHub Repository"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://hhgoa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono uppercase text-white tracking-wider transition-all duration-200"
          >
            Go To Official Site
          </a>
        </div>
      </div>
    </header>
  );
};
