import React, { useState } from 'react';
import { Lightbox } from '../ui/Lightbox';

export const ServicesSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imgKey, setImgKey] = useState(0);

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-display font-bold mb-3">Services</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Services I offer — click to view more details.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl rounded-lg p-4 bg-white/50 dark:bg-black/40">
          {!hasError ? (
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open services banner"
              className="w-full"
            >
              <img
                key={imgKey}
                src="/services-banner.jpg"
                alt="Services banner"
                className="w-full h-auto rounded-md object-cover shadow-2xl"
                loading="eager"
                onError={() => setHasError(true)}
                onLoad={() => setHasError(false)}
              />
            </button>
          ) : (
            <div className="p-8 text-center">
              <p className="text-slate-700 dark:text-slate-300 mb-4">Unable to load services image.</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => { setHasError(false); setImgKey(k => k + 1); }}
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Retry
                </button>
                <a href="/services-banner.jpg" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border rounded-md">
                  Open directly
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <Lightbox
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          imageSrc="/services-banner.jpg"
          imageAlt="Services banner"
          title="Services"
        />
      )}
    </section>
  );
};
