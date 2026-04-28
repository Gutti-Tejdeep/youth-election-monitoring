import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Avatar, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { updateUserAPI, deleteUserAPI } from '../services/api';

function Profile() {
    const { user, setUser, logout } = useAuth(); // Safely updates user context directly
    const { addVolunteer, volunteers } = useData();

    const userRole = (user?.role || 'citizen').toLowerCase();
    const canEdit = userRole === 'citizen' || userRole === 'volunteer';
    const isCitizen = userRole === 'citizen';
    
    // Check if user already applied
    const hasApplied = volunteers?.some(v => v.email === user?.email);

    const [formData, setFormData] = useState({
        name: user?.name || user?.displayName || '',
        email: user?.email || '',
        password: '',
    });
    
    const [volForm, setVolForm] = useState({ phone: '', address: '', workingArea: '' });
    const [volDialogOpen, setVolDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        if (canEdit) setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVolChange = (e) => {
        setVolForm({ ...volForm, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const res = await updateUserAPI(user.id, formData);
            setMessage('Profile updated successfully!');
            setUser(res.data);
        } catch (error) {
            let errMsg = 'Failed to update profile';
            if (error.response?.data) {
                if (typeof error.response.data === 'string') {
                    errMsg = error.response.data;
                } else if (error.response.data.message) {
                    errMsg = error.response.data.message;
                } else if (error.response.data.error) {
                    errMsg = error.response.data.error;
                }
            }
            setMessage(errMsg);
        }
    };

    const handleApplyVolunteer = async () => {
        if (!volForm.phone || !volForm.address || !volForm.workingArea) {
            alert("Please fill all fields");
            return;
        }
        
        try {
            await addVolunteer({
                name: user?.name || user?.displayName,
                email: user?.email,
                phone: volForm.phone,
                address: volForm.address,
                workingArea: volForm.workingArea,
                status: 'Pending',
                joinedOn: new Date().toLocaleDateString()
            });
            setVolDialogOpen(false);
            setMessage("Volunteer application submitted successfully!");
        } catch (e) {
            setMessage("Failed to submit application");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUserAPI(user.id);
            setDeleteDialogOpen(false);
            logout(); // Will redirect to login since user is set to null
        } catch (error) {
            let errMsg = 'Failed to delete account';
            if (error.response?.data) {
                if (typeof error.response.data === 'string') {
                    errMsg = error.response.data;
                } else if (error.response.data.message) {
                    errMsg = error.response.data.message;
                } else if (error.response.data.error) {
                    errMsg = error.response.data.error;
                }
            }
            setMessage(errMsg);
            setDeleteDialogOpen(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Box className="slide-in-right" sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'var(--text-primary)', mb: 1 }}>
                    My Profile
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
                    {canEdit ? "Manage your account details and password" : "View your account details"}
                </Typography>
            </Box>

            <Paper className="premium-card slide-in-up" sx={{ p: 4, borderRadius: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar sx={{ width: 80, height: 80, mr: 3, background: 'var(--gradient-primary)' }}>
                        {(formData.name || 'U').charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{user?.role}</Typography>
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>ID: {user?.id}</Typography>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth label="Full Name" name="name"
                            value={formData.name} onChange={handleChange} disabled={!canEdit}
                            InputLabelProps={{ style: { color: 'var(--text-primary)' } }}
                            sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' } }, '& .Mui-disabled': { WebkitTextFillColor: 'var(--text-disabled) !important' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth label="Email Address" name="email"
                            value={formData.email} onChange={handleChange} disabled={!canEdit}
                            InputLabelProps={{ style: { color: 'var(--text-primary)' } }}
                            sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' } }, '& .Mui-disabled': { WebkitTextFillColor: 'var(--text-disabled) !important' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth label="New Password (Optional)" name="password" type="password"
                            value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current password" disabled={!canEdit}
                            InputLabelProps={{ style: { color: 'var(--text-primary)' } }}
                            sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' } }, '& .Mui-disabled': { WebkitTextFillColor: 'var(--text-disabled) !important' } }}
                        />
                    </Grid>
                </Grid>

                {message && (
                    <Typography sx={{ mt: 2, color: message.includes('success') ? '#4caf50' : '#f44336', fontWeight: 600 }}>
                        {message}
                    </Typography>
                )}

                {canEdit && (
                    <Button
                        variant="contained" fullWidth
                        sx={{ mt: 4, py: 1.5, background: 'var(--gradient-primary)', fontWeight: 'bold', borderRadius: '12px' }}
                        onClick={handleUpdate}
                    >
                        Update Profile
                    </Button>
                )}

                {isCitizen && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid var(--bg-glass-heavy)' }}>
                        <Typography variant="h6" sx={{ color: 'var(--text-primary)', mb: 2, fontWeight: 'bold' }}>
                            Want to help your community?
                        </Typography>
                        <Button
                            variant="outlined" 
                            startIcon={<GroupAddIcon />}
                            disabled={hasApplied}
                            fullWidth
                            sx={{ 
                                py: 1.5, 
                                color: 'var(--text-primary)', 
                                borderColor: 'var(--text-disabled)',
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                '&:hover': {
                                   background: 'var(--bg-glass-heavy)',
                                   borderColor: 'var(--text-primary)'
                                },
                                '&.Mui-disabled': {
                                   color: 'var(--text-disabled)',
                                   borderColor: 'var(--border-light)'
                                }
                            }}
                            onClick={() => setVolDialogOpen(true)}
                        >
                            {hasApplied ? "Application Pending" : "Apply for Volunteer"}
                        </Button>
                    </Box>
                )}

                {canEdit && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid var(--bg-glass-heavy)' }}>
                        <Typography variant="h6" sx={{ color: '#f44336', mb: 1, fontWeight: 'bold' }}>
                            Danger Zone
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 2 }}>
                            Once you delete your account, there is no going back. Please be certain.
                        </Typography>
                        <Button
                            variant="outlined" color="error" fullWidth
                            startIcon={<DeleteIcon />}
                            sx={{ py: 1.5, borderRadius: '12px', fontWeight: 'bold', borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            Delete Account
                        </Button>
                    </Box>
                )}
            </Paper>

            <Dialog 
                open={volDialogOpen} 
                onClose={() => setVolDialogOpen(false)}
                PaperProps={{ sx: { borderRadius: '20px', background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(20px)', color: 'var(--text-primary)' } }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid var(--bg-glass-heavy)' }}>
                    Volunteer Application
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Phone Number" name="phone" value={volForm.phone} onChange={handleVolChange} InputLabelProps={{ style: { color: 'var(--text-secondary)' } }} sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' } } }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Address" name="address" multiline rows={2} value={volForm.address} onChange={handleVolChange} InputLabelProps={{ style: { color: 'var(--text-secondary)' } }} sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' } } }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Preferred Working Area" name="workingArea" value={volForm.workingArea} onChange={handleVolChange} placeholder="e.g. District 5" InputLabelProps={{ style: { color: 'var(--text-secondary)' } }} sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-light)' } } }} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '1px solid var(--bg-glass-heavy)' }}>
                    <Button onClick={() => setVolDialogOpen(false)} sx={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Cancel</Button>
                    <Button onClick={handleApplyVolunteer} variant="contained" sx={{ background: 'var(--gradient-primary)', borderRadius: '10px', fontWeight: 'bold' }}>Submit Application</Button>
                </DialogActions>
            </Dialog>

            <Dialog 
                open={deleteDialogOpen} 
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{ sx: { borderRadius: '20px', background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(20px)', color: 'var(--text-primary)', maxWidth: '400px' } }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid var(--bg-glass-heavy)', display: 'flex', alignItems: 'center' }}>
                    <WarningAmberIcon color="error" sx={{ mr: 1 }} /> Confirm Deletion
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Typography sx={{ color: 'var(--text-primary)' }}>
                        Are you sure you want to delete your account permanently? All your linked data might be lost. This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '1px solid var(--bg-glass-heavy)' }}>
                    <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Cancel</Button>
                    <Button onClick={handleDeleteAccount} variant="contained" color="error" sx={{ borderRadius: '10px', fontWeight: 'bold' }}>
                        Delete Account
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Profile;
