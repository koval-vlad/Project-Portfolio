import { Box, Typography, Container, Paper } from '@mui/material';

export default function EducationView() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Education
        </Typography>
        <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Master of Science in Computer Science
          </Typography>
          <Typography variant="body1" color="text.secondary">
            University Name - 2020
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Specialized in full-stack development, data visualization, and machine learning.
          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Bachelor of Science in Software Engineering
          </Typography>
          <Typography variant="body1" color="text.secondary">
            University Name - 2018
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Foundation in software development, algorithms, and system design.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
