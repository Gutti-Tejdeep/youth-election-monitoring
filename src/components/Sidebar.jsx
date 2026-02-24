import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import WarningIcon from '@mui/icons-material/Warning';
import ForumIcon from '@mui/icons-material/Forum';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

// Define the width of the drawer
const drawerWidth = 250;

// Array of navigation items
const navItems = [
  { text: 'Home', icon: HomeIcon, path: '/home' },
  { text: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { text: 'Reports', icon: AssignmentIcon, path: '/reports' },
  { text: 'Interaction', icon: ForumIcon, path: '/interaction' },
  { text: 'Volunteers', icon: GroupIcon, path: '/volunteers' },
  { text: 'Incidents', icon: WarningIcon, path: '/incidents' },
];

function Sidebar({ isOpen, handleDrawerToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();

  const handleItemClick = () => {
    // Only close the sidebar on mobile when an item is clicked
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  // Filter nav items based on role
  const filteredNavItems = navItems.filter(item => {
    if (!user) return false;
    const role = user.role;

    if (role === 'Admin') return true;

    if (role === 'Citizen') {
      return ['Home', 'Interaction', 'Incidents'].includes(item.text);
    }

    if (role === 'Election Observer') {
      return ['Home', 'Dashboard', 'Reports', 'Incidents', 'Interaction'].includes(item.text);
    }

    if (role === 'Data Analyst') {
      return ['Home', 'Dashboard', 'Reports'].includes(item.text);
    }

    return ['Home'].includes(item.text); // Default
  });

  const drawerContent = (
    <div>
      <Toolbar sx={{ gap: 1.5, py: 2 }}>
        <Logo size={32} color1="#ffffff" color2="rgba(255,255,255,0.7)" />
        <Typography variant="h6" noWrap component="div" sx={{
          fontWeight: 800,
          color: '#fff',
          letterSpacing: 0.5,
          fontFamily: "'Outfit', sans-serif"
        }}>
          YEM Monitor
        </Typography>
      </Toolbar>
      <List sx={{ px: 1 }}>
        {filteredNavItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            {/* NavLink is used to handle routing and active state */}
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={handleItemClick}
              sx={{
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateX(5px)',
                },
                '&.active': {
                  background: 'rgba(255, 255, 255, 0.25)',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  '& .MuiListItemIcon-root': {
                    color: '#fff',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', minWidth: 40 }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Permanent drawer for larger screens (sm and up) */}
      <Drawer
        variant="permanent"
        sx={{
          // Show permanent drawer only on sm+ when `isOpen` is true
          display: { xs: 'none', sm: isOpen ? 'block' : 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0 20px 20px 0',
            margin: '16px 0 16px 16px',
            height: 'calc(100vh - 32px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          },
        }}
        open={isOpen}
      >
        {drawerContent}
      </Drawer>

      {/* Temporary drawer for mobile screens (xs) */}
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;