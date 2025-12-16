import { Box, Typography, Container } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Portfolio
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Showcasing my work across Tableau, React, .NET, and Python
        </Typography>
        <Typography variant="body1" paragraph>
          This is a professional portfolio application demonstrating full-stack development capabilities.
          Use the navigation menu above to explore different sections of my work.
        </Typography>
      </Box>
    </Container>
  );
}
