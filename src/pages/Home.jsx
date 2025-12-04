import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, List, ListItem, ListItemText, Chip } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningIcon from '@mui/icons-material/Warning';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useData } from '../context/DataContext';

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
  const { volunteers, incidents, reports } = useData();

  // Calculate metrics
  const activeVolunteers = volunteers.filter(v => v.status === 'Active').length;
  const openIncidents = incidents.filter(i => i.status === 'Open').length;
  const totalReports = reports.length;

  // Get recent activity (last 5 items)
  const recentActivity = [
    ...incidents.slice(0, 3).map(inc => ({
      type: 'incident',
      text: `Incident reported: ${inc.type}`,
      time: inc.reportedOn,
      severity: inc.severity
    })),
    ...volunteers.slice(0, 2).map(vol => ({
      type: 'volunteer',
      text: `New volunteer: ${vol.name}`,
      time: vol.joinedOn,
      severity: null
    })),
    ...reports.slice(0, 2).map(rep => ({
      type: 'report',
      text: `Report generated: ${rep.type}`,
      time: rep.generatedOn,
      severity: null
    }))
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

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
            value={activeVolunteers}
            icon={GroupIcon}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Reports Filed"
            value={totalReports}
            icon={AssignmentIcon}
            color="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Open Incidents"
            value={openIncidents}
            icon={WarningIcon}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Incidents"
            value={incidents.length}
            icon={EventAvailableIcon}
            color="#4caf50"
          />
        </Grid>
      </Grid>

      {/* Data Visualization / Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Incidents Overview
            </Typography>
            {incidents.length === 0 ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
                <Typography variant="body1" color="textSecondary">
                  No incidents reported yet
                </Typography>
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                      <Typography variant="h4" color="error">
                        {incidents.filter(i => i.severity === 'High').length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        High Severity
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
                      <Typography variant="h4" color="warning.main">
                        {incidents.filter(i => i.severity === 'Medium').length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Medium Severity
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                      <Typography variant="h4" color="info.main">
                        {incidents.filter(i => i.severity === 'Low').length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Low Severity
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Recent Incidents
                  </Typography>
                  <List dense>
                    {incidents.slice(0, 3).map((incident) => (
                      <ListItem key={incident.id}>
                        <ListItemText
                          primary={`${incident.type} - ${incident.location}`}
                          secondary={incident.reportedOn}
                        />
                        <Chip
                          label={incident.severity}
                          size="small"
                          color={
                            incident.severity === 'High' ? 'error' :
                              incident.severity === 'Medium' ? 'warning' : 'info'
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400, overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {recentActivity.length === 0 ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
                <Typography variant="body1" color="textSecondary">
                  No recent activity
                </Typography>
              </Box>
            ) : (
              <List dense>
                {recentActivity.map((activity, index) => (
                  <ListItem key={index} sx={{ borderBottom: '1px solid #f0f0f0' }}>
                    <ListItemText
                      primary={activity.text}
                      secondary={activity.time}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    {activity.severity && (
                      <Chip
                        label={activity.severity}
                        size="small"
                        color={
                          activity.severity === 'High' ? 'error' :
                            activity.severity === 'Medium' ? 'warning' : 'info'
                        }
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;