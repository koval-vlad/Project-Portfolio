import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ width: 48 }} />

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: '#000' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <DesktopNav currentPath={location.pathname} />
          )}

          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#1976d2',
            }}
          >
            JD
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        <MobileNav currentPath={location.pathname} onClose={handleDrawerToggle} />
      </Drawer>

      <Toolbar />
    </>
  );
}
