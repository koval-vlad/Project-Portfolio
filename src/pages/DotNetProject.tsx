import { Box, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function DotNetProject() {
  const { id } = useParams<{ id: string }>();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to .NET Project {id}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for .NET project content.
        </Typography>
      </Box>
    </Container>
  );
}
