import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  thumbnailSrc,
  alt,
  className = '',
  onClick
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(thumbnailSrc || src);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && !hasError) {
      if (thumbnailSrc && currentSrc === thumbnailSrc) {
        const highResImg = new Image();
        highResImg.onload = () => {
          setCurrentSrc(src);
          setIsLoaded(true);
        };
        highResImg.onerror = () => setHasError(true);
        highResImg.src = src;
      } else {
        setIsLoaded(true);
      }
    }
  }, [isInView, src, thumbnailSrc, currentSrc, hasError]);

  const handleError = () => {
    setHasError(true);
    setCurrentSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+PC9zdmc+');
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isInView && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
      )}
      
      {isInView && (
        <motion.img
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0.7,
            scale: isLoaded ? 1 : 1.1
          }}
          transition={{ duration: 0.3 }}
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${isLoaded ? '' : 'blur-sm'}`}
          onLoad={() => !thumbnailSrc && setIsLoaded(true)}
          onError={handleError}
          onClick={onClick}
          loading="eager"
          decoding="async"
        />
      )}
      
      {!isLoaded && isInView && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};