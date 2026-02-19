import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box sx={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 60%)'
      }}>
        <Container maxWidth="md">
          <Box className="scale-in" sx={{ mb: 4, display: 'inline-flex', p: 2, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}>
            <HowToVoteIcon sx={{ fontSize: 64, color: '#fff' }} />
          </Box>

          <Typography variant="h2" gutterBottom className="slide-in-up" sx={{
            fontWeight: 800,
            mb: 2,
            display: 'inline-block', // Ensures gradient applies to text bounds, not full width
            background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            Youth Election Monitoring System
          </Typography>

          <Typography variant="h5" color="textSecondary" className="slide-in-up stagger-1" sx={{ mb: 6, maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
            Empowering transparent elections through real-time monitoring, incident tracking, and volunteer coordination. Join us in ensuring fair and secure democratic processes.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/dashboard')}
            startIcon={<DashboardIcon />}
            className="slide-in-up stagger-2 hover-lift"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.5)',
              }
            }}
          >
            Go to Dashboard
          </Button>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {[
            {
              icon: <SecurityIcon sx={{ fontSize: 40, color: '#4facfe' }} />,
              title: "Secure Monitoring",
              desc: "Real-time incident tracking with severity levels and secure reporting mechanisms."
            },
            {
              icon: <GroupIcon sx={{ fontSize: 40, color: '#43e97b' }} />,
              title: "Volunteer Network",
              desc: "Coordinate volunteers effectively across different polling stations and districts."
            },
            {
              icon: <AssessmentIcon sx={{ fontSize: 40, color: '#fa709a' }} />,
              title: "Data Analytics",
              desc: "Generate comprehensive reports and visualize election data trends instantly."
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                className={`premium-card slide-in-up stagger-${index + 3}`}
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ mb: 2, p: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
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