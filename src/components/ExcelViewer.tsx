import { useState } from 'react';
import { Box } from '@/components/ui/box';
import { IconButton } from '@/components/ui/icon-button';
import { Typography } from '@/components/ui/typography';
import { CircularProgress } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

interface ExcelViewerProps {
  src: string;
  title?: string;
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  excelContainerHeight?: number;
}

export default function ExcelViewer({
  src,
  title = "Excel Workbook",
  initialZoom = 1.0,
  minZoom = 0.1,
  maxZoom = 2.0,
  zoomStep = 0.1,
  excelContainerHeight = 1000,
}: ExcelViewerProps) {
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + zoomStep, maxZoom));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - zoomStep, minZoom));
  };

  return (
    <Box>
      {/* Zoom Controls */}
      <Box className="flex items-center justify-center gap-1 mb-1">
        <IconButton onClick={handleZoomOut} disabled={zoom <= minZoom} size="small" title="Zoom Out">
          <ZoomOutIcon />
        </IconButton>
        <Typography variant="small" className="min-w-15 text-center">
          {Math.round(zoom * 100)}%
        </Typography>
        <IconButton onClick={handleZoomIn} disabled={zoom >= maxZoom} size="small" title="Zoom In">
          <ZoomInIcon />
        </IconButton>
      </Box>

      {/* Excel Viewer Container */}
      <Box className="w-full border border-gray-300 rounded-lg overflow-hidden relative" style={{ height: `${excelContainerHeight}px` }}>
        {/* Loading Spinner */}
        {isLoading && (
          <Box
            className="absolute inset-0 flex items-start justify-center pt-6 bg-background/50 backdrop-blur-sm z-10 rounded-lg"
          >
            <CircularProgress size={48} />
          </Box>
        )}

        {/* Error State */}
        {hasError && !isLoading && (
          <Box className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10 rounded-lg">
            <Typography variant="p" className="text-center text-muted-foreground">
              Failed to load Excel workbook
            </Typography>
          </Box>
        )}

        <Box className="w-full h-full" style={{
          zoom: zoom,
          transformOrigin: 'top left'
        }}>
          <iframe
            src={src}
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title={title}
            onLoad={handleLoad}
            onError={handleError}
            loading="eager"
          />
        </Box>
      </Box>
    </Box>
  );
}
