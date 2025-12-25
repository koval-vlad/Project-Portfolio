import { Box, Typography, Paper, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function GiftCalcs() {
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
          Gift Calcs
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<OpenInNewIcon />}
              onClick={() => window.open('https://www.pgcalc.com/service/giftcalcs-demo', '_blank')}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              View GiftCalcs
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
