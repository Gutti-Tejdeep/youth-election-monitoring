import React from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent,
  List, ListItem, ListItemText, Chip, Avatar
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

// Enhanced metric card with visible icon
const MetricCard = ({ title, value, icon: IconComponent, gradient, delay = 0, subtitle }) => (
  <Card
    className={`premium-card slide-in-up stagger-${delay}`}
    sx={{
      minHeight: 160,
      display: 'flex',
      alignItems: 'center',
      background: gradient,
      color: 'var(--text-primary)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      borderRadius: '20px',
    }}
  >
    <CardContent sx={{
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1,
      width: '100%',
      position: 'relative',
      p: 3,
      '&:last-child': { pb: 3 }
    }}>
      <Box>
        <Typography
          sx={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            mb: 0.5
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            lineHeight: 1,
            mb: 0.5,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Icon in a glassy circle — fully visible */}
      <Box sx={{
        background: 'var(--border-light)',
        borderRadius: '50%',
        width: 72,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.35)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        flexShrink: 0,
      }}>
        <IconComponent sx={{ fontSize: 38, color: 'var(--text-primary)' }} />
      </Box>
    </CardContent>
  </Card>
);

// Severity card component
const SeverityCard = ({ severity, count, gradient, icon: IconComp, delay = 0 }) => (
  <Paper
    className={`premium-card scale-in stagger-${delay}`}
    sx={{
      p: 3,
      textAlign: 'center',
      background: gradient,
      color: 'var(--text-primary)',
      borderRadius: '20px',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--text-primary), transparent)',
      },
    }}
  >
    {IconComp && (
      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
        <IconComp sx={{ fontSize: 32, color: 'rgba(255,255,255,0.9)' }} />
      </Box>
    )}
    <Typography variant="h2" sx={{ fontWeight: 'bold', textShadow: '0 4px 16px rgba(0,0,0,0.3)', mb: 0.5 }}>
      {count}
    </Typography>
    <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 600, letterSpacing: '0.5px' }}>
      {severity} Severity
    </Typography>
  </Paper>
);

