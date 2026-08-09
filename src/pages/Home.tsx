import React from 'react';
import { Section } from '../components/ui/Section';
import { FeatureCard } from '../components/ui/FeatureCard';
import { ROUTES } from '../constants/routes';
import { FiImage, FiCreditCard } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } },
  } as const;

  return (
    <Section className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full text-center flex flex-col items-center"
      >
        {/* Tag & Sub */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/5 text-[10px] font-mono text-accent-blue tracking-widest uppercase">
            HH GOA 2026 // IDENTITY ENGINE
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent"
        >
          Build. Brand. Belong.
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          variants={itemVariants}
          className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-16"
        >
          Claim your spot on the sand. Brand your profile photo and generate your official Hacker House Goa 2026 event builder identity in seconds.
        </motion.p>

        {/* Feature Cards Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl text-left"
        >
          <FeatureCard
            title="Profile Picture Frame"
            description="Frame your portrait with official HH Goa 2026 overlay layouts. Reposition, zoom, and generate a high-quality download."
            ctaText="Open Frame Generator"
            to={ROUTES.FRAME}
            accentColor="blue"
            icon={<FiImage size={22} />}
          />

          <FeatureCard
            title="Builder ID Card"
            description="Generate a custom event-style credential badge featuring your developer details, tech stack, and a custom builder title."
            ctaText="Open Card Generator"
            to={ROUTES.BUILDER}
            accentColor="green"
            icon={<FiCreditCard size={22} />}
          />
        </motion.div>
      </motion.div>
    </Section>
  );
};
