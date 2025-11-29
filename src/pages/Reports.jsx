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

function Reports() {
  const [reports, setReports] = useState([]);
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

    setReports([newReport, ...reports]);
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
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Election Monitoring Reports
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Report Generation & Filters
        </Typography>

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
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleGenerateReport}
              fullWidth
              sx={{ height: '56px' }}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Reports List */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Generated Reports
        </Typography>

        {reports.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom color="textSecondary">
              No reports available
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Generate a report using the filters above
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Report ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date Range</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Generated On</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.dateRange}</TableCell>
                    <TableCell>{report.generatedOn}</TableCell>
                    <TableCell>
                      <Chip label={report.status} color="success" size="small" />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewReport(report)}
                      >
                        View Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* View Report Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Report Details - {selectedReport?.id}
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box sx={{ py: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedReport.type} Report
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Date Range:</strong> {selectedReport.dateRange}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Generated On:</strong> {selectedReport.generatedOn}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Status:</strong> {selectedReport.status}
              </Typography>

              <Box sx={{ mt: 3, p: 3, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Report content would be displayed here. This could include:
                </Typography>
                <ul>
                  <li>Summary statistics</li>
                  <li>Charts and graphs</li>
                  <li>Detailed incident listings</li>
                  <li>Volunteer activity logs</li>
                  <li>Polling station coverage data</li>
                </ul>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Reports;