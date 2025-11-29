import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningIcon from '@mui/icons-material/Warning';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// A simple reusable card component for key metrics
const MetricCard = ({ title, value, icon: IconComponent, color }) => (
  <Card sx={{
    minHeight: 120,
    display: 'flex',
    alignItems: 'center',
    boxShadow: 3
  }}>
    <CardContent sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      </Box>
      <IconComponent sx={{ fontSize: 48, color: color, opacity: 0.6 }} />
    </CardContent>
  </Card>
);


function Home() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Election Monitoring Dashboard
      </Typography>

      {/* Grid for Key Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Volunteers"
            value="0"
            icon={GroupIcon}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Reports Filed"
            value="0"
            icon={AssignmentIcon}
            color="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Open Incidents"
            value="0"
            icon={WarningIcon}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Polling Stations Covered"
            value="0%"
            icon={EventAvailableIcon}
            color="#4caf50"
          />
        </Grid>
      </Grid>

      {/* Placeholder for Data Visualization / Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              No data available yet
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              No recent activity
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;