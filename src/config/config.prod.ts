import type { AppConfig } from './config.types';

export const config: AppConfig = {
  emailRedactor: {
    appUrl: 'https://email-privacy-redactor-ai-blue-wood.reflex.run/',
  },
  github: {
    projectPortfolio: 'https://github.com/koval-vlad/Project-Portfolio',
    emailPrivacyRedactorAI: 'https://github.com/koval-vlad/EmailPrivacyRedactorAI',
    hrAnalyticsDashboard: 'https://github.com/koval-vlad/Tableau-Projects/tree/master/HR%20Analytics%20Dashboard',
    modernHRDashboard: 'https://github.com/koval-vlad/Tableau-Projects/tree/master/Modern%20HR%20Dashboard',
    titanicSurvivorStory: 'https://github.com/koval-vlad/Tableau-Projects/tree/master/Who%20Survived%20Titanic%20Tragedy%20Story',
  },
  tableau: {
    apiScript: 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js',
    hrAnalytics: {
      code: 'https://github.com/koval-vlad/Tableau-Projects/tree/master/HR%20Analytics%20Dashboard',
      host: 'https://public.tableau.com/app/profile/vlad.koval/viz/HRAnalyticsDashboard_17688740732590/HRDashboard',
      embed: 'https://public.tableau.com/views/HRAnalyticsDashboard_17688740732590/HRDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    },
    modernHR: {
      code: 'https://github.com/koval-vlad/Tableau-Projects/tree/master/Modern%20HR%20Dashboard',
      host: 'https://public.tableau.com/app/profile/vlad.koval/viz/ModernHRDashboard_17655530147630/HRDashboard',
      embed: 'https://public.tableau.com/views/ModernHRDashboard_17655530147630/HRDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    },
    titanic: {
      code: 'https://github.com/koval-vlad/Tableau-Projects/tree/master/Who%20Survived%20Titanic%20Tragedy%20Story',
      host: 'https://public.tableau.com/app/profile/vlad.koval/viz/WhoSurvivedTitanicTragedyStory/WhoSurvivedTitanicTragedyStory',
      embed: 'https://public.tableau.com/shared/D5J3ZZ2CH?:display_count=n&:origin=viz_share_link',
    },
  },
  officeEmbedBase: 'https://view.officeapps.live.com/op/embed.aspx',
  pgCalc: {
    giftCalcsDemo: 'https://www.pgcalc.com/service/giftcalcs-demo',
  },
  resume: {
    portfolio: 'https://koval-vlad-portfolio.vercel.app',
    linkedin: 'https://www.linkedin.com/in/vlad-koval-614976a4/',
    companies: {
      dynamo: 'https://www.dynamosoftware.com',
      mfs: 'https://www.mfs.com',
      pgcalc: 'https://www.pgcalc.com',
    },
  },
};
