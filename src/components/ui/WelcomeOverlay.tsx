import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WelcomeOverlay: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVisible(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleClose = () => {
    setVisible(false);
    // scroll to hero/bio section
    setTimeout(() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }; 

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-3xl rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xl"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <div className="relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center h-48 md:h-64 lg:h-80">
              <img
                src="/welcome-banner.jpg"
                alt="Welcome — explore the portfolio"
                className="max-w-full max-h-full object-contain object-center"
                loading="eager"
              />
              <button
                aria-label="Close welcome"
                onClick={handleClose}
                className="absolute top-3 right-3 bg-white/80 dark:bg-slate-800 rounded-full p-2 shadow-md"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 text-center">
              <h3 className="text-xl md:text-2xl font-display font-bold mb-2">Welcome — explore my portfolio</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">Start with the portfolio to discover design work. When you're ready, view the bio to learn more.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-medium"
                >
                  Get started
                </button>
                <button
                  onClick={() => setVisible(false)}
                  className="px-6 py-2 border rounded-lg"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
