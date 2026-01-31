import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThankYouOverlay: React.FC = () => {
  const [visible, setVisible] = useState(false);
  // closedRef prevents immediate re-show while the sentinel remains in view.
  const closedRef = useRef(false);
  // userScrolled ensures the overlay only appears after the user has interacted/scrolls (prevents showing on initial load)
  const userScrolledRef = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVisible(false);
        closedRef.current = true;
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      userScrolledRef.current = true;
      window.removeEventListener('scroll', onScroll);
    };
    // wait for any user scroll before allowing the overlay to show
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sentinel = document.getElementById('thankyou-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // reset the closed flag when the user scrolls away so the overlay can show again
            closedRef.current = false;
          } else if (entry.isIntersecting && !closedRef.current && (userScrolledRef.current || (typeof window !== 'undefined' && (window.scrollY || document.documentElement.scrollTop) > 50))) {
            setVisible(true);
          }
        });
      },
      { root: null, threshold: 0.25 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => { setVisible(false); closedRef.current = true; }}
        >
          <motion.div
            className="w-full max-w-3xl rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center h-48 md:h-64 lg:h-80">
              <img
                src="/thankyou-banner.jpg"
                alt="Thank you"
                className="max-w-full max-h-full object-contain object-center"
                loading="eager"
              />
              <button
                aria-label="Close thank you"
                onClick={() => { setVisible(false); closedRef.current = true; }}
                className="absolute top-3 right-3 bg-white/80 dark:bg-slate-800 rounded-full p-2 shadow-md"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 text-center">
              <h3 className="text-xl md:text-2xl font-display font-bold mb-2">Thank you for viewing</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">Appreciate you taking the time to explore the work — get in touch if you'd like to collaborate.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => { setVisible(false); closedRef.current = true; }}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => { setVisible(false); closedRef.current = true; document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="px-6 py-2 border rounded-lg"
                >
                  Back to portfolio
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
