import { useState, useRef } from 'react';
import { Box } from '@/components/ui/box';
import { Typography } from '@/components/ui/typography';
import { CircularProgress } from '@mui/material';

interface IframeWithLoaderProps {
  src: string;
  title?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  allow?: string;
  className?: string;
}

export default function IframeWithLoader({
  src,
  title = "Embedded Content",
  width = "100%",
  height = "950px",
  style = {},
  allow,
  className = "",
}: IframeWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Box className={`relative ${className}`} style={{ width, height, ...style }}>
      {/* Loading Spinner */}
      {isLoading && (
        <Box
          className="absolute inset-0 flex items-start justify-center pt-6 bg-background/50 backdrop-blur-sm z-10 rounded-lg"
          style={{ borderRadius: style.borderRadius || '8px' }}
        >
          <CircularProgress size={48} />
        </Box>
      )}

      {/* Error State */}
      {hasError && !isLoading && (
        <Box className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10 rounded-lg">
          <Box className="text-center text-muted-foreground">
            <Typography variant="p">Failed to load content</Typography>
          </Box>
        </Box>
      )}

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        src={src}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px',
          ...style,
        }}
        title={title}
        allow={allow}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager"
      />
    </Box>
  );
}
