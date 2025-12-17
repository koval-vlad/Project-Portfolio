import { Box, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const projectData = [
  { id: 1, label: 'GiftWrap' },
  { id: 2, label: 'Database Manager' },
];

export default function VBProject() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1', 10);
  const project = projectData.find(p => p.id === projectId) || projectData[0];

  return (
    <Box sx={{ px: '8px', py: 2 }}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: '10px',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h3" component="h1">
          {project.label}
        </Typography>
      </Paper>
    </Box>
  );
}
