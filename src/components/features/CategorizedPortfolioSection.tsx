import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioCategories } from '../../api/usePortfolioCategories';
import { DriveProject } from '../../api/googleDriveService';
import { LazyImage } from '../ui/LazyImage';
import { Lightbox } from '../ui/Lightbox';

export const CategorizedPortfolioSection: React.FC = () => {
  const { data: categories, isLoading } = usePortfolioCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<DriveProject | null>(null);

  if (isLoading) {
    return (
      <section className="py-24 bg-background-light dark:bg-background-dark" id="portfolio">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-primary font-display text-sm font-bold uppercase tracking-widest mb-3 italic">
              // Portfolio
            </h2>
            <h3 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-display font-bold mb-6">
              Loading Design Categories...
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const selectedCategoryData = categories?.find(cat => cat.id === selectedCategory);

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark" id="portfolio">
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
            Design Portfolio Categories
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Explore my diverse design work across {categories?.length} categories with {categories?.reduce((sum, cat) => sum + cat.count, 0)} total projects
          </motion.p>
        </div>

        {!selectedCategory ? (
          // Category Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                    {category.images.length > 0 ? (
                      <>
                        <LazyImage
                          src={category.images[0].image}
                          thumbnailSrc={category.images[0].thumbnailImage}
                          alt={`${category.name} preview`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                          <span className="material-symbols-outlined text-2xl">
                            {category.icon}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <span className="material-symbols-outlined text-6xl text-primary/80 relative z-10">
                          {category.icon}
                        </span>
                      </>
                    )}
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                      {category.count}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-slate-900 dark:text-white text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      {category.count} design{category.count !== 1 ? 's' : ''} available
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      View Collection
                      <span className="material-symbols-outlined ml-2 text-lg group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Selected Category Images
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
                  {selectedCategoryData?.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {selectedCategoryData?.count} designs in this collection
                </p>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Categories
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {selectedCategoryData?.images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setLightboxImage(image)}
                >
                  <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl">
                    <div className="aspect-square relative overflow-hidden">
                      <LazyImage
                        src={image.image}
                        thumbnailSrc={image.thumbnailImage}
                        alt={image.name}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <span className="material-symbols-outlined text-slate-800 text-2xl">
                            zoom_in
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-slate-700 dark:text-slate-300 text-sm font-medium truncate">
                        {image.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {lightboxImage && (
          <Lightbox
            isOpen={!!lightboxImage}
            onClose={() => setLightboxImage(null)}
            imageSrc={lightboxImage.image}
            imageAlt={lightboxImage.name}
            title={`${lightboxImage.category} - ${lightboxImage.name}`}
          />
        )}
      </div>
    </section>
  );
};