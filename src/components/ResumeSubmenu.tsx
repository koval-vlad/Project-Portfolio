import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

interface ResumeSubmenuProps {
  onClose: () => void;
}

export default function ResumeSubmenu({ onClose }: ResumeSubmenuProps) {
  const handleView = () => {
    alert('Resume view opened');
    onClose();
  };

  const handleDownload = () => {
    alert('Resume download started');
    onClose();
  };

  return (
    <>
      <MenuItem onClick={handleView} sx={{ minWidth: 180 }}>
        <ListItemIcon>
          <VisibilityIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>View</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleDownload}>
        <ListItemIcon>
          <DownloadIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Download</ListItemText>
      </MenuItem>
    </>
  );
}
