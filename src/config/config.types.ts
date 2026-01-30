export interface AppConfig {
  /** Email Redactor AI Reflex app (iframe, host link, postMessage target). */
  emailRedactor: {
    appUrl: string;
  };
  /** GitHub repo URLs. */
  github: {
    projectPortfolio: string;
    emailPrivacyRedactorAI: string;
    hrAnalyticsDashboard: string;
    modernHRDashboard: string;
    titanicSurvivorStory: string;
  };
  /** Tableau public API and viz URLs. */
  tableau: {
    apiScript: string;
    hrAnalytics: { code: string; host: string; embed: string };
    modernHR: { code: string; host: string; embed: string };
    titanic: { code: string; host: string; embed: string };
  };
  /** Office Online embed base (for Excel). */
  officeEmbedBase: string;
  /** PG Calc external links. */
  pgCalc: {
    giftCalcsDemo: string;
  };
  /** Resume / profile links. */
  resume: {
    portfolio: string;
    linkedin: string;
    companies: {
      dynamo: string;
      mfs: string;
      pgcalc: string;
    };
  };
}
