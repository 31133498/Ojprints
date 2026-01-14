export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface TimelineMilestone {
  phase: string;
  title: string;
  description: string;
  icon: string;
  isActive?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
}