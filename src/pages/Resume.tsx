import { Box, Typography, Container } from '@mui/material';

export default function Resume() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Resume
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for the resume page content.
        </Typography>
      </Box>
    </Container>
  );
}
