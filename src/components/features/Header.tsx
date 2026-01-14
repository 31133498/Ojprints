import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <span className="material-symbols-outlined text-3xl">palette</span>
          </div>
          <h2 className="text-slate-900 dark:text-white font-display text-xl font-bold tracking-tight">
            ÖjPrïñts
          </h2>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium font-display"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium font-display"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('achievements')}
            className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium font-display"
          >
            Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('skills')}
            className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium font-display"
          >
            Tools
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium font-display"
          >
            Contact
          </button>
        </nav>
        
        <div className="flex items-center gap-6">
          <Button variant="primary" size="sm">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Portfolio
            </a>
          </Button>
          <div className="h-10 w-10 rounded-full border border-primary/30 overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Professional portrait of Ojo Emmanuel Olasunkanmi" 
              src="/ojo-profile.jpg" 
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};