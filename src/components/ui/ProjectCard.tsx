import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LazyImage } from './LazyImage';
import { Lightbox } from './Lightbox';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  thumbnailImage?: string;
  technologies: string[];
  link?: string;
  number?: string;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  thumbnailImage,
  technologies,
  link,
  number,
  index
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLightboxOpen(true);
  };

  const handleCardClick = () => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="group relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
        onClick={handleCardClick}
      >
        {number && (
          <div className="absolute top-4 left-4 z-10 w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
            <span className="text-background-dark font-display font-black text-lg">{number}</span>
          </div>
        )}
        
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleImageClick}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-primary/90 transition-colors group/btn"
            aria-label="View full image"
          >
            <span className="material-symbols-outlined text-white text-lg group-hover/btn:scale-110 transition-transform">
              zoom_in
            </span>
          </button>
        </div>
        
        <div className="h-64 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          <LazyImage
            src={image}
            thumbnailSrc={thumbnailImage}
            alt={`${title} project screenshot`}
            className="h-full"
            onClick={() => handleImageClick({} as React.MouseEvent)}
          />
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-slate-900 dark:text-white text-2xl font-display font-bold group-hover:text-primary transition-colors">
              {title}
            </h4>
            {link && (
              <span className="material-symbols-outlined text-slate-500 hover:text-primary transition-colors">
                open_in_new
              </span>
            )}
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full uppercase tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageSrc={image}
        imageAlt={`${title} project screenshot`}
        title={title}
      />
    </>
  );
};