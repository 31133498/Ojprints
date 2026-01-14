import React from 'react';
import { motion } from 'framer-motion';

interface TimelineMilestone {
  phase: string;
  title: string;
  description: string;
  icon: string;
  isActive?: boolean;
}

const milestones: TimelineMilestone[] = [
  {
    phase: "PHASE 1: THE DISCOVERY",
    title: "Age 13: The Design Awakening",
    description: "Discovering the power of visual communication through colors, shapes, and layout. The moment when curiosity transformed into commitment to graphic design as a creative expression tool.",
    icon: "lightbulb",
    isActive: true
  },
  {
    phase: "PHASE 2: SKILL MASTERY", 
    title: "Mastering the Creative Tools",
    description: "Dedicated learning of CorelDRAW for vector graphics and Adobe Photoshop for image manipulation. Building foundation skills in Microsoft Office Suite for professional communication.",
    icon: "palette"
  },
  {
    phase: "PHASE 3: ETHICAL VISION",
    title: "Building ÖjPrïñts Brand", 
    description: "Establishing ÖjPrïñts with the mission of 'Ethical Design for a Better Visual World 🌎'. Combining Mathematical Sciences studies at FUTA with creative practice for structured, purposeful design.",
    icon: "public"
  }
];

export const TimelineSection: React.FC = () => {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark" id="timeline">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-display text-sm font-bold uppercase tracking-widest mb-3 italic"
          >
            // Creative Journey
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-900 dark:text-white text-4xl font-display font-bold"
          >
            The Design Evolution
          </motion.h3>
        </div>
        
        <div className="relative border-l-2 border-primary/20 ml-6 pl-10 space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className={`absolute -left-[51px] top-1 h-10 w-10 rounded-full border-4 border-background-dark flex items-center justify-center ${
                milestone.isActive 
                  ? 'bg-primary shadow-[0_0_15px_rgba(19,236,73,0.5)]' 
                  : 'bg-slate-800'
              }`}>
                <span className={`material-symbols-outlined text-lg font-bold ${
                  milestone.isActive ? 'text-background-dark' : 'text-primary'
                }`}>
                  {milestone.icon}
                </span>
              </div>
              
              <div>
                <span className={`font-display font-bold text-sm tracking-widest ${
                  milestone.isActive ? 'text-primary' : 'text-slate-500'
                }`}>
                  {milestone.phase}
                </span>
                <h4 className="text-slate-900 dark:text-white text-2xl font-display font-bold mt-1 mb-2">
                  {milestone.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};