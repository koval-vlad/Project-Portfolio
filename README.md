# My Portfolio

A modern, interactive portfolio website showcasing professional projects, education, and skills. Built with React, TypeScript, and a comprehensive set of modern web technologies.

**Live Demo:** [https://koval-vlad-portfolio.vercel.app/](https://koval-vlad-portfolio.vercel.app/)

## 🎯 Purpose

This portfolio serves as a comprehensive showcase of professional and personal development work, demonstrating full-stack development capabilities across multiple technology stacks including Tableau, .NET, VB/ASP, and Python. The site features an interactive, themeable interface with dynamic weather effects and responsive design.

## 🏗️ Architecture

The application follows a component-based React architecture with the following structure:

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── DesktopNav.tsx  # Desktop navigation menu
│   ├── MobileNav.tsx   # Mobile navigation menu
│   ├── Header.tsx      # Site header with controls
│   ├── DynamicBackground.tsx  # Theme-aware background
│   └── ...
├── pages/              # Route components
│   ├── Home.tsx        # Landing page
│   ├── ModernHRDashboard.tsx
│   ├── DynamoSoftware.tsx
│   ├── EmailRedactorAI.tsx
│   └── ...
├── assets/             # SVG images and static assets
├── lib/                 # Utility functions
└── types/               # TypeScript type definitions
```

### Key Architectural Decisions

- **Component-Based Design**: Modular, reusable components for maintainability
- **Client-Side Routing**: React Router for seamless navigation
- **Theme System**: Centralized theme management with `next-themes`
- **State Management**: React hooks and localStorage for persistence
- **Responsive Design**: Mobile-first approach with adaptive layouts

## 🛠️ Technologies Used

### Core Framework
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Vite 7.3.0** - Build tool and dev server
- **React Router DOM 7.10.1** - Client-side routing

### UI Libraries & Components
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Dropdown menus, dialogs, collapsible, tabs, tooltips, etc.
- **Material-UI (MUI) 7.3.6** - Additional UI components and icons
- **Lucide React** - Icon library
- **Framer Motion 12.23.26** - Animation library

### Theme & Styling
- **next-themes 0.4.6** - Theme management
- **class-variance-authority** - Component variant management
- **tailwindcss-animate** - Animation utilities
- **@emotion/react & @emotion/styled** - CSS-in-JS

### Additional Libraries
- **react-pdf 10.2.0** - PDF viewer for documents
- **@fortune-sheet/react** - Spreadsheet component
- **xlsx 0.18.5** - Excel file handling
- **@tsparticles/react** - Particle effects for weather animations
- **react-icons** - Additional icon sets

### Development Tools
- **ESLint** - Code linting
- **PostCSS & Autoprefixer** - CSS processing
- **TypeScript ESLint** - TypeScript linting

## ✨ Features

### 🌦️ Interactive Weather System
The portfolio includes a unique weather system that affects the home page background:

- **Three Weather Modes**: Sunny, Rain, and Snow
- **Particle Effects**: Canvas-based animations that respond to weather selection
- **Cross-Tab Synchronization**: Weather preference syncs across browser tabs using localStorage
- **Persistent State**: Weather choice is saved and restored on page reload
- **Dynamic Background**: Particle system adapts colors based on current theme

**How it works:**
- Weather selector in the header allows users to choose between sunny, rain, or snow
- Selection triggers particle animations on the home page
- Uses `@tsparticles/react` for smooth, performant particle rendering
- State managed via localStorage and custom events for real-time updates

### 🎨 Theme System
Four distinct color themes with light/dark mode support:

1. **Bold Tech** (Default)
   - Vibrant purple gradient backgrounds
   - High contrast for readability
   - Tech-focused aesthetic

2. **Midnight Bloom**
   - Soft purple grid patterns
   - Elegant, professional look
   - Subtle radial gradients

3. **Amethyst Haze**
   - Pink/purple gradient overlays
   - Modern, minimalist design
   - Grid-based patterns

4. **Catppuccin**
   - Pastel color palette
   - Softer, warmer tones
   - Popular developer theme

**Theme Features:**
- **Light/Dark Mode Toggle**: Independent of theme selection
- **System Preference Detection**: Automatically detects OS color scheme
- **Persistent Storage**: Theme and mode preferences saved in localStorage
- **Smooth Transitions**: Animated theme switching
- **Dynamic Backgrounds**: Each theme has unique background patterns that adapt to light/dark mode

### 📱 Responsive Navigation
- **Desktop Navigation**: Horizontal dropdown menus with project cards
- **Mobile Navigation**: Collapsible sidebar menu
- **Auto-Hide Header**: Header hides on scroll down, shows on scroll up
- **Active Route Highlighting**: Current page is visually indicated
- **Smooth Animations**: Fade-in effects for menu items

### 📄 Project Showcases
Organized by technology stack:

- **Tableau Projects**
  - Modern HR Dashboard (interactive Tableau embed)
  - HR Analytics Dashboard
  - Titanic Survivor Story

- **.NET Projects**
  - Dynamo Software
  - CRD Trading System
  - Portfolio Modeler
  - IPO Module
  - Asset Mix
  - Order Manager
  - GiftWrap Merge
  - Gift Calcs
  - Hurricane Report

- **VB/ASP Projects**
  - GiftWrap
  - Database Manager
  - Corporate Web Site

- **Python Projects**
  - Email Redactor AI (embedded Reflex web app)

### 📚 Education Section
Comprehensive education showcase:
- Formal Degree
- Certificates (interactive viewer)
- Pluralsight courses
- Oracle University courses
- Other education

### 📄 Document Viewers
- **PDF Viewer**: Built-in PDF viewer for resumes and presentations
- **Excel Viewer**: Spreadsheet viewer for data files
- **SVG Slideshow**: Presentation viewer with navigation controls

## 🗂️ Site Structure

```
/                           # Home page with weather effects
/tableau/
  ├── modern-hr-dashboard    # Interactive Tableau dashboard
  ├── hr-analytics-dashboard
  └── titanic-survivor-story
/dotnet/
  ├── dynamo-software
  ├── crd-trading-system
  ├── portfolio-modeler
  ├── ipo-module
  ├── asset-mix
  ├── order-manager
  ├── gift-wrap-merge
  ├── gift-calcs
  └── hurricane-report
/vb/
  ├── gift-wrap
  ├── database-manager
  └── corporate-website
/python/
  └── email-redactor-ai     # Embedded Reflex web application
/education/
  ├── formal-degree
  ├── certificates
  ├── pluralsight
  ├── oracle-university
  └── other
/resume                      # Resume viewer
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/koval-vlad/my-portfolio-lovable.git
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment

The project is configured for deployment on Vercel:

- **vercel.json**: Configured for SPA routing (all routes redirect to index.html)
- Automatic deployments on push to main branch
- Environment variables can be configured in Vercel dashboard

## 🎨 Customization

### Adding a New Theme

1. Add theme class to `src/index.css`:
```css
:root.theme-your-theme {
  --background: ...;
  --foreground: ...;
  /* other color variables */
}
```

2. Add background styles to `src/components/DynamicBackground.tsx`
3. Add theme option to `src/components/Header.tsx` theme dropdown
4. Update `App.tsx` themes array

### Adding a New Project

1. Create page component in `src/pages/`
2. Add route to `src/App.tsx`
3. Add project data to `src/components/ProjectSubmenu.tsx` and `MobileProjectSubmenu.tsx`
4. Add project image to `src/assets/`

## 📝 License

ISC

## 👤 Author

Vlad Koval

## 🔗 Links

- **Live Demo**: [https://koval-vlad-portfolio.vercel.app/](https://koval-vlad-portfolio.vercel.app/)
- **Repository**: [https://github.com/koval-vlad/my-portfolio-lovable](https://github.com/koval-vlad/my-portfolio-lovable)

---

Built with ❤️ using React, TypeScript, and modern web technologies.
