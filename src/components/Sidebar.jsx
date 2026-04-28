import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Drawer } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import WarningIcon from '@mui/icons-material/Warning';
import ForumIcon from '@mui/icons-material/Forum';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { text: 'Home', icon: HomeIcon, path: '/home' },
  { text: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { text: 'Reports', icon: AssignmentIcon, path: '/reports' },
  { text: 'Interaction', icon: ForumIcon, path: '/interaction' },
  { text: 'Volunteers', icon: GroupIcon, path: '/volunteers' },
  { text: 'Incidents', icon: WarningIcon, path: '/incidents' },
  { text: 'Profile', icon: GroupIcon, path: '/profile' },
];

function Sidebar({ isOpen, handleDrawerToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();

  const handleItemClick = () => {
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  // Filter nav items based on role
  const filteredNavItems = navItems.filter(item => {
    if (!user) return false;
    const role = (user.role || 'citizen').toLowerCase();

    if (role === 'admin') return true;

    if (role === 'citizen') {
      return ['Home', 'Dashboard', 'Reports', 'Interaction', 'Incidents', 'Profile'].includes(item.text);
    }

    if (role === 'election observer') {
      return ['Home', 'Dashboard', 'Reports', 'Incidents', 'Interaction', 'Profile'].includes(item.text);
    }

    if (role === 'data analyst') {
      return ['Home', 'Dashboard', 'Reports', 'Profile'].includes(item.text);
    }

    if (role === 'volunteer') {
      return ['Home', 'Dashboard', 'Reports', 'Interaction', 'Incidents', 'Profile', 'Volunteers'].includes(item.text);
    }

    return ['Home', 'Profile'].includes(item.text);
  });

  // Horizontal nav content
  const horizontalNav = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: 2,
        py: 1,
        overflowX: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      {filteredNavItems.map((item) => (
        <ListItemButton
          key={item.text}
          component={NavLink}
          to={item.path}
          onClick={handleItemClick}
          sx={{
            borderRadius: '12px',
            color: 'var(--text-primary)',
            px: 2,
            py: 1,
            minWidth: 'auto',
            whiteSpace: 'nowrap',
            gap: 1,
            transition: 'all 0.3s ease',
            '&.active': {
              background: 'var(--border-light)',
              color: 'var(--text-primary)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              '& .MuiListItemIcon-root': {
                color: 'var(--text-primary)',
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: 'var(--text-primary)', minWidth: 'auto' }}>
            <item.icon sx={{ fontSize: 20 }} />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
            {item.text}
          </Typography>
        </ListItemButton>
      ))}
    </Box>
  );

  return (
    <>
      {/* Desktop: Horizontal bar below navbar */}
      <Box
        component="nav"
        sx={{
          display: { xs: 'none', sm: isOpen ? 'block' : 'none' },
          position: 'fixed',
          top: '80px',
          left: '16px',
          right: '16px',
          zIndex: (theme) => theme.zIndex.drawer,
          background: 'var(--bg-glass-heavy)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid var(--border-light)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        }}
      >
        {horizontalNav}
      </Box>

      {/* Mobile: Temporary drawer (unchanged behavior) */}
      <Drawer
        variant="temporary"
        open={isOpen && isMobile}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid var(--border-light)',
          },
        }}
      >
        <Box sx={{ px: 1, pt: 2 }}>
          <List>
            {filteredNavItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={handleItemClick}
                  sx={{
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    transition: 'all 0.3s ease',
                    '&.active': {
                      background: 'var(--border-light)',
                      color: 'var(--text-primary)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      '& .MuiListItemIcon-root': {
                        color: 'var(--text-primary)',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'var(--text-primary)', minWidth: 40 }}>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;