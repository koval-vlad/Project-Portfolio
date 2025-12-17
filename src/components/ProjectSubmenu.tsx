import { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Tableau images
import tableauModernHrDash from '../assets/tableau-modern-hr-dash.gif';
import tableauHrDash from '../assets/tableau-hr-dash.gif';
import tableauTitanicStory from '../assets/tableau-titanic-story.gif';

// .NET images
import netDynamoSoft from '../assets/net-dynamo-soft.jpg';
import netMfsCrims from '../assets/net-mfs-crims.gif';
import netMfsGpm from '../assets/net-mfs-gpm.gif';
import netMfsIpo from '../assets/net-mfs-ipo.gif';
import netMfsAssetMix from '../assets/net-mfs-asset-mix.gif';
import netMfsMom from '../assets/net-mfs-mom.gif';
import netPgcalcGiftWrapMerge from '../assets/net-pgcalc-gift-wrap-merge.gif';
import netPgcalcGiftCalcs from '../assets/net-pgcalc-gift-calcs.gif';
import netPgcalcBatchCalcs from '../assets/net-pgcalc-batch-calcs.gif';
import netKccHurricane from '../assets/net-kcc-hurricane.gif';

// VB images
import vbPgcalcGiftWrap from '../assets/vb-pgcalc-gift-wrap.gif';
import vbPgcalcDbManager from '../assets/vb-pgcalc-db-manager.gif';

interface ProjectSubmenuProps {
  category: string;
  onClose: () => void;
}

interface Project {
  id: number;
  title: string;
  image: string;
}

const projectData: Record<string, Project[]> = {
  tableau: [
    { id: 1, title: 'Modern HR Dashboard', image: tableauModernHrDash },
    { id: 2, title: 'HR Analytics Dashboard', image: tableauHrDash },
    { id: 3, title: 'Titanic Survivor Story', image: tableauTitanicStory },
  ],
  dotnet: [
    { id: 1, title: 'Dynamo Software', image: netDynamoSoft },
    { id: 2, title: 'CRD Trading System', image: netMfsCrims },
    { id: 3, title: 'Portfolio Modeler', image: netMfsGpm },
    { id: 4, title: 'IPO Module', image: netMfsIpo },
    { id: 5, title: 'Asset Mix', image: netMfsAssetMix },
    { id: 6, title: 'Order Manager', image: netMfsMom },
    { id: 7, title: 'GiftWrap Merge', image: netPgcalcGiftWrapMerge },
    { id: 8, title: 'Gift Calcs', image: netPgcalcGiftCalcs },
    { id: 9, title: 'Batch Calcs', image: netPgcalcBatchCalcs },
    { id: 10, title: 'Hurricane Report', image: netKccHurricane },
  ],
  vb: [
    { id: 1, title: 'GiftWrap', image: vbPgcalcGiftWrap },
    { id: 2, title: 'Database Manager', image: vbPgcalcDbManager },
  ],
};

export default function ProjectSubmenu({ category, onClose }: ProjectSubmenuProps) {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const projects = projectData[category] || [];
  const columnCount = category === 'dotnet' ? 5 : category === 'vb' ? 2 : 3;

  useEffect(() => {
    setVisibleItems([]);
    const timers: NodeJS.Timeout[] = [];

    for (let i = 0; i < projects.length; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, i * 50);
      timers.push(timer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [category, projects.length]);

  const handleProjectClick = (projectId: number) => {
    navigate(`/${category}/${projectId}`);
    onClose();
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: 2,
        p: 2,
        maxWidth: category === 'dotnet' ? 1200 : category === 'vb' ? 470 : 700,
      }}
    >
      {projects.map((project, index) => (
        <Fade key={project.id} in={visibleItems.includes(index)} timeout={500}>
          <Card
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              width: 208,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              },
            }}
            onClick={() => handleProjectClick(project.id)}
          >
            <CardMedia
              component="img"
              image={project.image}
              alt={project.title}
              sx={{ width: 208, height: 160, objectFit: 'cover' }}
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="body2" align="center" fontWeight={500}>
                {project.title}
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      ))}
    </Box>
  );
}
