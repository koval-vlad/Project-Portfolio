import { Box } from '@/components/ui/box';
import { Paper } from '@/components/ui/paper';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import BarChartIcon from '@mui/icons-material/AreaChartOutlined';
import { Code, ExternalLink, Presentation } from 'lucide-react';
import SlideShowViewerModal from '../components/SlideShowViewerModal';
import hrAnalyticsPdf from '/docs/HR-Analytics-Presentation.pdf';
import { config } from '@/config';

export default function HRAnalyticsDashboard() {
  const [presentationOpen, setPresentationOpen] = useState(false);
  const slideshowImageCount = 16;

  const handleCodePreview = () => {
    window.open(config.tableau.hrAnalytics.code, '_blank', 'noopener,noreferrer');
  };
  const handleHostView = () => {
    window.open(config.tableau.hrAnalytics.host, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = config.tableau.apiScript;
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
            HR Analytics Dashboard<sup style={{ fontSize: '0.8rem', fontWeight: 'normal', fontFamily: 'lucida sans unicode' }}>Personal</sup>
            <BarChartIcon style={{ fontSize: '1.5rem' }} />
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
          Advanced analytics dashboard for human resources data analysis, featuring interactive visualizations
          and key performance indicators for HR decision making.
        </Typography>        
        <div className="myTableauViz" style={{ width: '100%', maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto' }}>
          <tableau-viz
            id="tableauViz"
            src={config.tableau.hrAnalytics.embed}
            width="100%"
            height="810px"
            toolbar="bottom"
            hide-tabs
          ></tableau-viz>
        </div>
        <SlideShowViewerModal
          open={presentationOpen}
          onClose={() => setPresentationOpen(false)}
          pdfUrl={hrAnalyticsPdf}
          title="HR Analytics Dashboard Presentation"
          imageDirectory="/images/hr-analytics-presentation"
          slideCount={slideshowImageCount}
          fileExtension="webp"
        />
      </Paper>
    </Box>
  );
}
