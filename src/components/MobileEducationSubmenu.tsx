import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

interface MobileEducationSubmenuProps {
  onClose: () => void;
}

export default function MobileEducationSubmenu({ onClose }: MobileEducationSubmenuProps) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate('/education/view');
    onClose();
  };

  const handleDownload = () => {
    alert('Education document download started');
    onClose();
  };

  return (
    <List sx={{ pl: 2, backgroundColor: '#fafafa' }}>
      <ListItem disablePadding>
        <ListItemButton onClick={handleView}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={handleDownload}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Download" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
