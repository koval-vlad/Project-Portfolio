import { Box } from '@/components/ui/box';
import { Typography } from '@/components/ui/typography';
import { Paper } from '@/components/ui/paper';
import { Button } from '@/components/ui/button';
import { EmailOutlined } from '@mui/icons-material';

export default function EmailRedactorAI() {
  const handleCodePreview = () => {
    window.open('https://github.com/koval-vlad/EmailPrivacyRedactorAI', '_blank', 'noopener,noreferrer');
  };

  return (
    <Box className="px-0 py-2">
      <Paper elevation={2} className="p-2 rounded-xl">
        <Typography variant="h4" as="h2" className="mb-2 flex items-center gap-2 justify-between">
          <span className="flex items-center gap-1">
            Email Redactor AI
            <EmailOutlined sx={{ fontSize: '1.5rem' }} />
          </span>
          <Button
            variant="super3d"
            size="sm"
            onClick={handleCodePreview}
            className="text-xs h-7 px-2"
          >
            Code Preview
          </Button>
        </Typography>
        <Typography variant="p" className="mb-3">
          AI-powered email privacy tool that automatically redacts sensitive information 
          such as names, phone numbers, SSN, API keys, tokens, amounts, emails, addresses, credit cards, 
          passwords, IDs, and account numbers. Compose your email, attach images, and preview the redacted 
          version with AI feedback.
        </Typography>
        <Box className="mt-6">
          <iframe
            src="https://email-privacy-redactor-ai-blue-wood.reflex.run/"
            width="100%"
            height="950px"
            style={{ border: 'none', borderRadius: '8px' }}
            title="Email Redactor AI"
            allow="clipboard-read; clipboard-write"
          />
        </Box>
      </Paper>
    </Box>
  );
}

