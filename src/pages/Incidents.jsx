import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WarningIcon from '@mui/icons-material/Warning';
import { useData } from '../context/DataContext';

function Incidents() {
  const { incidents, addIncident } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    reporterName: '',
    reporterContact: ''
  });

  const incidentTypes = [
    'Voter Intimidation',
    'Equipment Failure',
    'Ballot Tampering',
    'Long Queue/Delay',
    'Violence',
    'Bribery',
    'Other'
  ];

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({
      type: '',
      location: '',
      description: '',
      reporterName: '',
      reporterContact: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.type || !formData.location || !formData.description || !formData.reporterName) {
      alert('Please fill in all required fields');
      return;
    }

    const newIncident = {
      id: `INC-${Date.now()}`,
      type: formData.type,
      location: formData.location,
      description: formData.description,
      reporterName: formData.reporterName,
      reporterContact: formData.reporterContact,
      status: 'Open',
      reportedOn: new Date().toLocaleString(),
      severity: getSeverity(formData.type)
    };

    addIncident(newIncident);
    handleCloseDialog();
    alert('Incident reported successfully!');
  };

  const getSeverity = (type) => {
    const highSeverity = ['Voter Intimidation', 'Violence', 'Ballot Tampering'];
    const mediumSeverity = ['Bribery', 'Equipment Failure'];

    if (highSeverity.includes(type)) return 'High';
    if (mediumSeverity.includes(type)) return 'Medium';
    return 'Low';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'error';
      case 'Under Review': return 'warning';
      case 'Resolved': return 'success';
      default: return 'default';
    }
  };

  const getSeverityGradient = (severity) => {
    switch (severity) {
      case 'High': return 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)';
      case 'Medium': return 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)';
      case 'Low': return 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)';
      default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box className="slide-in-right">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 20px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <span style={{ fontSize: '2.5rem' }}>⚠️</span>
            Incident Tracker
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.85)',
              mt: 1,
              ml: 7,
              fontWeight: 500,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            Monitor and manage election incidents in real-time
          </Typography>
        </Box>
        <Button
          variant="contained"
          className="scale-in stagger-1"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
            color: '#fff',
            px: 4,
            py: 1.5,
            borderRadius: '16px',
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: '0 8px 24px rgba(255, 107, 107, 0.4)',
            border: '1px solid rgba(255,255,255,0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          Report Incident
        </Button>
      </Box>

      <Paper
        className="premium-card slide-in-up stagger-2"
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
        }}
      >
        {incidents.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <WarningIcon sx={{ fontSize: 100, color: 'var(--neutral-300)', mb: 3, opacity: 0.5 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              No incidents reported
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Click "Report Incident" to file a new incident report
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  }}>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Incident ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Reporter</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Severity</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Reported On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incidents.map((incident, index) => (
                    <TableRow
                      key={incident.id}
                      className={`scale-in stagger-${Math.min(index + 1, 5)}`}
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:nth-of-type(odd)': {
                          background: 'rgba(102, 126, 234, 0.03)',
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: 'var(--primary-600)' }}>{incident.id}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{incident.type}</TableCell>
                      <TableCell>{incident.location}</TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        {incident.description.length > 50
                          ? `${incident.description.substring(0, 50)}...`
                          : incident.description}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {incident.reporterName}
                        </Typography>
                        {incident.reporterContact && (
                          <Typography variant="caption" display="block" color="textSecondary">
                            {incident.reporterContact}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={incident.severity}
                          size="small"
                          className="pulse"
                          sx={{
                            background: getSeverityGradient(incident.severity),
                            color: '#fff',
                            fontWeight: 'bold',
                            px: 1.5,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            border: '1px solid rgba(255,255,255,0.3)',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={incident.status}
                          color={getStatusColor(incident.status)}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {incident.reportedOn}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  display: 'inline-block',
                  px: 3,
                  py: 1,
                  borderRadius: '20px',
                }}
              >
                Total incidents: {incidents.length}
              </Typography>
            </Box>
          </>
        )}
      </Paper>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
          }
        }}
        BackdropProps={{
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }
        }}
      >
        <DialogTitle sx={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          pb: 1
        }}>
          Report New Incident
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Incident Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--primary-600)',
                      borderWidth: '2px',
                    }
                  }
                }}
              >
                {incidentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Polling Station A-12, District 5"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--primary-600)',
                      borderWidth: '2px',
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                placeholder="Provide detailed description of the incident..."
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--primary-600)',
                      borderWidth: '2px',
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Reporter Name"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleInputChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--primary-600)',
                      borderWidth: '2px',
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number (Optional)"
                name="reporterContact"
                value={formData.reporterContact}
                onChange={handleInputChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--primary-600)',
                      borderWidth: '2px',
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              color: 'var(--text-secondary)',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
              borderRadius: '12px',
              px: 4,
              py: 1,
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 4px 16px rgba(255, 107, 107, 0.3)',
            }}
          >
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Incidents;