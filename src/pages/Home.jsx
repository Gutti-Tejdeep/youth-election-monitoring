import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublicIcon from '@mui/icons-material/Public';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ForumIcon from '@mui/icons-material/Forum';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BarChartIcon from '@mui/icons-material/BarChart';
import PollIcon from '@mui/icons-material/Poll';
import CalculateIcon from '@mui/icons-material/Calculate';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const roleConfigs = {
    'Admin': {
      title: "Admin Control Center",
      description: "Manage the system, monitor election data, and ensure platform security.",
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
      mainIcon: <AdminPanelSettingsIcon sx={{ fontSize: 100, color: 'var(--text-primary)' }} />,
      features: [
        { icon: <GroupIcon sx={{ color: '#60a5fa' }} />, title: "User Management", desc: "Manage roles and permissions for all platform users." },
        { icon: <SecurityIcon sx={{ color: '#f87171' }} />, title: "Platform Security", desc: "Monitor system logs and ensure data integrity." },
        { icon: <DashboardIcon sx={{ color: '#4ade80' }} />, title: "System Overview", desc: "Global monitoring of election platform health." }
      ],
      primaryAction: { label: "System Config", path: "/dashboard" },
      secondaryAction: { label: "Manage Users", path: "/volunteers" }
    },
    'Citizen': {
      title: "Citizen Participation Portal",
      description: "Track election processes, report issues, and engage in civic discussions.",
      gradient: "linear-gradient(135deg, #0f766e 0%, #064e3b 100%)",
      mainIcon: <PublicIcon sx={{ fontSize: 100, color: 'var(--text-primary)' }} />,
      features: [
        { icon: <AssignmentLateIcon sx={{ color: '#fb923c' }} />, title: "Report Issues", desc: "Quickly report incidents seen at polling stations." },
        { icon: <ForumIcon sx={{ color: '#60a5fa' }} />, title: "Civic Discussion", desc: "Engage with other citizens in our secure forums." },
        { icon: <HowToVoteIcon sx={{ color: '#a78bfa' }} />, title: "Process Tracking", desc: "Follow election updates in your local area." }
      ],
      primaryAction: { label: "Report Incident", path: "/incidents" },
      secondaryAction: { label: "Discussions", path: "/interaction" }
    },
    'Election Observer': {
      title: "Election Observation Hub",
      description: "Monitor election activities, report anomalies, conduct polls, and provide insights on fairness.",
      gradient: "linear-gradient(135deg, #7e22ce 0%, #4c1d95 100%)",
      mainIcon: <VisibilityIcon sx={{ fontSize: 100, color: 'var(--text-primary)' }} />,
      features: [
        { icon: <FactCheckIcon sx={{ color: '#fde047' }} />, title: "Anomaly Tracking", desc: "Log and verify irregularities in the voting process." },
        { icon: <PollIcon sx={{ color: '#38bdf8' }} />, title: "Conduct Poll", desc: "Initiate local flash polls to sample voter sentiment." },
        { icon: <AssessmentIcon sx={{ color: '#4ade80' }} />, title: "Observer Insights", desc: "Provide expert commentary on polling activities." }
      ],
      primaryAction: { label: "Begin Monitoring", path: "/dashboard" },
      secondaryAction: { label: "Conduct Poll", path: "/dashboard" }
    },
    'Data Analyst': {
      title: "Analytical Insights Dashboard",
      description: "Analyze election data, calculate trends, generate reports, and provide real-time updates.",
      gradient: "linear-gradient(135deg, #0369a1 0%, #082f49 100%)",
      mainIcon: <AnalyticsIcon sx={{ fontSize: 100, color: 'var(--text-primary)' }} />,
      features: [
        { icon: <CalculateIcon sx={{ color: '#fde047' }} />, title: "Show Analysis", desc: "Calculate predictive data and demographic turnouts." },
        { icon: <BarChartIcon sx={{ color: '#38bdf8' }} />, title: "Data Visualization", desc: "Analyze trends with advanced charting tools." },
        { icon: <AssessmentIcon sx={{ color: '#4ade80' }} />, title: "Report Generation", desc: "Create comprehensive PDF reports for stakeholders." }
      ],
      primaryAction: { label: "Calculate Data", path: "/dashboard" },
      secondaryAction: { label: "View Reports", path: "/reports" }
    }
  };

  const currentConfig = roleConfigs[user?.role] || roleConfigs['Citizen'];

  return (
    <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box sx={{
        minHeight: '75vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decorative Element */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: currentConfig.gradient,
          filter: 'blur(150px)',
          opacity: 0.15,
          zIndex: 0,
          borderRadius: '50%'
        }} />

        <Container maxWidth="md" sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <Box
            sx={{
              mb: 4,
              display: 'inline-flex',
              p: 3,
              borderRadius: '32px',
              background: currentConfig.gradient,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: '1px solid var(--border-light)'
            }}
          >
            {currentConfig.mainIcon}
          </Box>

          <Typography variant="h2" gutterBottom className="slide-in-up" sx={{
            fontWeight: 900,
            mb: 2,
            background: currentConfig.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(0,0,0,0.1)',
            fontFamily: "'Outfit', sans-serif"
          }}>
            {currentConfig.title}
          </Typography>

          <Typography variant="h5" color="textSecondary" className="slide-in-up stagger-1" sx={{ mb: 6, maxWidth: '850px', mx: 'auto', lineHeight: 1.6, fontWeight: 500 }}>
            Welcome back, <strong>{user?.displayName || 'User'}</strong>. <br />
            {currentConfig.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(currentConfig.primaryAction.path)}
              startIcon={<DashboardIcon />}
              className="slide-in-up stagger-2"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                background: currentConfig.gradient,
                boxShadow: 'var(--shadow-lg)',
                textTransform: 'none',
              }}
            >
              {currentConfig.primaryAction.label}
            </Button>

            {currentConfig.secondaryAction && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(currentConfig.secondaryAction.path)}
                className="slide-in-up stagger-2"
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-light)',
                  background: 'var(--bg-glass-light)',
                  backdropFilter: 'blur(10px)',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'var(--bg-glass)',
                    borderColor: 'var(--text-disabled)',
                  }
                }}
              >
                {currentConfig.secondaryAction.label}
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {currentConfig.features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                className={`premium-card slide-in-up stagger-${index + 3}`}
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  background: 'rgba(15,23,42,0.85)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: '24px',
                  border: '1px solid var(--bg-glass-heavy)',
                  transition: 'all 0.4s ease',
                }}
              >
                <Box sx={{
                  mb: 3,
                  p: 2.5,
                  borderRadius: '20px',
                  background: 'rgba(0,0,0,0.03)',
                  '& svg': { fontSize: 48 }
                }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 800, letterSpacing: '0.5px' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.7 }}>
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;