function Dashboard() {
  const { volunteers, incidents, reports } = useData();
  const { user } = useAuth();

  // Calculate metrics
  const activeVolunteers = volunteers.filter(v => v.status === 'Active').length;
  const openIncidents = incidents.filter(i => i.status === 'Open').length;
  const totalReports = reports.length;
  const resolvedIncidents = incidents.filter(i => i.status === 'Resolved').length;

  // Get recent activity (last 5 items)
  const recentActivity = [
    ...incidents.slice(0, 3).map(inc => ({
      type: 'incident',
      text: `Incident: ${inc.type}`,
      time: inc.reportedOn,
      severity: inc.severity
    })),
    ...volunteers.slice(0, 2).map(vol => ({
      type: 'volunteer',
      text: `New Volunteer: ${vol.name}`,
      time: vol.joinedOn,
      severity: null
    })),
    ...reports.slice(0, 2).map(rep => ({
      type: 'report',
      text: `Report: ${rep.type}`,
      time: rep.generatedOn,
      severity: null
    }))
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 6);

  const activityIcon = (type) => {
    if (type === 'incident') return <WarningAmberIcon sx={{ fontSize: 18, color: '#fa709a' }} />;
    if (type === 'volunteer') return <GroupIcon sx={{ fontSize: 18, color: '#667eea' }} />;
    return <AssignmentIcon sx={{ fontSize: 18, color: '#30cfd0' }} />;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          gutterBottom
          className="slide-in-right"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, var(--text-primary) 0%, rgba(255,255,255,0.9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <HowToVoteIcon sx={{ fontSize: '2.5rem', color: 'var(--text-primary)', WebkitTextFillColor: 'var(--text-primary)' }} />
          {user?.role} Dashboard
        </Typography>
        <Typography
          variant="body1"
          className="slide-in-right stagger-1"
          sx={{
            color: 'var(--text-primary)',
            fontSize: '1.05rem',
            fontWeight: 500,
            mt: 0.5,
            maxWidth: '700px'
          }}
        >
          {user?.role === 'Admin' && "Manage the system parameters, monitor real-time election data streams, and ensure platform security standards."}
          {user?.role === 'Citizen' && "Tracking the election process in real-time, reporting local issues, and engaging in community transparency."}
          {user?.role === 'Election Observer' && "Monitoring field activities, reporting process anomalies, and ensuring fairness and democratic transparency."}
          {user?.role === 'Data Analyst' && "Analyzing election data trends, generating comprehensive reports, and providing real-time analytical updates."}
        </Typography>
      </Box>

      {/* Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Volunteers"
            value={activeVolunteers}
            icon={GroupIcon}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            subtitle={`${volunteers.length} total registered`}
            delay={1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Reports"
            value={totalReports}
            icon={AssignmentIcon}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            subtitle="Generated reports"
            delay={2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Open Incidents"
            value={openIncidents}
            icon={WarningAmberIcon}
            gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            subtitle={`${resolvedIncidents} resolved`}
            delay={3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Incidents"
            value={incidents.length}
            icon={TrendingUpIcon}
            gradient="linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
            subtitle="All time recorded"
            delay={4}
          />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Incidents Overview */}
        <Grid item xs={12} md={8}>
          <Paper
            className="premium-card slide-in-up stagger-2"
            sx={{
              p: 4,
              minHeight: 480,
              background: 'rgba(15,23,42,0.6)',
              borderRadius: '24px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Box sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TrendingUpIcon sx={{ color: 'var(--text-primary)', fontSize: 24 }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Incidents Overview
              </Typography>
            </Box>

            {incidents.length === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 320 }}>
                <CheckCircleIcon sx={{ fontSize: 80, color: '#4caf50', mb: 2, opacity: 0.6 }} />
                <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 600 }}>
                  No incidents reported yet
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  The system is monitoring for any election-related incidents
                </Typography>
              </Box>
            ) : (
              <Box>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={4}>
                    <SeverityCard
                      severity="High"
                      count={incidents.filter(i => i.severity === 'High').length}
                      gradient="linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)"
                      icon={ErrorIcon}
                      delay={1}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <SeverityCard
                      severity="Medium"
                      count={incidents.filter(i => i.severity === 'Medium').length}
                      gradient="linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)"
                      icon={WarningAmberIcon}
                      delay={2}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <SeverityCard
                      severity="Low"
                      count={incidents.filter(i => i.severity === 'Low').length}
                      gradient="linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)"
                      icon={InfoIcon}
                      delay={3}
                    />
                  </Grid>
                </Grid>

                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: '#e2e8f0',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Box sx={{
                      width: 4, height: 22,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '2px'
                    }} />
                    Recent Incidents
                  </Typography>
                  <List dense disablePadding>
                    {incidents.slice(0, 3).map((incident, index) => (
                      <ListItem
                        key={incident.id}
                        className={`scale-in stagger-${index + 1}`}
                        sx={{
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.07) 0%, rgba(118, 75, 162, 0.07) 100%)',
                          borderRadius: '14px',
                          mb: 1.5,
                          p: 2,
                          border: '1px solid rgba(102, 126, 234, 0.12)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Avatar sx={{
                          width: 36, height: 36, mr: 2,
                          background: incident.severity === 'High'
                            ? 'linear-gradient(135deg, #ff6b6b, #ee5a6f)'
                            : incident.severity === 'Medium'
                              ? 'linear-gradient(135deg, #ffa726, #fb8c00)'
                              : 'linear-gradient(135deg, #42a5f5, #1e88e5)',
                        }}>
                          {incident.severity === 'High' ? <ErrorIcon sx={{ fontSize: 18 }} />
                            : incident.severity === 'Medium' ? <WarningAmberIcon sx={{ fontSize: 18 }} />
                              : <InfoIcon sx={{ fontSize: 18 }} />}
                        </Avatar>
                        <ListItemText
                          primary={
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#e2e8f0' }}>
                              {incident.type} — {incident.location}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" sx={{ color: '#666' }}>
                              {incident.reportedOn}
                            </Typography>
                          }
                        />
                        <Chip
                          label={incident.severity}
                          size="small"
                          sx={{
                            background: incident.severity === 'High'
                              ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)'
                              : incident.severity === 'Medium'
                                ? 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)'
                                : 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
                            color: 'var(--text-primary)',
                            fontWeight: 'bold',
                            px: 1,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Paper
            className="premium-card slide-in-up stagger-3"
            sx={{
              p: 4,
              minHeight: 480,
              overflowY: 'auto',
              background: 'rgba(15,23,42,0.6)',
              borderRadius: '24px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Box sx={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '12px',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TrendingUpIcon sx={{ color: 'var(--text-primary)', fontSize: 24 }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Recent Activity
              </Typography>
            </Box>

            {recentActivity.length === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 320 }}>
                <CheckCircleIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 600 }}>
                  No recent activity
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1, textAlign: 'center' }}>
                  Activity will appear here as events occur
                </Typography>
              </Box>
            ) : (
              <List dense disablePadding>
                {recentActivity.map((activity, index) => (
                  <ListItem
                    key={index}
                    className={`slide-in-right stagger-${index + 1}`}
                    sx={{
                      background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.07) 0%, rgba(245, 87, 108, 0.07) 100%)',
                      borderRadius: '12px',
                      mb: 1.5,
                      p: 1.5,
                      border: '1px solid rgba(240, 147, 251, 0.12)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Box sx={{ mr: 1.5 }}>{activityIcon(activity.type)}</Box>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.82rem' }}>
                          {activity.text}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" sx={{ color: '#888' }}>
                          {activity.time}
                        </Typography>
                      }
                    />
                    {activity.severity && (
                      <Chip
                        label={activity.severity}
                        size="small"
                        sx={{
                          background: activity.severity === 'High'
                            ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)'
                            : activity.severity === 'Medium'
                              ? 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)'
                              : 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
                          color: 'var(--text-primary)',
                          fontWeight: 'bold',
                          fontSize: '0.68rem',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        }}
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

export default Dashboard;