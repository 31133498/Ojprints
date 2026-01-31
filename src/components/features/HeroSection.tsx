import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[110vh] flex items-center overflow-hidden overflow-x-hidden bg-gradient-to-br from-background-dark via-background-dark to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(19,236,73,0.05)_1px,transparent_0)] bg-[length:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-bold font-display uppercase tracking-widest">
                Available for Design Projects
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl mx-auto relative">
                <img
                  src="/hero-bio.jpg"
                  alt="Ojo Emmanuel Olasunkanmi — bio"
                  className="w-full h-[70vh] md:h-[85vh] object-cover rounded-xl"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="lg">
                View My Designs
                <span className="material-symbols-outlined">arrow_forward</span>
              </Button>
              <Button variant="secondary" size="lg">
                Design Portfolio
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};