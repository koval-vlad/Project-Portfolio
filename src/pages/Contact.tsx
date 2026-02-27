import { useState, useCallback } from 'react';
import { Box } from '@/components/ui/box';
import { Typography } from '@/components/ui/typography';
import { Paper } from '@/components/ui/paper';
import { Button } from '@/components/ui/button';
import { ContactEditor } from '@/lib/lexical-playground/ContactEditor';
import { Mail, XCircle } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SendStatus = 'idle' | 'success' | 'error';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [htmlMessage, setHtmlMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editorKey, setEditorKey] = useState(0);

  const validate = useCallback(() => {
    const next: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!EMAIL_REGEX.test(email.trim())) next.email = 'Please enter a valid email address';
    if (!message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [name, email, message]);

  const resetForm = useCallback(() => {
    setName('');
    setEmail('');
    setMessage('');
    setHtmlMessage('');
    setErrors({});
    setSendStatus('idle');
    setErrorMessage('');
    setEditorKey((k) => k + 1);
  }, []);

  const handleSend = useCallback(async () => {
    if (!validate()) return;
    try {
      const response = await fetch('/api/send-email-via-resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderName: name,
          senderEmail: email,
          message: htmlMessage,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSendStatus('success');
      } else {
        setErrorMessage(result.error ?? 'Failed to send email.');
        setSendStatus('error');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Network or server error.');
      setSendStatus('error');
    }
  }, [validate, name, email, htmlMessage]);

  if (sendStatus === 'success') {
    return (
      <Box className="px-0 py-2">
        <Paper elevation={2} className="p-8 rounded-xl max-w-md mx-auto bg-primary/10 dark:bg-primary/20 border border-primary/30">
          <Box className="flex flex-col items-center text-center space-y-4">
            <Mail className="h-16 w-16 text-primary" strokeWidth={1.5} />
            <Typography variant="h4" as="h2" className="text-foreground font-bold">
              Email Sent Successfully!
            </Typography>
            <Typography className="text-muted-foreground text-sm">
              Your message was successfully sent.
            </Typography>
            <Button
              type="button"
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={resetForm}
            >
              Compose New Email
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  if (sendStatus === 'error') {
    return (
      <Box className="px-0 py-2">
        <Paper elevation={2} className="p-8 rounded-xl max-w-md mx-auto bg-destructive/10 dark:bg-destructive/20 border border-destructive/30">
          <Box className="flex flex-col items-center text-center space-y-4">
            <XCircle className="h-16 w-16 text-destructive" strokeWidth={1.5} />
            <Typography variant="h4" as="h2" className="text-foreground font-bold">
              Email Failed to Send
            </Typography>
            <Typography className="text-muted-foreground text-sm">
              {errorMessage}
            </Typography>
            <Button
              type="button"
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={resetForm}
            >
              Compose New Email
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="px-0 py-2">
      <Paper elevation={2} className="p-6 rounded-xl max-w-7xl mx-auto bg-card/50 border border-border">
        <Typography variant="h4" as="h1" className="mb-6 text-foreground font-bold">
          Contact
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="space-y-4"
        >
          <Box>
            <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-white"
              style={{ colorScheme: 'light' }}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1 text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            )}
          </Box>

          <Box>
            <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-white"
              style={{ colorScheme: 'light' }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1 text-sm text-destructive" role="alert">
                {errors.email}
              </p>
            )}
          </Box>

          <Box>
            <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1">
              Your Message
            </label>
            <div id="contact-message" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contact-message-error' : undefined}>
              <ContactEditor
                key={editorKey}
                placeholder="Your message"
                onPlainTextChange={setMessage}
                onHtmlChange={setHtmlMessage}
              />
            </div>
            {errors.message && (
              <p id="contact-message-error" className="mt-1 text-sm text-destructive" role="alert">
                {errors.message}
              </p>
            )}
          </Box>

          <Button
            type="submit"
            variant="default"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Send
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
