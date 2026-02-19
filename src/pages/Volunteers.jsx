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
  Grid
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import { useData } from '../context/DataContext';

function Volunteers() {
  const { volunteers, addVolunteer } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
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

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.workingArea) {
      alert('Please fill in all fields');
      return;
    }

    const newVolunteer = {
      id: `V-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      workingArea: formData.workingArea,
      status: 'Active',
      joinedOn: new Date().toLocaleDateString()
    };

    addVolunteer(newVolunteer);
    handleCloseDialog();
    alert('Volunteer added successfully!');
  };

  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.workingArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box className="slide-in-right" sx={{ mb: 4 }}>
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
          <span style={{ fontSize: '2.5rem' }}>👥</span>
          Volunteer Management
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
          Manage and coordinate your election monitoring team
        </Typography>
      </Box>

      <Paper
        className="premium-card slide-in-up stagger-1"
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
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
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleAddVolunteer}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              px: 4,
              py: 1.5,
              borderRadius: '16px',
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
              }
            }}
          >
            Add Volunteer
          </Button>
        </Box>

        {volunteers.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <PeopleIcon sx={{ fontSize: 100, color: 'var(--neutral-300)', mb: 3, opacity: 0.5 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              No volunteers registered yet
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Click "Add Volunteer" to get started
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
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Working Area</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Joined On</TableCell>
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
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                          transform: 'scale(1.01)',
                          boxShadow: '0 4px 16px rgba(102, 126, 234, 0.15)',
                        }
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: 'var(--primary-600)' }}>{volunteer.id}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{volunteer.name}</TableCell>
                      <TableCell>{volunteer.phone}</TableCell>
                      <TableCell>{volunteer.address}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{volunteer.workingArea}</TableCell>
                      <TableCell>
                        <Chip
                          label={volunteer.status}
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
                      <TableCell sx={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {volunteer.joinedOn}
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          pb: 1
        }}>
          Add New Volunteer
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Volunteer Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: 'var(--primary-500)',
                    },
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
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: 'var(--primary-500)',
                    },
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
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                multiline
                rows={2}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: 'var(--primary-500)',
                    },
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
                label="Working Area"
                name="workingArea"
                value={formData.workingArea}
                onChange={handleInputChange}
                placeholder="e.g., District 5, Polling Station A-12"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: 'var(--primary-500)',
                    },
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
              '&:hover': {
                background: 'rgba(0,0,0,0.05)',
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              px: 4,
              py: 1,
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
              }
            }}
          >
            Add Volunteer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Volunteers;