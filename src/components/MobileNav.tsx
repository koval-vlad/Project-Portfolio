import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
  Divider,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import MobileProjectSubmenu from './MobileProjectSubmenu';
import MobileResumeSubmenu from './MobileResumeSubmenu';

interface MobileNavProps {
  currentPath: string;
  onClose: () => void;
}

export default function MobileNav({ currentPath, onClose }: MobileNavProps) {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (menuName: string) => {
    setOpenMenus({ ...openMenus, [menuName]: !openMenus[menuName] });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const menuItems = [
    { label: 'Home', path: '/', expandable: false, category: '' },
    { label: 'Tableau', path: '/tableau', expandable: true, category: 'tableau' },
    { label: '.NET', path: '/dotnet', expandable: true, category: 'dotnet' },
    { label: 'VB', path: '/vb', expandable: true, category: 'vb' },
    { label: 'Education', path: '/education/view', expandable: false, category: '' },
    { label: 'Resume', path: '/resume', expandable: true, category: '' },
  ];

  return (
    <Box sx={{ width: 280, pt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <Box key={item.label}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.expandable) {
                    handleToggle(item.label);
                  } else {
                    handleNavigate(item.path);
                  }
                }}
                sx={{
                  backgroundColor: isActive(item.path) ? '#e3f2fd' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      color: isActive(item.path) ? '#1976d2' : '#000',
                      fontWeight: isActive(item.path) ? 600 : 400,
                    },
                  }}
                />
                {item.expandable &&
                  (openMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>

            {item.expandable && item.label !== 'Resume' && item.category && (
              <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
                <MobileProjectSubmenu
                  category={item.category}
                  onClose={onClose}
                />
              </Collapse>
            )}

            {item.label === 'Resume' && (
              <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
                <MobileResumeSubmenu onClose={onClose} />
              </Collapse>
            )}

            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
}
