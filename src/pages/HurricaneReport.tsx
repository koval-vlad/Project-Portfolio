import { Box } from '@/components/ui/box';
import { Typography } from '@/components/ui/typography';
import { Paper } from '@/components/ui/paper';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTornado } from '@fortawesome/free-solid-svg-icons';
import { Presentation } from 'lucide-react';
import SlideShowViewerModal from '../components/SlideShowViewerModal';
import ExcelViewer from '../components/ExcelViewer';
import hurricanePdf from '/docs/Hurricane-Presentation.pdf';
import { config } from '@/config';

export default function HurricaneReport() {
  const [presentationOpen, setPresentationOpen] = useState(false);

  const excelSrc = `${config.officeEmbedBase}?src=${window.location.origin}/docs/Hurricanes-Report.xlsx?version=${new Date().getTime()}`;
  const slideshowImageCount = 28;

  // Slides are served from public/images/hurricane-presentation/ and loaded by SlideShowViewerModal.

  return (
    <Box className="px-0 py-2">
      <Paper elevation={2} className="p-4 rounded-xl">
        <Typography variant="h4" as="h1" className="flex items-center gap-2 justify-between">
          <span className="flex items-center gap-1">
            Hurricane Report<sup style={{ fontSize: '0.8rem', fontWeight: 'normal', fontFamily: 'lucida sans unicode' }}>Personal</sup>
            <FontAwesomeIcon icon={faTornado} style={{ fontSize: '1.2rem' }} />
          </span>
          <Button
            variant="super3d"
            size="sm"
            onClick={() => setPresentationOpen(true)}
            className="text-xs h-7 px-2 flex items-center gap-1.5"
          >
            <Presentation className="h-3.5 w-3.5" />
            Presentation
          </Button>
        </Typography>

        <Typography variant="p" className="mt-2 mb-3">
          Dynamically generated Excel report based on the NOAA Best Track Data to identify all hurricanes that made landfall in a specific US State since 1900 used for risk assessment and emergency planning.
        </Typography>

        <ExcelViewer
          src={excelSrc}
          title="Hurricane Report Excel Workbook"
          initialZoom={0.1}
          excelContainerHeight={800}
        />

        <SlideShowViewerModal
          open={presentationOpen}
          onClose={() => setPresentationOpen(false)}
          pdfUrl={hurricanePdf}
          title="Hurricane Presentation"
          imageDirectory="/images/hurricane-presentation"
          slideCount={slideshowImageCount}
          fileExtension="webp"
        />
      </Paper>
    </Box>
  );
}
