import { Box } from '@/components/ui/box';
import { Paper } from '@/components/ui/paper';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { useEffect, useState } from 'react';
import { HiOutlinePresentationChartLine } from 'react-icons/hi';
import { Code, ExternalLink, Presentation } from 'lucide-react';
import SlideShowViewerModal from '../components/SlideShowViewerModal';
import hrDashboardPdf from '/docs/HR-Dashboard.pdf';

export default function ModernHRDashboard() {
  const [presentationOpen, setPresentationOpen] = useState(false);
  const slideshowImageCount = 16;

  const handleCodePreview = () => {
    window.open('https://github.com/koval-vlad/Tableau-Projects/tree/master/Modern%20HR%20Dashboard', '_blank', 'noopener,noreferrer');
  };
  const handleHostView = () => {
    window.open('https://public.tableau.com/app/profile/vlad.koval/viz/ModernHRDashboard_17655530147630/HRDashboard', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box className="px-0 py-2">
      <Paper elevation={2} className="p-2 rounded-xl">
        <Typography variant="h4" as="h2" className="mb-2 flex items-center gap-2 justify-between">
          <span className="flex items-center gap-1">
            Modern HR Dashboard<sup style={{ fontSize: '0.8rem', fontWeight: 'normal', fontFamily: 'lucida sans unicode' }}>Personal</sup>
            <HiOutlinePresentationChartLine style={{ fontSize: '1.5rem' }} />
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="super3d"
              size="sm"
              onClick={() => setPresentationOpen(true)}
              className="text-xs h-7 px-2 flex items-center gap-1.5"
            >
              <Presentation className="h-3.5 w-3.5" />
              Presentation
            </Button>
            <Button
              variant="super3d"
              size="sm"
              onClick={handleCodePreview}
              className="text-xs h-7 px-2 flex items-center gap-1.5"
            >
              <Code className="h-3.5 w-3.5" />
              Code
            </Button>         
            <Button
              variant="super3d"
              size="sm"
              onClick={handleHostView}
              className="text-xs h-7 px-2 flex items-center gap-1.5"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Host
            </Button>   
          </div>
        </Typography>
        <Typography variant="p" className="mb-3">
          An interactive Tableau dashboard providing comprehensive analytics for human resources management,
          including employee demographics, performance metrics, and organizational insights.
        </Typography>
        <div className="myTableauViz" style={{ width: '100%', maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto' }}>
          <tableau-viz
            id="tableauViz"
            src="https://public.tableau.com/views/ModernHRDashboard_17655530147630/HRDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
            width="100%"
            height="800px"
            toolbar="bottom"
            hide-tabs
          ></tableau-viz>
        </div>
        <SlideShowViewerModal
          open={presentationOpen}
          onClose={() => setPresentationOpen(false)}
          pdfUrl={hrDashboardPdf}
          title="HR Modern Dashboard Presentation"
          imageDirectory="/images/hr-dashboard-presentation"
          slideCount={slideshowImageCount}
          fileExtension="webp"
        />
      </Paper>
    </Box>
  );
}
