import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box,
  TextField, Chip, Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Election date state — default to today
  const today = new Date().toISOString().split('T')[0];
  const [electionDate, setElectionDate] = useState(today);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onLogoutClick = () => {
    logout();
    navigate('/login');
  };

  // Format date nicely for display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Select Date';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Determine election status label
  const getElectionStatus = () => {
    const selected = new Date(electionDate + 'T00:00:00');
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (selected.getTime() === now.getTime()) return { label: '🟢 Election Day', color: '#4caf50' };
    if (selected > now) return { label: '🔵 Upcoming', color: '#2196f3' };
    return { label: '🟠 Past Election', color: '#ff9800' };
  };

  const status = getElectionStatus();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        color: '#fff',
        width: 'calc(100% - 32px)',
        left: '16px',
        top: '16px',
        borderRadius: '24px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Toolbar sx={{ minHeight: '70px !important', px: 3, gap: 1.5 }}>
        {/* Sidebar Toggle */}
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          onClick={toggleSidebar}
          edge="start"
          sx={{
            mr: 1,
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
          <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
            <Logo size={48} color1="#ffffff" color2="rgba(255,255,255,0.7)" />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              fontWeight: 800,
              letterSpacing: '1px',
              fontFamily: "'Outfit', sans-serif",
              background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            YEM Dashboard
          </Typography>
        </Box>

        {/* Election Status Chip */}
        <Chip
          icon={<HowToVoteIcon sx={{ color: '#fff !important', fontSize: '1rem' }} />}
          label={status.label}
          size="small"
          sx={{
            background: `${status.color}33`,
            border: `1px solid ${status.color}88`,
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.78rem',
            px: 0.5,
            display: { xs: 'none', md: 'flex' },
          }}
        />

        {/* Date Picker Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {showDatePicker ? (
            <TextField
              type="date"
              size="small"
              value={electionDate}
              onChange={(e) => {
                setElectionDate(e.target.value);
                setShowDatePicker(false);
              }}
              onBlur={() => setShowDatePicker(false)}
              autoFocus
              inputProps={{ style: { color: '#fff', fontSize: '0.85rem' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#fff' },
                },
                '& input[type="date"]::-webkit-calendar-picker-indicator': {
                  filter: 'invert(1)',
                  cursor: 'pointer',
                },
              }}
            />
          ) : (
            <Tooltip title="Set Election Date" arrow>
              <Button
                startIcon={<CalendarTodayIcon sx={{ fontSize: '1rem' }} />}
                onClick={() => setShowDatePicker(true)}
                size="small"
                sx={{
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  textTransform: 'none',
                  px: 2,
                  py: 0.8,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                }}
              >
                📅 {formatDate(electionDate)}
              </Button>
            </Tooltip>
          )}
        </Box>

        {/* User Role Display */}
        {user && (
          <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
            <Chip
              label={user.role}
              size="small"
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                px: 1
              }}
            />
          </Box>
        )}

        {/* Logout */}
        <Button
          color="inherit"
          onClick={onLogoutClick}
          startIcon={<LogoutIcon />}
          sx={{
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.9) 0%, rgba(238, 90, 111, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.4)',
            px: 2.5,
            py: 1,
            fontWeight: 'bold',
            fontSize: '0.9rem',
            textTransform: 'none',
            boxShadow: '0 4px 16px rgba(255, 107, 107, 0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;