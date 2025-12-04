import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import WarningIcon from '@mui/icons-material/Warning';
import ForumIcon from '@mui/icons-material/Forum';

// Define the width of the drawer
const drawerWidth = 240;

// Array of navigation items
const navItems = [
  { text: 'Home', icon: HomeIcon, path: '/' },
  { text: 'Reports', icon: AssignmentIcon, path: '/reports' },
  { text: 'Interaction', icon: ForumIcon, path: '/interaction' },
  { text: 'Volunteers', icon: GroupIcon, path: '/volunteers' },
  { text: 'Incidents', icon: WarningIcon, path: '/incidents' },
];

function Sidebar({ isOpen, handleDrawerToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleItemClick = () => {
    // Only close the sidebar on mobile when an item is clicked
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const drawerContent = (
    <div>
      <Toolbar>
        {/* App Title inside the Sidebar Header */}
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          YEM Monitor
        </Typography>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            {/* NavLink is used to handle routing and active state */}
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={handleItemClick}
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)', // Light blue for active link
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;