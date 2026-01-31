import React from 'react';
import { Header } from '../components/features/Header';
import { HeroSection } from '../components/features/HeroSection';
import { WelcomeOverlay } from '../components/ui/WelcomeOverlay';
import { ThankYouOverlay } from '../components/ui/ThankYouOverlay';
import { ServicesSection } from '../components/features/ServicesSection';
import { ProjectsSection } from '../components/features/ProjectsSection';
import { SkillsSection } from '../components/features/SkillsSection';
import { TimelineSection } from '../components/features/TimelineSection';
import { ContactSection } from '../components/features/ContactSection';
import { Footer } from '../components/features/Footer';

export const PortfolioPage: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-body transition-colors duration-300">
      <Header />
      <main>
        <WelcomeOverlay />
        <ThankYouOverlay />
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <SkillsSection />
        <TimelineSection />
        <ContactSection />
        <div id="thankyou-sentinel" className="h-1" />
      </main>
      <Footer />
    </div>
  );
};