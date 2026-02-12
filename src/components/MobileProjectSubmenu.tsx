import { useState, useEffect } from 'react';
import { List, ListItem } from '@/components/ui/list';
import { Box } from '@/components/ui/box';
import { Typography } from '@/components/ui/typography';
import { useNavigate } from 'react-router-dom';

// Tableau images
import tableauModernHrDash from '../assets/tableau-modern-hr-dash.webp';
import tableauHrDash from '../assets/tableau-hr-dash.webp';
import tableauTitanicStory from '../assets/tableau-titanic-story.webp';

// .NET images
import netDynamoSoft from '../assets/net-dynamo-soft.webp';
import netMfsCrims from '../assets/net-mfs-crims.webp';
import netMfsGpm from '../assets/net-mfs-gpm.webp';
import netMfsIpo from '../assets/net-mfs-ipo.webp';
import netMfsAssetMix from '../assets/net-mfs-asset-mix.webp';
import netMfsMom from '../assets/net-mfs-mom.webp';
import netPgcalcGiftWrapMerge from '../assets/net-pgcalc-gift-wrap-merge.webp';
import netPgcalcGiftCalcs from '../assets/net-pgcalc-gift-calcs.webp';
import vbWebSite from '../assets/vb-web-site.webp';
import netKccHurricane from '../assets/net-kcc-hurricane.webp';

// VB images
import vbPgcalcGiftWrap from '../assets/vb-pgcalc-gift-wrap.webp';
import vbPgcalcDbManager from '../assets/vb-pgcalc-db-manager.webp';

// Python images
import pythonEmailRedactorAi from '../assets/python-email-redactor-ai.webp';

// React images
import reactProjectPortfolio from '../assets/react-project-portfolio.webp';

interface MobileProjectSubmenuProps {
  category: string;
  onClose: () => void;
}

interface Project {
  id: number;
  title: string;
  image: string;
  route: string;
}

const projectData: Record<string, Project[]> = {
  tableau: [
    { id: 1, title: 'Modern HR Dashboard', image: tableauModernHrDash, route: 'modern-hr-dashboard' },
    { id: 2, title: 'HR Analytics Dashboard', image: tableauHrDash, route: 'hr-analytics-dashboard' },
    { id: 3, title: 'Titanic Survivor Story', image: tableauTitanicStory, route: 'titanic-survivor-story' },
  ],
  dotnet: [
    { id: 1, title: 'Dynamo Software', image: netDynamoSoft, route: 'dynamo-software' },
    { id: 2, title: 'CRD Trading System', image: netMfsCrims, route: 'crd-trading-system' },
    { id: 3, title: 'Portfolio Modeler', image: netMfsGpm, route: 'portfolio-modeler' },
    { id: 4, title: 'IPO Module', image: netMfsIpo, route: 'ipo-module' },
    { id: 5, title: 'Asset Mix', image: netMfsAssetMix, route: 'asset-mix' },
    { id: 6, title: 'Order Manager', image: netMfsMom, route: 'order-manager' },
    { id: 7, title: 'GiftWrap Merge', image: netPgcalcGiftWrapMerge, route: 'gift-wrap-merge' },
    { id: 8, title: 'Gift Calcs', image: netPgcalcGiftCalcs, route: 'gift-calcs' },
    { id: 9, title: 'Hurricane Report', image: netKccHurricane, route: 'hurricane-report' },
  ],
  vb: [
    { id: 1, title: 'GiftWrap', image: vbPgcalcGiftWrap, route: 'gift-wrap' },
    { id: 2, title: 'Database Manager', image: vbPgcalcDbManager, route: 'database-manager' },
    { id: 3, title: 'Corporate Web Site', image: vbWebSite, route: 'corporate-website' },
  ],
  python: [
    { id: 1, title: 'Email Redactor AI', image: pythonEmailRedactorAi, route: 'email-redactor-ai' },
    { id: 2, title: 'Pet Analysis Dashboard', image: '/images/python_pet_dashboard.webp', route: 'pet-analysis-dashboard' },
  ],
  react: [
    { id: 1, title: 'Project Portfolio', image: reactProjectPortfolio, route: '' },
  ],
};

export default function MobileProjectSubmenu({
  category,
  onClose,
}: MobileProjectSubmenuProps) {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const projects = projectData[category] || [];

  useEffect(() => {
    setVisibleItems([]);
    const timers: NodeJS.Timeout[] = [];

    for (let i = 0; i < projects.length; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, i * 80);
      timers.push(timer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [category, projects.length]);

  const handleProjectClick = (project: Project) => {
    // If route is empty, navigate to home page
    if (project.route === '') {
      navigate('/');
    } else {
      navigate(`/${category}/${project.route}`);
    }
    onClose();
  };

  return (
    <Box className="w-full max-w-full bg-background overflow-hidden">
      {projects.map((project, index) => (
        <div key={project.id} className={`transition-opacity duration-400 ${visibleItems.includes(index) ? 'opacity-100' : 'opacity-0'}`}>
          <ListItem className="p-0">
            <button
              onClick={() => handleProjectClick(project)}
              className="flex items-center justify-start gap-3 w-full h-16 px-3 rounded-md hover:bg-accent transition-colors cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-20 h-16 object-contain bg-muted rounded-md flex-shrink-0"
              />
              <div className="flex-1 text-left flex items-center h-16">
                <span className="font-medium text-xs leading-tight text-foreground">
                  {project.title}
                </span>
              </div>
            </button>
          </ListItem>
        </div>
      ))}
    </Box>
  );
}
