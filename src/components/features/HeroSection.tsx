import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background-dark via-background-dark to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(19,236,73,0.05)_1px,transparent_0)] bg-[length:40px_40px] pointer-events-none" />
      
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
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-display font-black text-white leading-tight tracking-tighter mb-6"
            >
              ÖjPrï<span className="text-primary italic">ñts</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light mb-10 max-w-2xl"
            >
              From discovering design at age 13 to mastering{' '}
              <span className="text-primary font-medium">ethical visual communication</span>. 
              <strong>Ojo Emmanuel Olasunkanmi</strong>: Graphic Designer and Mathematical Sciences student creating purposeful designs for a better visual world.
            </motion.p>
            
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
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end relative z-20"
          >
            <div className="relative cursor-pointer" onClick={() => window.open('#', '_blank')}>
              <div className="w-80 h-80 rounded-full border-4 border-primary/30 overflow-hidden shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Ojo Emmanuel Olasunkanmi - ÖjPrïñts Designer" 
                  src="/ojo-profile.jpg"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse">
                <span className="material-symbols-outlined text-background-dark text-2xl">palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};