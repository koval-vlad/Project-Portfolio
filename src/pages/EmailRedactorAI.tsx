import { Box } from '@/components/ui/box';
import { Typography } from '@/components/ui/typography';
import { Paper } from '@/components/ui/paper';
import { Button } from '@/components/ui/button';
import { EmailOutlined } from '@mui/icons-material';
import { Code, ExternalLink, Presentation } from 'lucide-react';
import { useState } from 'react';
import SlideShowViewerModal from '../components/SlideShowViewerModal';
import IframeWithLoader from '../components/IframeWithLoader';
import emailRedactorPdf from '/docs/Email-Redactor-Presentation.pdf';
import { config } from '@/config';

export default function EmailRedactorAI() {
  const [presentationOpen, setPresentationOpen] = useState(false);
  const slideshowImageCount = 21;

  const handleCodePreview = () => {
    window.open(config.github.emailPrivacyRedactorAI, '_blank', 'noopener,noreferrer');
  };
  const handleHostView = () => {
    window.open(config.emailRedactor.appUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box className="px-0 py-2">
      <Paper elevation={2} className="p-2 rounded-xl">
        <Typography variant="h4" as="h2" className="mb-2 flex items-center gap-2 justify-between">
          <span className="flex items-center gap-1">
            Email Redactor AI<sup style={{ fontSize: '0.8rem', fontWeight: 'normal', fontFamily: 'lucida sans unicode' }}>Personal</sup>
            <EmailOutlined sx={{ fontSize: '1.5rem' }} />
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
          AI-powered email privacy tool that automatically redacts sensitive information 
          such as names, phone numbers, SSN, API keys, tokens, amounts, emails, addresses, credit cards, 
          passwords, IDs, and account numbers. Compose your email, attach images, and preview the redacted 
          version with AI feedback.
        </Typography>
        <Box className="mt-6">
          <IframeWithLoader
            src={config.emailRedactor.appUrl}
            title="Email Redactor AI"
            allow="clipboard-read; clipboard-write"
          />
        </Box>
        <SlideShowViewerModal
          open={presentationOpen}
          onClose={() => setPresentationOpen(false)}
          pdfUrl={emailRedactorPdf}
          title="Email Redactor AI Presentation"
          imageDirectory="/images/email-redactor-presentation"
          slideCount={slideshowImageCount}
          fileExtension="webp"
        />
      </Paper>
    </Box>
  );
}

