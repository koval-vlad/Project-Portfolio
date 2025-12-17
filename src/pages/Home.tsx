import { Box, Typography, Paper } from '@mui/material';

export default function Home() {
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
            </Paper>
        </Box>
    );
}
