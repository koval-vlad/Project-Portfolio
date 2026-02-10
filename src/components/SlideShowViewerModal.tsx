import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Play,
  Pause,
  Presentation,
  ZoomIn,
  ZoomOut,
  Printer,
  Download,
  Maximize,
  Minimize,
  Shuffle,
} from 'lucide-react';
import { TransitionType, transitionVariants } from '@/lib/slideshow-transitions';
import SlideShow from './SlideShow';
import DynamicBackground from './DynamicBackground';

interface SlideShowViewerModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  imageDirectory: string; // e.g. "/images/titanic-presentation"
  slideCount: number;
  fileExtension?: string; // default "webp"
  pdfUrl?: string; // optional, for download/print
}

export default function SlideShowViewerModal({
  open,
  onClose,
  title = 'Presentation',
  imageDirectory,
  slideCount,
  fileExtension = 'webp',
  pdfUrl,
}: SlideShowViewerModalProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPresenting, setIsPresenting] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1.5);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(true);
  const [transitionType, setTransitionType] = useState<TransitionType>('random');
  const [slideInterval, setSlideInterval] = useState<number>(10);

  const currentImageSrc =
    open && slideCount > 0 && currentSlideIndex >= 0 && currentSlideIndex < slideCount
      ? `${imageDirectory}/Slide${currentSlideIndex + 1}.${fileExtension}`
      : '';

  useEffect(() => {
    if (!open) {
      setCurrentSlideIndex(0);
      setIsPresenting(false);
      setIsPlaying(false);
      setScale(1.0);
      setTranslateX(0);
      setTranslateY(0);
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => console.error(err));
      }
    }
  }, [open]);

  useEffect(() => {
    if (scale <= 1) {
      setTranslateX(0);
      setTranslateY(0);
    }
  }, [scale]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (open && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.error(err));
    }
  }, [open]);

  useEffect(() => {
    if (isPlaying && isPresenting && slideCount) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => {
          if (prev >= slideCount - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, slideInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isPresenting, slideCount, slideInterval]);

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setTranslateX(0);
      setTranslateY(0);
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < slideCount - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setTranslateX(0);
      setTranslateY(0);
    }
  };

  const goToFirstSlide = () => {
    setCurrentSlideIndex(0);
    setTranslateX(0);
    setTranslateY(0);
  };
  const goToLastSlide = () => {
    setCurrentSlideIndex(slideCount - 1);
    setTranslateX(0);
    setTranslateY(0);
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = title ? `${title.replace(/\s+/g, '-')}.pdf` : 'presentation.pdf';
      link.click();
    }
  };

  const handlePrint = () => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl, '_blank');
      if (printWindow) {
        printWindow.onload = () => setTimeout(() => printWindow.print(), 1000);
      } else {
        window.open(pdfUrl, '_blank');
      }
    }
  };

  const startPresentation = () => {
    setIsPresenting(true);
    setIsPlaying(true);
    setCurrentSlideIndex(0);
    setTranslateX(0);
    setTranslateY(0);
  };

  const stopPresentation = () => {
    setIsPresenting(false);
    setIsPlaying(false);
  };

  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.1));

  const handlePan = useCallback((deltaX: number, deltaY: number) => {
    setTranslateX((prev) => prev + deltaX);
    setTranslateY((prev) => prev + deltaY);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const displayPageNumber = currentSlideIndex + 1;
  const totalSlides = slideCount;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`${
          isFullscreen
            ? 'w-screen h-screen max-w-none rounded-none bg-black [&>button]:hidden'
            : 'w-[95vw] h-[95vh] max-w-[1400px] max-h-[900px] [&>button]:hidden'
        } flex flex-col overflow-hidden transition-all duration-300 p-0 gap-0 bg-card`}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        {/* Header */}
        <div className="flex justify-between items-center p-1 bg-card border-b border-border min-h-8 mb-0">
          {!isPresenting && (
            <div className="flex items-center gap-0.5">
              <Button
                onClick={goToFirstSlide}
                disabled={currentSlideIndex <= 0}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                title="First Slide"
              >
                <ChevronsLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                onClick={goToPrevSlide}
                disabled={currentSlideIndex <= 0}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                title="Previous Slide"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="min-w-8 text-center text-xs px-1 text-foreground">
                {displayPageNumber}/{totalSlides}
              </span>
              <Button
                onClick={goToNextSlide}
                disabled={currentSlideIndex >= totalSlides - 1}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                title="Next Slide"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
              <Button
                onClick={goToLastSlide}
                disabled={currentSlideIndex >= totalSlides - 1}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                title="Last Slide"
              >
                <ChevronsRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}

          <div className="flex items-center gap-0.5">
            <Button
              onClick={zoomOut}
              disabled={scale <= 0.1}
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <span className="min-w-8 text-center text-xs px-0.5 text-foreground">
              {Math.round(scale * 100)}%
            </span>
            <Button
              onClick={zoomIn}
              disabled={scale >= 3.0}
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                  title={`Slide Interval: ${slideInterval}s`}
                >
                  ⏱️ {slideInterval}s
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Slide Interval
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[5, 8, 10, 15, 20, 30, 45, 60].map((seconds) => (
                    <DropdownMenuItem
                      key={seconds}
                      onClick={() => setSlideInterval(seconds)}
                      className={`text-xs text-center justify-center ${slideInterval === seconds ? 'bg-accent' : ''}`}
                    >
                      {seconds}s
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                  title={`Transition: ${transitionType === 'random' ? 'Random' : transitionType}`}
                >
                  <Shuffle className="h-3.5 w-3.5 mr-1" />
                  {transitionType === 'random' ? 'Random' : transitionType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 p-2" align="end">
                <div className="grid grid-cols-4 gap-1">
                  <div className="space-y-1 col-span-4 border-b border-primary/30 pb-2 mb-2">
                    <div className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded">
                      ✨ RANDOM
                    </div>
                    <DropdownMenuItem
                      onClick={() => setTransitionType('random')}
                      className={`text-sm font-semibold ${transitionType === 'random' ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}
                    >
                      🎲 Random Transition
                    </DropdownMenuItem>
                  </div>
                  {[
                    { label: 'Subtle', slice: [0, 3] },
                    { label: 'Push', slice: [3, 7] },
                    { label: 'Zoom', slice: [7, 10] },
                    { label: '3D', slice: [10, 14] },
                    { label: 'Wipes', slice: [14, 17] },
                    { label: 'Dynamic', slice: [17, 20] },
                    { label: 'Sci-Fi', slice: [20, 23] },
                    { label: 'Creative', slice: [23] },
                  ].map(({ label, slice }) => (
                    <div key={label} className="space-y-1">
                      <div className="text-xs font-medium text-muted-foreground px-2 py-1">
                        {label}
                      </div>
                      {(typeof slice === 'number'
                        ? transitionVariants.slice(slice)
                        : transitionVariants.slice(slice[0], slice[1])
                      ).map((variant) => (
                        <DropdownMenuItem
                          key={variant.name}
                          onClick={() => setTransitionType(variant.name as TransitionType)}
                          className={`text-xs ${transitionType === variant.name ? 'bg-accent' : ''}`}
                        >
                          {variant.name}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {isPresenting ? (
              <>
                <Button
                  onClick={togglePlayPause}
                  size="sm"
                  variant="default"
                  className="h-7 px-2"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </Button>
                <span className="text-xs px-1 hidden sm:inline text-foreground">
                  {isPlaying ? 'Playing' : 'Paused'}
                </span>
              </>
            ) : (
              <Button
                onClick={startPresentation}
                size="sm"
                variant="default"
                className="h-7 px-2"
                title="Start Presentation"
              >
                <Presentation className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-0.5">
            {!isPresenting && (
              <>
                <Button
                  onClick={handleDownload}
                  disabled={!pdfUrl}
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  title={pdfUrl ? 'Download PDF' : 'Download PDF (no PDF linked)'}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <Button
                  onClick={handlePrint}
                  disabled={!pdfUrl}
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  title={pdfUrl ? 'Print All Slides' : 'Print All Slides (no PDF linked)'}
                >
                  <Printer className="h-3.5 w-3.5" />
                </Button>
                <Button
                  onClick={toggleFullscreen}
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize className="h-3.5 w-3.5" />
                  ) : (
                    <Maximize className="h-3.5 w-3.5" />
                  )}
                </Button>
              </>
            )}
            <Button
              onClick={isPresenting ? stopPresentation : onClose}
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
              title={isPresenting ? 'Exit Presentation' : 'Close'}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Slide content */}
        <div className="flex-1 overflow-auto flex justify-center items-center p-4 relative">
          <DynamicBackground positioning="absolute" />

          {currentImageSrc ? (
            <div
              key={`slide-${currentSlideIndex}`}
              className={`w-full h-full flex justify-center items-center ${
                isFullscreen ? 'overflow-hidden p-0' : 'overflow-auto p-4'
              }`}
            >
              <div
                style={{
                  width: '100%',
                  height: isFullscreen ? '95vh' : '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: isFullscreen ? 'flex-start' : 'center',
                  backgroundColor: isFullscreen ? 'transparent' : 'hsl(var(--card))',
                  borderRadius: isFullscreen ? '0' : '8px',
                  boxShadow: isFullscreen ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  marginTop: isFullscreen ? '2.5vh' : '0',
                }}
              >
                <div
                  style={{
                    transform: `translate(${translateX / scale}px, ${translateY / scale}px) scale(${scale})`,
                    transformOrigin: 'center center',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: isFullscreen ? 'flex-start' : 'center',
                  }}
                >
                  <SlideShow
                    currentSlide={currentSlideIndex}
                    imageSrc={currentImageSrc}
                    transitionType={transitionType}
                    className="w-full h-full"
                    scale={scale}
                    onPinchZoom={setScale}
                    onPan={scale > 1 ? handlePan : undefined}
                    onSwipeLeft={currentSlideIndex < slideCount - 1 ? goToNextSlide : undefined}
                    onSwipeRight={currentSlideIndex > 0 ? goToPrevSlide : undefined}
                  />
                </div>
              </div>
            </div>
          ) : (
            <span className="text-muted-foreground">No slides to display</span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
