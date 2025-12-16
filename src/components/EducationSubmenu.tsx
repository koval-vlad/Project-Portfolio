import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

interface EducationSubmenuProps {
  onClose: () => void;
}

export default function EducationSubmenu({ onClose }: EducationSubmenuProps) {
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
