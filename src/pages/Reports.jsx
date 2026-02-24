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
import { useData } from '../context/DataContext';

function Reports() {
  const { reports, addReport } = useData();
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [reportType, setReportType] = useState('Summary');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleGenerateReport = () => {
    if (!dateStart || !dateEnd) {
      alert('Please select both start and end dates');
      return;
    }

    // Create a new report
    const newReport = {
      id: `RPT-${Date.now()}`,
      type: reportType,
      dateRange: `${dateStart} to ${dateEnd}`,
      generatedOn: new Date().toLocaleString(),
      status: 'Generated'
    };

    addReport(newReport);
    alert('Report generated successfully!');
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedReport(null);
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
            color: 'rgba(255,255,255,0.85)',
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
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
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
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.08)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-500)',
                  },
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
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.08)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-500)',
                  },
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
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.08)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-500)',
                  },
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
                color: '#fff',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'var(--gradient-ocean)',
                  transform: 'translateY(-4px)',
                  boxShadow: 'var(--shadow-xl)',
                }
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
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
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
            Generated Reports
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
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Status</TableCell>
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
                        '&:hover': {
                          background: 'rgba(59, 130, 246, 0.08)',
                          transform: 'scale(1.01)',
                          boxShadow: 'var(--shadow-md)',
                        }
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
                          label={report.status}
                          size="small"
                          sx={{
                            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                            color: '#fff',
                            fontWeight: 'bold',
                            px: 1.5,
                            boxShadow: '0 4px 12px rgba(67, 233, 123, 0.3)',
                            border: '1px solid rgba(255,255,255,0.3)',
                          }}
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
                            '&:hover': {
                              borderColor: 'var(--primary-600)',
                              background: 'rgba(102, 126, 234, 0.08)',
                              transform: 'translateY(-2px)',
                            }
                          }}
                        >
                          View Report
                        </Button>
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
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          pb: 1
        }}>
          Report Details - {selectedReport?.id}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedReport && (
            <Box sx={{ py: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                {selectedReport.type} Report
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{
                    p: 2,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                    borderRadius: '12px',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                      Date Range
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {selectedReport.dateRange}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{
                    p: 2,
                    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.08) 0%, rgba(245, 87, 108, 0.08) 100%)',
                    borderRadius: '12px',
                    border: '1px solid rgba(240, 147, 251, 0.2)'
                  }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                      Generated On
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {selectedReport.generatedOn}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{
                mt: 4,
                p: 3,
                background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.08) 0%, rgba(56, 249, 215, 0.08) 100%)',
                borderRadius: '16px',
                border: '1px solid rgba(67, 233, 123, 0.2)'
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  Report Content Preview
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  This report includes comprehensive analysis of:
                </Typography>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  <li>Summary statistics and key metrics</li>
                  <li>Interactive charts and data visualizations</li>
                  <li>Detailed incident listings with severity breakdown</li>
                  <li>Volunteer activity logs and performance metrics</li>
                  <li>Polling station coverage and geographic distribution</li>
                </ul>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              background: 'var(--gradient-primary)',
              color: '#fff',
              boxShadow: 'var(--shadow-md)',
              '&:hover': {
                background: 'var(--gradient-ocean)',
                boxShadow: 'var(--shadow-lg)',
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Reports;