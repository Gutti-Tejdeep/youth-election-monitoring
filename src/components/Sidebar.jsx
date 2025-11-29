import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import WarningIcon from '@mui/icons-material/Warning';

// Define the width of the drawer
const drawerWidth = 240;

// Array of navigation items
const navItems = [
  { text: 'Home', icon: HomeIcon, path: '/' },
  { text: 'Reports', icon: AssignmentIcon, path: '/reports' },
  { text: 'Volunteers', icon: GroupIcon, path: '/volunteers' },
  { text: 'Incidents', icon: WarningIcon, path: '/incidents' },
];

function Sidebar({ isOpen, handleDrawerToggle }) {
  
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
              onClick={handleDrawerToggle}
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
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
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