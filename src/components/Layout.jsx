import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} handleDrawerToggle={toggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: isSidebarOpen ? '140px' : '80px',
          height: isSidebarOpen ? 'calc(100vh - 140px)' : 'calc(100vh - 80px)',
          overflowY: 'auto',
          transition: 'margin-top 0.3s ease, height 0.3s ease',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;