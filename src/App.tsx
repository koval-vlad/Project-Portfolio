"use client"

import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@/components/ui/box';
import Header from './components/Header';
import DynamicBackground from './components/DynamicBackground';
import { ThemeProvider } from './components/ThemeProvider';
import { useTheme } from 'next-themes';

// Lazy-loaded page components for route splitting (Vite code splitting)
const Home = lazy(() => import('./pages/Home'));
const ModernHRDashboard = lazy(() => import('./pages/ModernHRDashboard'));
const HRAnalyticsDashboard = lazy(() => import('./pages/HRAnalyticsDashboard'));
const TitanicSurvivorStory = lazy(() => import('./pages/TitanicSurvivorStory'));
const DynamoSoftware = lazy(() => import('./pages/DynamoSoftware'));
const CRDTradingSystem = lazy(() => import('./pages/CRDTradingSystem'));
const PortfolioModeler = lazy(() => import('./pages/PortfolioModeler'));
const IPOModule = lazy(() => import('./pages/IPOModule'));
const AssetMix = lazy(() => import('./pages/AssetMix'));
const OrderManager = lazy(() => import('./pages/OrderManager'));
const GiftWrapMerge = lazy(() => import('./pages/GiftWrapMerge'));
const GiftCalcs = lazy(() => import('./pages/GiftCalcs'));
const CorporateWebSite = lazy(() => import('./pages/CorporateWebSite'));
const HurricaneReport = lazy(() => import('./pages/HurricaneReport'));
const GiftWrap = lazy(() => import('./pages/GiftWrap'));
const DatabaseManager = lazy(() => import('./pages/DatabaseManager'));
const FormalDegree = lazy(() => import('./pages/FormalDegree'));
const Certificates = lazy(() => import('./pages/Certificates'));
const Pluralsight = lazy(() => import('./pages/Pluralsight'));
const OracleUniversity = lazy(() => import('./pages/OracleUniversity'));
const OtherEducation = lazy(() => import('./pages/OtherEducation'));
const Resume = lazy(() => import('./pages/Resume'));
const EmailRedactorAI = lazy(() => import('./pages/EmailRedactorAI'));

function PageLoader() {
  return (
    <Box className="flex items-center justify-center min-h-[200px] text-muted-foreground">
      Loading…
    </Box>
  );
}

function AppContent() {
  const { theme } = useTheme();

  // Apply theme class to document element for proper modal theming
  useEffect(() => {
    if (theme) {
      // Get current classes to preserve non-theme classes
      const currentClasses = Array.from(document.documentElement.classList);
      const classesToPreserve = currentClasses.filter(cls =>
        !cls.startsWith('theme-')
      );

      // Remove all theme classes
      document.documentElement.classList.remove(
        'theme-bold-tech',
        'theme-midnight-bloom',
        'theme-amethyst-haze',
        'theme-catppuccin'
      );

      // Add the new theme
      document.documentElement.classList.add(theme);

      // Ensure preserved classes are still there
      classesToPreserve.forEach(cls => {
        document.documentElement.classList.add(cls);
      });
    }
  }, [theme]);

  return (
    <Router>
      <Box className="min-h-screen relative">
        <DynamicBackground />
        <Header />
        <Box className="pt-2 px-6 relative z-10">
          <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tableau/modern-hr-dashboard" element={<ModernHRDashboard />} />
                <Route path="/tableau/hr-analytics-dashboard" element={<HRAnalyticsDashboard />} />
                <Route path="/tableau/titanic-survivor-story" element={<TitanicSurvivorStory />} />
                <Route path="/dotnet/dynamo-software" element={<DynamoSoftware />} />
                <Route path="/dotnet/crd-trading-system" element={<CRDTradingSystem />} />
                <Route path="/dotnet/portfolio-modeler" element={<PortfolioModeler />} />
                <Route path="/dotnet/ipo-module" element={<IPOModule />} />
                <Route path="/dotnet/asset-mix" element={<AssetMix />} />
                <Route path="/dotnet/order-manager" element={<OrderManager />} />
                <Route path="/dotnet/gift-wrap-merge" element={<GiftWrapMerge />} />
                <Route path="/dotnet/gift-calcs" element={<GiftCalcs />} />
                <Route path="/vb/corporate-website" element={<CorporateWebSite />} />
                <Route path="/dotnet/hurricane-report" element={<HurricaneReport />} />
                <Route path="/vb/gift-wrap" element={<GiftWrap />} />
                <Route path="/vb/database-manager" element={<DatabaseManager />} />
                <Route path="/python/email-redactor-ai" element={<EmailRedactorAI />} />
                <Route path="/education/formal-degree" element={<FormalDegree />} />
                <Route path="/education/certificates" element={<Certificates />} />
                <Route path="/education/pluralsight" element={<Pluralsight />} />
                <Route path="/education/oracle-university" element={<OracleUniversity />} />
                <Route path="/education/other" element={<OtherEducation />} />
                <Route path="/resume" element={<Resume />} />
              </Routes>
          </Suspense>
            </Box>
          </Box>
        </Router>
  );
}

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="theme-bold-tech"
      themes={["theme-bold-tech", "theme-midnight-bloom", "theme-amethyst-haze", "theme-catppuccin"]}
      enableSystem
      disableTransitionOnChange
    >
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
