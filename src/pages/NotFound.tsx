import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants/routes';
import { FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const NotFound: React.FC = () => {
  return (
    <Section className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto"
      >
        <span className="text-xs font-mono px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 tracking-widest uppercase mb-6 inline-block">
          Error 404 // Lost At Sea
        </span>
        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
          Page Not Found
        </h1>
        <p className="text-sm text-neutral-400 leading-relaxed mb-8">
          The coordinates you requested do not exist. Return to the build station before the tide washes away your logs.
        </p>
        <Link to={ROUTES.HOME}>
          <Button variant="primary" className="gap-2">
            <FiHome size={14} />
            Back to Base Station
          </Button>
        </Link>
      </motion.div>
    </Section>
  );
};
