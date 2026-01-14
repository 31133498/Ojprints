import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../ui/ProjectCard';
import { useProjects } from '../../api/useProjects';

export const ProjectsSection: React.FC = () => {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <section className="py-24 bg-background-light dark:bg-background-dark" id="projects">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark" id="projects">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-display text-sm font-bold uppercase tracking-widest mb-3 italic"
          >
            // Portfolio
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-900 dark:text-white text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Design Portfolio Projects
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Creative design projects showcasing ethical visual communication and purposeful graphic design solutions.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects?.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary hover:underline font-display font-medium inline-flex items-center gap-2" 
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Design Projects
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};