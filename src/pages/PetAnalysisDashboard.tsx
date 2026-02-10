import { Box } from '@/components/ui/box';
import { Typography } from '@/components/ui/typography';
import { Paper } from '@/components/ui/paper';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { Code, ExternalLink, Presentation } from 'lucide-react';
import { useState } from 'react';
import SlideShowViewerModal from '../components/SlideShowViewerModal';
import petDashboardPdf from '/docs/Pet-Dashboard-Presentation.pdf';
import { config } from '@/config';

export default function PetAnalysisDashboard() {
  const [presentationOpen, setPresentationOpen] = useState(false);
  const slideshowImageCount = 16;

  const handleCodePreview = () => {
    window.open(config.github.petOwnershipAnalysis, '_blank', 'noopener,noreferrer');
  };
  const handleHostView = () => {
    window.open(config.petAnalysis.appUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box className="px-0 py-2">
      <Paper elevation={2} className="p-2 rounded-xl">
        <Typography variant="h4" as="h2" className="mb-2 flex items-center gap-2 justify-between">
          <span className="flex items-center gap-1">
            Pet Analysis Dashboard<sup style={{ fontSize: '0.8rem', fontWeight: 'normal', fontFamily: 'lucida sans unicode' }}>Personal</sup>
            <BarChart3 className="h-6 w-6" />
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
          Interactive pet ownership analysis dashboard built with Python, Streamlit, and Hugging Face Spaces.
          Explore pet ownership patterns, demographics, and trends through visualizations and data insights.
        </Typography>
        <Box className="mt-6">
          <iframe
            src={config.petAnalysis.appUrl}
            width="100%"
            height="950px"
            style={{ border: 'none', borderRadius: '8px' }}
            title="Pet Analysis Dashboard"
            allow="clipboard-read; clipboard-write"
          />
        </Box>
        <SlideShowViewerModal
          open={presentationOpen}
          onClose={() => setPresentationOpen(false)}
          pdfUrl={petDashboardPdf}
          title="Pet Analysis Dashboard Presentation"
          imageDirectory="/images/pet_dashboard_presentation"
          slideCount={slideshowImageCount}
          fileExtension="webp"
        />
      </Paper>
    </Box>
  );
}
