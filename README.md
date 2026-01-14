# ÖjPrïñts Portfolio

A production-grade React portfolio application for Ojo Emmanuel Olasunkanmi, showcasing graphic design projects and creative expertise.

## 🎨 About ÖjPrïñts

**"Ethical Design for a Better Visual World 🌎"**

This portfolio represents the creative journey of Ojo Emmanuel Olasunkanmi, a passionate graphic designer and Mathematical Sciences student at FUTA. The brand ÖjPrïñts embodies the commitment to ethical design principles and purposeful visual communication.

## 🎨 Design Focus

- **Primary Tools**: CorelDRAW, Adobe Photoshop
- **Specialties**: Brand Identity, Print Design, Digital Marketing
- **Philosophy**: Ethical design principles with mathematical precision
- **Education**: Mathematical Sciences at Federal University of Technology, Akure (FUTA)

- **React 18.2** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Query** for server state management
- **React Hot Toast** for notifications
- **Zustand** for client state (ready for implementation)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── pages/
│   └── PortfolioPage.tsx          # Main portfolio page
├── components/
│   ├── ui/
│   │   ├── Button.tsx             # Reusable button component
│   │   └── ProjectCard.tsx        # Project display card
│   └── features/
│       ├── Header.tsx             # Navigation header
│       ├── HeroSection.tsx        # Hero/landing section
│       ├── ProjectsSection.tsx    # Projects showcase
│       ├── SkillsSection.tsx      # Technical skills
│       ├── TimelineSection.tsx    # Career timeline
│       └── Footer.tsx             # Site footer
├── api/
│   └── useProjects.ts             # React Query hook for projects
├── mocks/
│   └── projectsData.ts            # Mock project data
├── types/
│   └── portfolio.types.ts         # TypeScript interfaces
├── utils/
│   └── cn.ts                      # Utility functions
└── App.tsx                        # Root application component
```

## 🎨 Design System

- **Primary Color**: #13ec49 (Signature green)
- **Typography**: Inter font family
- **Spacing**: 8px base unit system
- **Animations**: Framer Motion with 150-300ms transitions
- **Responsive**: Mobile-first approach
- **Theme**: Design-focused with ethical principles

## 💼 Features

- ✅ Fully responsive design
- ✅ Dark mode optimized
- ✅ Smooth animations and transitions
- ✅ Accessible navigation
- ✅ Design portfolio showcase
- ✅ Creative timeline
- ✅ Ethical design principles
- ✅ TypeScript throughout
- ✅ Production-ready build

## 🌎 Live Portfolio

- **Main Portfolio**: [Coming Soon]
- **Design Showcase**: [Coming Soon]
- **Brand Gallery**: [Coming Soon]

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

The application is optimized for deployment on Vercel, Netlify, or any static hosting service.

```bash
npm run build
# Deploy the 'dist' folder
```