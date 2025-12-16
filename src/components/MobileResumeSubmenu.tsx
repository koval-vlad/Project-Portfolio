import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

interface MobileResumeSubmenuProps {
  onClose: () => void;
}

export default function MobileResumeSubmenu({ onClose }: MobileResumeSubmenuProps) {
  const handleView = () => {
    alert('Resume view opened');
    onClose();
  };

  const handleDownload = () => {
    alert('Resume download started');
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
