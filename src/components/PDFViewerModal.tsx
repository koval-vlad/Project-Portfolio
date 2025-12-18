import { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Modal, Paper, Typography, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerModalProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

export default function PDFViewerModal({ open, onClose, pdfUrl, title = 'PDF Viewer' }: PDFViewerModalProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPresenting, setIsPresenting] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  };

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  }, [numPages]);

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'document.pdf';
    link.click();
  };

  const handlePrint = async () => {
    // Try to fetch the PDF as a blob, open a new window with an embedded PDF
    // and trigger print immediately. Opening the new window from the click
    // preserves the user gesture which many browsers require for print().
    try {
      const resp = await fetch(pdfUrl);
      if (!resp.ok) throw new Error('Failed to fetch PDF');
      const blob = await resp.blob();
      const blobUrl = URL.createObjectURL(blob);

      const newWin = window.open('', '_blank');
      if (!newWin) {
        // Pop-up blocked — fallback to opening PDF directly
        window.open(pdfUrl, '_blank');
        return;
      }

      const html = `
        <!doctype html>
        <html>
          <head>
            <title>Print PDF</title>
            <style>html,body{height:100%;margin:0}embed{width:100%;height:100%;}</style>
          </head>
          <body>
            <embed id="pdfEmbed" src="${blobUrl}" type="application/pdf"></embed>
            <script>
              (function(){
                var emb = document.getElementById('pdfEmbed');
                function doPrint(){
                  try{ window.focus(); window.print(); }catch(e){}
                }
                // Try to print when embed has loaded, otherwise onload of window
                if(emb){ emb.onload = function(){ setTimeout(doPrint, 200); }; }
                window.onload = function(){ setTimeout(doPrint, 300); };
                window.onafterprint = function(){
                  try{ URL.revokeObjectURL('${blobUrl}'); }catch(e){}
                  setTimeout(function(){ window.close(); }, 500);
                };
              })();
            </script>
          </body>
        </html>
      `;

      newWin.document.open();
      newWin.document.write(html);
      newWin.document.close();
    } catch (err) {
      // Final fallback: open PDF in new tab so user can print manually
      window.open(pdfUrl, '_blank');
    }
  };

  const handlePresentation = () => {
    const modalContent = document.querySelector('.pdf-modal-content') as HTMLElement;
    if (modalContent && modalContent.requestFullscreen) {
      modalContent.requestFullscreen();
      setIsPresenting(true);
      setIsPlaying(true);
      setScale(1.5);
    }
  };

  const handleExitPresentation = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsPresenting(false);
    setIsPlaying(false);
    setScale(1.0);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Auto-advance slides when playing
  useEffect(() => {
    if (isPlaying && isPresenting) {
      const interval = setInterval(() => {
        setPageNumber((prev) => {
          if (prev >= numPages) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 5000); // 5 seconds per slide
      return () => clearInterval(interval);
    }
  }, [isPlaying, isPresenting, numPages]);

  // Listen for fullscreen exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isPresenting) {
        setIsPresenting(false);
        setIsPlaying(false);
        setScale(1.0);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isPresenting]);

  // Keyboard controls for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNextPage();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'Escape':
          if (isPresenting) {
            handleExitPresentation();
          }
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, isPresenting, goToNextPage, goToPrevPage]);

  const handleClose = () => {
    setPageNumber(1);
    setScale(1.0);
    setLoading(true);
    setIsPresenting(false);
    setIsPlaying(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={title}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        className="pdf-modal-content"
        elevation={8}
        sx={{
          width: '90%',
          height: '90%',
          maxWidth: '1200px',
          maxHeight: '800px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          overflow: 'hidden',
          '&:fullscreen': {
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: 0,
          },
        }}
      >
        {/* Toolbar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          {/* Left controls - Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={goToPrevPage} disabled={pageNumber <= 1} size="small">
              <NavigateBeforeIcon />
            </IconButton>
            <Typography variant="body2">
              {pageNumber} / {numPages}
            </Typography>
            <IconButton onClick={goToNextPage} disabled={pageNumber >= numPages} size="small">
              <NavigateNextIcon />
            </IconButton>
          </Box>

          {/* Center controls - Zoom or Presentation controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPresenting ? (
              <>
                <IconButton onClick={togglePlayPause} size="small" title={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Typography variant="body2">{isPlaying ? 'Playing (5s)' : 'Paused'}</Typography>
              </>
            ) : (
              <>
                <IconButton onClick={zoomOut} size="small">
                  <ZoomOutIcon />
                </IconButton>
                <Typography variant="body2">{Math.round(scale * 100)}%</Typography>
                <IconButton onClick={zoomIn} size="small">
                  <ZoomInIcon />
                </IconButton>
              </>
            )}
          </Box>

          {/* Right controls - Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPresenting ? (
              <IconButton onClick={handleExitPresentation} size="small" title="Exit Presentation">
                <FullscreenExitIcon />
              </IconButton>
            ) : (
              <>
                <IconButton onClick={handlePresentation} size="small" title="Present">
                  <SlideshowIcon />
                </IconButton>
                <IconButton onClick={handleDownload} size="small" title="Download">
                  <DownloadIcon />
                </IconButton>
                <IconButton onClick={handlePrint} size="small" title="Print">
                  <PrintIcon />
                </IconButton>
              </>
            )}
            <IconButton onClick={handleClose} size="small" title="Close">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* PDF Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: isPresenting ? 'center' : 'flex-start',
            backgroundColor: '#525659',
            p: 2,
          }}
        >
          {loading && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <CircularProgress sx={{ color: '#fff' }} />
            </Box>
          )}
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={null}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </Box>
      </Paper>
    </Modal>
  );
}