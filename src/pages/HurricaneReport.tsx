import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import { useState } from 'react';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SVGSpriteViewerModal from '../components/SVGSpriteViewerModal';
import hurricanePdf from '/docs/Hurricane-Presentation.pdf';

export default function HurricaneReport() {
  const [presentationOpen, setPresentationOpen] = useState(false);

  return (
    <Box sx={{ px: '8px', py: 2 }}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: '10px',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" component="h1">
          Hurricane Report
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
          A comprehensive reporting system for tracking and analyzing hurricane data,
          providing detailed analytics and visualizations for risk assessment and emergency planning.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<SlideshowIcon />}
            onClick={() => setPresentationOpen(true)}
            sx={{ mt: 0, mr: 2 }}
          >
            View Presentation            
          </Button>
        </Box>

        <Box sx={{
          width: '100%',
          height: '600px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5'
        }}>
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${window.location.origin}/docs/Hurricanes-Report.xlsx`}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Hurricanes Report Excel Workbook"
            style={{ border: 'none' }}
            onError={(e) => {
              // Fallback if iframe fails to load
              const target = e.target as HTMLIFrameElement;
              target.style.display = 'none';
              const fallback = target.parentElement?.querySelector('.excel-fallback');
              if (fallback) {
                (fallback as HTMLElement).style.display = 'flex';
              }
            }}
          />
          <Box
            className="excel-fallback"
            sx={{
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              p: 3
            }}
          >
            <InsertDriveFileIcon sx={{ fontSize: 64, color: '#1976d2', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Interactive Hurricane Report
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Excel workbook with multiple sheets, zoom controls, and interactive elements including video launch capabilities.
            </Typography>
            <Button
              variant="contained"
              startIcon={<InsertDriveFileIcon />}
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/docs/Hurricanes-Report.xlsx';
                link.download = 'Hurricanes-Report.xlsx';
                link.click();
              }}
            >
              Download Excel File
            </Button>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              For full interactivity including sheet navigation, zoom controls, and video playback,
              please download and open the file in Microsoft Excel or a compatible spreadsheet application.
            </Typography>
          </Box>
        </Box>
        <SVGSpriteViewerModal
          open={presentationOpen}
          onClose={() => setPresentationOpen(false)}
          pdfUrl={hurricanePdf}
          title="Hurricane Presentation"
          slideDirectory="/images/hurricane-presentation"
          slideCount={28}
        />
      </Paper>
    </Box>
  );
}
