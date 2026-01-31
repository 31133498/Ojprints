import React from 'react';
import { CategorizedPortfolioSection } from './CategorizedPortfolioSection';
import { ReviewsSection } from './ReviewsSection';

export const ProjectsSection: React.FC = () => {
  return (
    <>
      <CategorizedPortfolioSection />
      <ReviewsSection />
    </>
  );
};