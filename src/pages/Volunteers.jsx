import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { updateUserAPI, getAllUsersAPI } from '../services/api';

function Volunteers() {
  const { volunteers, addVolunteer, updateVolunteer, deleteVolunteer } = useData();
  const { user } = useAuth();
  const isAdmin = (user?.role || '').toLowerCase() === 'admin';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    workingArea: ''
  });

  const handleAddVolunteer = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      workingArea: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.workingArea) {
      alert('Please fill in all fields');
      return;
    }

    const newVolunteer = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      workingArea: formData.workingArea,
      status: 'Active',
      joinedOn: new Date().toLocaleDateString()
    };

    try {
      await addVolunteer(newVolunteer);
      handleCloseDialog();
      alert('Volunteer added successfully!');
    } catch (err) {
      alert(err.message || 'Failed to add volunteer');
    }
  };

  const handleApprove = async (volunteer) => {
      try {
          await updateVolunteer(volunteer.id, { status: 'Active' });
          const res = await getAllUsersAPI();
          const targetUser = res.data.find(u => u.email === volunteer.email);
          if (targetUser) {
              await updateUserAPI(targetUser.id, { role: 'Volunteer' });
          }
          alert("Volunteer approved!");
      } catch (e) {
          alert("Failed to approve volunteer");
      }
  };

  const handleRevoke = async (volunteer) => {
      if (!window.confirm("Are you sure you want to remove this volunteer?")) return;
      try {
          await deleteVolunteer(volunteer.id);
          const res = await getAllUsersAPI();
          const targetUser = res.data.find(u => u.email === volunteer.email);
          if (targetUser) {
              await updateUserAPI(targetUser.id, { role: 'Citizen' });
          }
          alert("Volunteer revoked & removed!");
      } catch (e) {
          alert("Failed to revoke volunteer");
      }
  };

  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (volunteer.email && volunteer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    volunteer.workingArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box className="slide-in-right" sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, var(--text-primary) 0%, rgba(255,255,255,0.9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>👥</span>
          Volunteer Management
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
          Manage and coordinate your election monitoring team
        </Typography>
      </Box>

      <Paper
        className="premium-card slide-in-up stagger-1"
        sx={{
          p: 4,
          background: 'rgba(15,23,42,0.6)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Search Volunteers"
            variant="outlined"
            size="medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'var(--primary-500)' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: '100%', sm: '350px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
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
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={handleAddVolunteer}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'var(--text-primary)',
                px: 4,
                py: 1.5,
                borderRadius: '16px',
                fontWeight: 'bold',
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                border: '1px solid var(--border-light)',
                transition: 'all 0.3s ease',
              }}
            >
              Add Volunteer
            </Button>
          )}
        </Box>

        {volunteers.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <PeopleIcon sx={{ fontSize: 100, color: 'var(--neutral-300)', mb: 3, opacity: 0.5 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              No volunteers registered yet
            </Typography>
            {isAdmin && <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Click "Add Volunteer" to get started
            </Typography>}
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  }}>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Email / Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Working Area</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Joined On</TableCell>
                    {isAdmin && <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)', textAlign: 'center' }}>Actions</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVolunteers.map((volunteer, index) => (
                    <TableRow
                      key={volunteer.id}
                      className={`scale-in stagger-${Math.min(index + 1, 5)}`}
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:nth-of-type(odd)': {
                          background: 'rgba(102, 126, 234, 0.03)',
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: 'var(--primary-600)' }}>{volunteer.id}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{volunteer.name}</TableCell>
                      <TableCell>
                          <Typography variant="body2">{volunteer.email}</Typography>
                          <Typography variant="caption" color="textSecondary">{volunteer.phone}</Typography>
                      </TableCell>
                      <TableCell>{volunteer.address}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{volunteer.workingArea}</TableCell>
                      <TableCell>
                        <Chip
                          label={volunteer.status}
                          size="small"
                          sx={{
                            background: volunteer.status === 'Pending' ? 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                            color: 'var(--text-primary)',
                            fontWeight: 'bold',
                            px: 1.5,
                            boxShadow: '0 4px 12px rgba(67, 233, 123, 0.3)',
                            border: '1px solid var(--border-light)',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {volunteer.joinedOn}
                      </TableCell>
                      {isAdmin && (
                          <TableCell align="center">
                              {volunteer.status === 'Pending' ? (
                                  <>
                                      <Tooltip title="Approve Request">
                                          <IconButton onClick={() => handleApprove(volunteer)} sx={{ color: '#4caf50' }}>
                                              <CheckCircleIcon />
                                          </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Reject Request">
                                          <IconButton onClick={() => handleRevoke(volunteer)} sx={{ color: '#f44336' }}>
                                              <CancelIcon />
                                          </IconButton>
                                      </Tooltip>
                                  </>
                              ) : (
                                  <Tooltip title="Revoke Post">
                                      <IconButton onClick={() => handleRevoke(volunteer)} sx={{ color: '#f44336' }}>
                                          <CancelIcon />
                                      </IconButton>
                                  </Tooltip>
                              )}
                          </TableCell>
                      )}
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
                Displaying {filteredVolunteers.length} of {volunteers.length} volunteers
              </Typography>
            </Box>
          </>
        )}
      </Paper>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
            color: 'var(--text-primary)'
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          pb: 1,
          borderBottom: '1px solid var(--bg-glass-heavy)'
        }}>
          Add New Volunteer
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Volunteer Name" name="name" value={formData.name} onChange={handleInputChange} required InputLabelProps={{ style: { color: 'var(--text-secondary)' } }} sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' }, '&.Mui-focused fieldset': { borderColor: 'var(--primary-600)', borderWidth: '2px' } } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="User Email Account" name="email" value={formData.email} onChange={handleInputChange} placeholder="Used to link their citizen account" required InputLabelProps={{ style: { color: 'var(--text-secondary)' } }} sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' }, '&.Mui-focused fieldset': { borderColor: 'var(--primary-600)', borderWidth: '2px' } } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} required InputLabelProps={{ style: { color: 'var(--text-secondary)' } }} sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' }, '&.Mui-focused fieldset': { borderColor: 'var(--primary-600)', borderWidth: '2px' } } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleInputChange} multiline rows={2} required InputLabelProps={{ style: { color: 'var(--text-secondary)' } }} sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' }, '&.Mui-focused fieldset': { borderColor: 'var(--primary-600)', borderWidth: '2px' } } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Working Area" name="workingArea" value={formData.workingArea} onChange={handleInputChange} placeholder="e.g., District 5, Polling Station A-12" required InputLabelProps={{ style: { color: 'var(--text-secondary)' } }} sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' }, '&.Mui-focused fieldset': { borderColor: 'var(--primary-600)', borderWidth: '2px' } } }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2, borderTop: '1px solid var(--bg-glass-heavy)' }}>
          <Button onClick={handleCloseDialog} sx={{ borderRadius: '12px', px: 3, py: 1, fontWeight: 600, textTransform: 'none', color: 'var(--text-secondary)' }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', px: 4, py: 1, fontWeight: 'bold', textTransform: 'none', boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)' }}>Add Volunteer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Volunteers;