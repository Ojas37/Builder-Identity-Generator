import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './Card';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface FeatureCardProps {
  title: string;
  description: string;
  ctaText: string;
  to: string;
  accentColor?: 'blue' | 'green';
  icon?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  ctaText,
  to,
  accentColor = 'blue',
  icon,
}) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card
        glowColor={accentColor}
        className="flex flex-col justify-between h-full border border-white/5 bg-gradient-to-b from-neutral-900/40 to-neutral-950/80 p-8 min-h-[280px]"
      >
        <div>
          <div
            className={cn(
              'w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border glass-panel',
              {
                'border-accent-blue/30 text-accent-blue bg-accent-blue/5': accentColor === 'blue',
                'border-accent-green/30 text-accent-green bg-accent-green/5': accentColor === 'green',
              }
            )}
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3 tracking-tight text-white">{title}</h3>
          <p className="text-sm text-neutral-400 leading-relaxed mb-8">{description}</p>
        </div>

        <Link to={to} className="w-full">
          <Button
            variant={accentColor === 'blue' ? 'accent-blue' : 'accent-green'}
            fullWidth
            className="font-medium"
          >
            {ctaText}
          </Button>
        </Link>
      </Card>
    </motion.div>
  );
};
