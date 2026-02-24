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

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const roleConfigs = {
    'Admin': {
      title: "Admin Control Center",
      description: "Manage the system, monitor election data, and ensure platform security.",
      gradient: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
      mainIcon: <AdminPanelSettingsIcon sx={{ fontSize: 100, color: '#fff' }} />,
      features: [
        { icon: <GroupIcon sx={{ color: '#4facfe' }} />, title: "User Management", desc: "Manage roles and permissions for all platform users." },
        { icon: <SecurityIcon sx={{ color: '#ff6b6b' }} />, title: "Platform Security", desc: "Monitor system logs and ensure data integrity." },
        { icon: <DashboardIcon sx={{ color: '#43e97b' }} />, title: "System Overview", desc: "Global monitoring of election platform health." }
      ],
      primaryAction: { label: "System Config", path: "/dashboard" }
    },
    'Citizen': {
      title: "Citizen Participation Portal",
      description: "Track election processes, report issues, and engage in civic discussions.",
      gradient: "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)",
      mainIcon: <PublicIcon sx={{ fontSize: 100, color: '#fff' }} />,
      features: [
        { icon: <AssignmentLateIcon sx={{ color: '#fa709a' }} />, title: "Report Issues", desc: "Quickly report incidents seen at polling stations." },
        { icon: <ForumIcon sx={{ color: '#4facfe' }} />, title: "Civic Discussion", desc: "Engage with other citizens in our secure forums." },
        { icon: <HowToVoteIcon sx={{ color: '#43e97b' }} />, title: "Process Tracking", desc: "Follow election updates in your local area." }
      ],
      primaryAction: { label: "Report Incident", path: "/incidents" }
    },
    'Election Observer': {
      title: "Election Observation Hub",
      description: "Monitor election activities, report anomalies, and provide insights on fairness and transparency.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      mainIcon: <VisibilityIcon sx={{ fontSize: 100, color: '#fff' }} />,
      features: [
        { icon: <FactCheckIcon sx={{ color: '#fddb92' }} />, title: "Anomaly Tracking", desc: "Log and verify irregularities in the voting process." },
        { icon: <VisibilityIcon sx={{ color: '#4facfe' }} />, title: "Transparency Audit", desc: "Review real-time data for fairness indicators." },
        { icon: <AssessmentIcon sx={{ color: '#43e97b' }} />, title: "Observer Insights", desc: "Provide expert commentary on polling activities." }
      ],
      primaryAction: { label: "Begin Monitoring", path: "/dashboard" }
    },
    'Data Analyst': {
      title: "Analytical Insights Dashboard",
      description: "Analyze election data, generate reports, and provide real-time updates.",
      gradient: "linear-gradient(135deg, #21d4fd 0%, #b721ff 100%)",
      mainIcon: <AnalyticsIcon sx={{ fontSize: 100, color: '#fff' }} />,
      features: [
        { icon: <BarChartIcon sx={{ color: '#fddb92' }} />, title: "Data Visualization", desc: "Analyze trends with advanced charting tools." },
        { icon: <AssessmentIcon sx={{ color: '#43e97b' }} />, title: "Report Generation", desc: "Create comprehensive PDF reports for stakeholders." },
        { icon: <AnalyticsIcon sx={{ color: '#4facfe' }} />, title: "Real-time Updates", desc: "Monitor incoming data feeds for instant analysis." }
      ],
      primaryAction: { label: "View Analytics", path: "/reports" }
    }
  };

  const currentConfig = roleConfigs[user?.role] || roleConfigs['Citizen'];

  return (
    <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box sx={{
        minHeight: '75vh',
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

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            className="floating"
            sx={{
              mb: 4,
              display: 'inline-flex',
              p: 3,
              borderRadius: '32px',
              background: currentConfig.gradient,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.2)'
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

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(currentConfig.primaryAction.path)}
            startIcon={<DashboardIcon />}
            className="slide-in-up stagger-2 hover-lift"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              background: currentConfig.gradient,
              boxShadow: 'var(--shadow-lg)',
              textTransform: 'none',
              '&:hover': {
                transform: 'translateY(-5px) scale(1.05)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }
            }}
          >
            {currentConfig.primaryAction.label}
          </Button>
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
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    background: '#fff',
                    transform: 'translateY(-10px)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.12)'
                  }
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