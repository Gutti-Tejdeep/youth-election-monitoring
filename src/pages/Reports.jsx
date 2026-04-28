import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DeleteIcon from '@mui/icons-material/Delete';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

function Reports() {
  const { reports, addReport, deleteReport, incidents } = useData();
  const { user } = useAuth();
  const isAdmin = (user?.role || '').toLowerCase() === 'admin';
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [reportType, setReportType] = useState('Summary');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleGenerateReport = async () => {
    if (!dateStart || !dateEnd) {
      alert('Please select both start and end dates');
      return;
    }

    // Filter incidents based on date range
    const start = new Date(dateStart);
    start.setHours(0, 0, 0, 0);
    const end = new Date(dateEnd);
    end.setHours(23, 59, 59, 999);

    const filteredIncidents = incidents.filter(incident => {
      const incidentDate = new Date(incident.reportedOn);
      return incidentDate >= start && incidentDate <= end;
    });

    // Calculate metrics
    const stats = {
      total: filteredIncidents.length,
      highSeverity: filteredIncidents.filter(i => i.severity === 'High').length,
      mediumSeverity: filteredIncidents.filter(i => i.severity === 'Medium').length,
      lowSeverity: filteredIncidents.filter(i => i.severity === 'Low').length,
      resolved: filteredIncidents.filter(i => i.status === 'Resolved').length,
      open: filteredIncidents.filter(i => i.status === 'Open').length
    };

    // Create a new report
    const newReport = {
      type: reportType,
      dateRange: `${dateStart} to ${dateEnd}`,
      generatedOn: new Date().toLocaleString(),
      status: 'Generated',
      data: filteredIncidents,
      stats: stats
    };

    try {
      const savedReport = await addReport(newReport);
      setSelectedReport(savedReport || newReport);
      setViewDialogOpen(true);
      alert('Report generated successfully! Previewing summary...');
    } catch (err) {
      alert(err.message || 'Failed to generate report');
    }
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedReport(null);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return '#ff4d4d';
      case 'Medium': return '#ffa500';
      case 'Low': return '#4da6ff';
      default: return '#888';
    }
  };

  return (
    <Box>
      <Box className="slide-in-right" sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          Election reports
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'var(--text-primary)',
            mt: 1,
            ml: 7,
            fontWeight: 500,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          Generate comprehensive reports and analytics
        </Typography>
      </Box>

      <Paper
        className="premium-card slide-in-up stagger-1"
        sx={{
          p: 4,
          mb: 4,
          background: 'rgba(15,23,42,0.6)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Report Generation & Filters
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="center">
          {/* Filter Inputs */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date Range Start"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  background: 'rgba(102, 126, 234, 0.05)',
                  '&.Mui-focused': {
                    background: 'rgba(102, 126, 234, 0.1)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-600)',
                    borderWidth: '2px',
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date Range End"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  background: 'rgba(102, 126, 234, 0.05)',
                  '&.Mui-focused': {
                    background: 'rgba(102, 126, 234, 0.1)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-600)',
                    borderWidth: '2px',
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Report Type"
              select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              SelectProps={{ native: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  background: 'rgba(102, 126, 234, 0.05)',
                  '&.Mui-focused': {
                    background: 'rgba(102, 126, 234, 0.1)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-600)',
                    borderWidth: '2px',
                  }
                }
              }}
            >
              <option value="Summary">Summary</option>
              <option value="Detailed">Detailed Incidents</option>
              <option value="VolunteerActivity">Volunteer Activity</option>
            </TextField>
          </Grid>

          {/* Action Button */}
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleGenerateReport}
              fullWidth
              sx={{
                height: '56px',
                background: 'var(--gradient-primary)',
                color: 'var(--text-primary)',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-light)',
                transition: 'all 0.3s ease',
              }}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Reports List */}
      <Paper
        className="premium-card slide-in-up stagger-2"
        sx={{
          p: 4,
          background: 'rgba(15,23,42,0.6)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            History of Generated Reports
          </Typography>
        </Box>

        {reports.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <AssessmentIcon sx={{ fontSize: 100, color: 'var(--neutral-300)', mb: 3, opacity: 0.5 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              No reports available
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Generate a report using the filters above
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{
                    background: 'var(--primary-50)',
                  }}>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Report ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Date Range</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Generated On</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Entries</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report, index) => (
                    <TableRow
                      key={report.id}
                      className={`scale-in stagger-${Math.min(index + 1, 5)}`}
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:nth-of-type(odd)': {
                          background: 'rgba(59, 130, 246, 0.03)',
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: 'var(--secondary-600)' }}>{report.id}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{report.type}</TableCell>
                      <TableCell>{report.dateRange}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {report.generatedOn}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={report.data?.length || 0}
                          size="small"
                          sx={{ fontWeight: 'bold', background: 'var(--primary-100)', color: 'var(--primary-700)' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleViewReport(report)}
                          sx={{
                            borderRadius: '10px',
                            borderColor: 'var(--primary-500)',
                            color: 'var(--primary-600)',
                            fontWeight: 600,
                            textTransform: 'none',
                            px: 2,
                          }}
                        >
                          View Details
                        </Button>
                        {isAdmin && (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<DeleteIcon />}
                              onClick={() => deleteReport(report.id)}
                              sx={{
                                borderRadius: '10px',
                                borderColor: 'var(--error-500)',
                                color: '#ef4444',
                                fontWeight: 600,
                                textTransform: 'none',
                                px: 2,
                                ml: 1
                              }}
                            >
                              Delete
                            </Button>
                        )}
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
                  background: 'var(--primary-50)',
                  display: 'inline-block',
                  px: 3,
                  py: 1,
                  borderRadius: '20px',
                }}
              >
                Total reports: {reports.length}
              </Typography>
            </Box>
          </>
        )}
      </Paper>

      {/* View Report Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            background: 'var(--text-primary)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{
          p: 3,
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h5" sx={{ fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Report Summary: {selectedReport?.id}
          </Typography>
          <Chip label={selectedReport?.type} color="primary" sx={{ fontWeight: 'bold' }} />
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {selectedReport && (
            <Box>
              {/* Header Info */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2, borderRadius: '16px', background: 'rgba(102, 126, 234, 0.05)', border: '1px solid rgba(102, 126, 234, 0.1)' }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Date Range</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>{selectedReport.dateRange}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2, borderRadius: '16px', background: 'rgba(48, 207, 208, 0.05)', border: '1px solid rgba(48, 207, 208, 0.1)' }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Generated On</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>{selectedReport.generatedOn}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2, borderRadius: '16px', background: 'rgba(255, 107, 107, 0.05)', border: '1px solid rgba(255, 107, 107, 0.1)' }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Total Records</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>{selectedReport.data?.length || 0} Incidents</Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Stats Summary */}
              {selectedReport.stats && (
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {[
                    { label: 'High Severity', value: selectedReport.stats.highSeverity, color: '#f87171' },
                    { label: 'Medium Severity', value: selectedReport.stats.mediumSeverity, color: '#fbbf24' },
                    { label: 'Low Severity', value: selectedReport.stats.lowSeverity, color: '#60a5fa' },
                    { label: 'Resolved', value: selectedReport.stats.resolved, color: '#34d399' },
                    { label: 'Open', value: selectedReport.stats.open, color: '#fca5a5' }
                  ].map((stat, idx) => (
                    <Grid item xs={6} sm={4} md={2.4} key={idx}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: '16px', border: `1px solid ${stat.color}44`, background: `${stat.color}08` }}>
                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>{stat.label}</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: stat.color }}>{stat.value}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Data Table */}
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AssessmentIcon color="primary" /> Detailed Incident Logs
              </Typography>

              <TableContainer sx={{
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.05)',
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', background: '#f8fafc' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', background: '#f8fafc' }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', background: '#f8fafc' }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', background: '#f8fafc' }}>Severity</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', background: '#f8fafc' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', background: '#f8fafc' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedReport.data && selectedReport.data.length > 0 ? (
                      selectedReport.data.map((item) => (
                        <TableRow key={item.id} hover>
                          <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>{item.id}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{item.type}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>
                            <Box sx={{
                              display: 'inline-block',
                              px: 1,
                              py: 0.5,
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              color: 'var(--text-primary)',
                              background: getSeverityColor(item.severity)
                            }}>
                              {item.severity}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={item.status} size="small" variant="outlined" sx={{ fontSize: '0.7rem', fontWeight: 700 }} />
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{item.reportedOn}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Typography color="textSecondary">No incidents found for this period.</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1,
              fontWeight: 700,
              textTransform: 'none',
              background: 'var(--gradient-primary)',
            }}
          >
            Close Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Reports;
