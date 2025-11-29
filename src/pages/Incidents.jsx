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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Incident Tracker
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Report Incident
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        {incidents.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <WarningIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom color="textSecondary">
              No incidents reported
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Click "Report Incident" to file a new incident report
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Incident ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Reporter</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Severity</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Reported On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id} hover>
                      <TableCell>{incident.id}</TableCell>
                      <TableCell>{incident.type}</TableCell>
                      <TableCell>{incident.location}</TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        {incident.description.length > 50
                          ? `${incident.description.substring(0, 50)}...`
                          : incident.description}
                      </TableCell>
                      <TableCell>
                        {incident.reporterName}
                        {incident.reporterContact && (
                          <Typography variant="caption" display="block" color="textSecondary">
                            {incident.reporterContact}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={incident.severity}
                          color={getSeverityColor(incident.severity)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={incident.status}
                          color={getStatusColor(incident.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{incident.reportedOn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="textSecondary">
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
      >
        <DialogTitle>Report New Incident</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Incident Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number (Optional)"
                name="reporterContact"
                value={formData.reporterContact}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="error">
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Incidents;