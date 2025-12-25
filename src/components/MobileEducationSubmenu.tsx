import { List, ListItem, ListItemButton, ListItemText, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface MobileEducationSubmenuProps {
  onClose: () => void;
}

export default function MobileEducationSubmenu({ onClose }: MobileEducationSubmenuProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <List sx={{ pl: 2, backgroundColor: '#fafafa' }}>
      {/* Secondary Education Section */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#000',
            fontSize: '0.8rem',
          }}
        >
          Secondary Education
        </Typography>
      </Box>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleNavigation('/education/formal-degree')} sx={{ pl: 3 }}>
          <ListItemText 
            primary="Formal Degree" 
            sx={{ '& .MuiTypography-root': { color: '#1976d2', fontSize: '0.875rem' } }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleNavigation('/education/certificates')} sx={{ pl: 3 }}>
          <ListItemText 
            primary="Certificates" 
            sx={{ '& .MuiTypography-root': { color: '#1976d2', fontSize: '0.875rem' } }}
          />
        </ListItemButton>
      </ListItem>

      {/* Professional Development Section */}
      <Box sx={{ px: 2, py: 1, mt: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#000',
            fontSize: '0.8rem',
          }}
        >
          Professional Development
        </Typography>
      </Box>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleNavigation('/education/pluralsight')} sx={{ pl: 3 }}>
          <ListItemText 
            primary="Pluralsight" 
            sx={{ '& .MuiTypography-root': { color: '#1976d2', fontSize: '0.875rem' } }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleNavigation('/education/oracle-university')} sx={{ pl: 3 }}>
          <ListItemText 
            primary="Oracle University" 
            sx={{ '& .MuiTypography-root': { color: '#1976d2', fontSize: '0.875rem' } }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleNavigation('/education/other')} sx={{ pl: 3 }}>
          <ListItemText 
            primary="Other" 
            sx={{ '& .MuiTypography-root': { color: '#1976d2', fontSize: '0.875rem' } }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
