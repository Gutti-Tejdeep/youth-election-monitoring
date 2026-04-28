import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// MUI Imports
import { Box, Button, TextField, Typography, Alert, Paper, Snackbar } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Logo from '../components/Logo';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Citizen');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const roles = [
    { id: 'Admin', label: 'Admin' },
    { id: 'Citizen', label: 'Citizen' },
    { id: 'Election Observer', label: 'Observer' },
    { id: 'Data Analyst', label: 'Analyst' }
  ];

  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const [showOtp, setShowOtp] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const navigate = useNavigate();
  const { login, register, verifyOtp } = useAuth();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result);
    setCaptchaInput('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (role === 'Citizen') {
      if (!email || !password) {
        setError('Please enter an email and password.');
        return;
      }
      if (!isLogin && !username) {
        setError('Please enter a username.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }
      if (captchaInput !== captchaValue) {
        setError('Incorrect CAPTCHA. Please try again.');
        generateCaptcha();
        return;
      }
    } else {
      if (!password) {
        setError('Please enter a password.');
        return;
      }
    }

    try {
      if (showOtp) {
        if (!otpValue) {
          setError('Please enter the OTP sent to your email.');
          return;
        }
        await verifyOtp(email, otpValue);
        // OTP verified successfully, now login automatically
        await login(email, password, role);
        navigate('/home');
      } else {
        if (isLogin || role !== 'Citizen') {
          const identifier = role === 'Citizen' ? email : role;
          await login(identifier, password, role);
          navigate('/home');
        } else {
          // Send OTP via register
          await register(username, email, password, role);
          setShowOtp(true);
          setSnackbarOpen(true);
          setError('');
          // We don't navigate yet, user needs to enter OTP
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      setSnackbarOpen(true);
      if (role === 'Citizen') generateCaptcha();
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setShowOtp(false);
    setOtpValue('');
    generateCaptcha();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      {/* Horizontal card container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          maxWidth: '900px',
          minHeight: { md: '560px' },
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
          border: '1px solid var(--border-light)',
        }}
      >
        {/* LEFT PANEL — Branding */}
        <Box
          sx={{
            flex: '0 0 42%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 5,
            gap: 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* decorative circles */}
          <Box sx={{
            position: 'absolute', width: 220, height: 220,
            borderRadius: '50%', background: 'var(--bg-glass-light)',
            top: -60, right: -60,
          }} />
          <Box sx={{
            position: 'absolute', width: 160, height: 160,
            borderRadius: '50%', background: 'var(--bg-glass-light)',
            bottom: -40, left: -40,
          }} />

          <Logo size={90} color1="var(--text-primary)fff" color2="var(--text-secondary)" />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: 'var(--text-primary)',
              textShadow: '0 4px 15px rgba(0,0,0,0.3)',
              letterSpacing: '3px',
              fontFamily: "'Outfit', sans-serif",
              textAlign: 'center',
            }}
          >
            YEM
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-primary)',
              textAlign: 'center',
              lineHeight: 1.7,
              fontWeight: 500,
              maxWidth: '260px',
            }}
          >
            Youth Election Monitoring — ensuring transparency and fairness in every election.
          </Typography>

          {/* Role badge strip */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 1 }}>
            {roles.map((r) => (
              <Box
                key={r.id}
                sx={{
                  px: 1.5, py: 0.4,
                  borderRadius: '20px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                }}
              >
                {r.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* RIGHT PANEL — Form */}
        <Box
          sx={{
            flex: 1,
            background: 'var(--bg-glass-heavy)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: 4, md: 5 },
            overflowY: 'auto',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: 'var(--text-primary)',
              mb: 0.5,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {isLogin ? 'Welcome back' : 'Create account'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
            {isLogin ? 'Sign in to continue to your dashboard' : 'Register to start monitoring elections'}
          </Typography>

          {/* Role selector */}
          <Typography variant="caption" sx={{ color: 'var(--text-primary)', mb: 0.75, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Login As
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 3 }}>
            {roles.map((r) => (
              <Button
                key={r.id}
                onClick={() => {
                  setRole(r.id);
                  if (r.id !== 'Citizen') {
                    setIsLogin(true); // Force login mode for special roles
                  }
                }}
                variant={role === r.id ? 'contained' : 'outlined'}
                size="small"
                sx={{
                  fontSize: '0.72rem',
                  py: 0.9,
                  textTransform: 'none',
                  borderRadius: '10px',
                  borderColor: 'var(--border-light)',
                  color: role === r.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: role === r.id ? 'var(--border-light)' : 'transparent',
                  backdropFilter: role === r.id ? 'blur(10px)' : 'none',
                  '&:hover': {
                    background: role === r.id ? 'var(--border-light)' : 'transparent',
                    borderColor: 'var(--border-light)',
                    boxShadow: 'none',
                  },
                }}
              >
                {r.label}
              </Button>
            ))}
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {showOtp ? (
              <>
                <Typography variant="body1" sx={{ color: 'var(--text-primary)', textAlign: 'center', mb: 2 }}>
                  An OTP has been sent to your email. Please enter it below to verify your account.
                </Typography>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="otpValue"
                  label="Enter OTP"
                  name="otpValue"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'var(--bg-glass-light)',
                      color: 'var(--text-primary)',
                      borderRadius: '10px',
                      '& fieldset': { borderColor: 'var(--border-light)' },
                    },
                    '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
                  }}
                />
              </>
            ) : (
              <>
                {role === 'Citizen' && !isLogin && (
              <TextField
                required
                fullWidth
                size="small"
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'var(--bg-glass-light)',
                    color: 'var(--text-primary)',
                    borderRadius: '10px',
                    '& fieldset': { borderColor: 'var(--border-light)' },
                  },
                  '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
                }}
              />
            )}

            {role === 'Citizen' && (
              <TextField
                required
                fullWidth
                size="small"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'var(--bg-glass-light)',
                    color: 'var(--text-primary)',
                    borderRadius: '10px',
                    '& fieldset': { borderColor: 'var(--border-light)' },
                  },
                  '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
                }}
              />
            )}

              <TextField
                required
                fullWidth
                size="small"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'var(--bg-glass-light)',
                    color: 'var(--text-primary)',
                    borderRadius: '10px',
                    '& fieldset': { borderColor: 'var(--border-light)' },
                  },
                  '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
                }}
              />

            {/* CAPTCHA */}
            {role === 'Citizen' && (
              <>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Paper
                    sx={{
                      flex: 1,
                      py: 1,
                      textAlign: 'center',
                      background: 'var(--gradient-primary)',
                      color: 'var(--text-primary)',
                      letterSpacing: '8px',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      fontFamily: 'monospace',
                      userSelect: 'none',
                      borderRadius: '10px',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                  >
                    {captchaValue}
                  </Paper>
                  <Button
                    onClick={generateCaptcha}
                    size="small"
                    sx={{
                      minWidth: 'auto',
                      p: 1,
                      background: 'var(--bg-glass-light)',
                      borderRadius: '10px',
                      '&:hover': {
                        background: 'var(--bg-glass-heavy)',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    <RefreshIcon fontSize="small" sx={{ color: 'var(--text-primary)' }} />
                  </Button>
                </Box>

                <TextField
                  required
                  fullWidth
                  size="small"
                  id="captcha"
                  label="Enter CAPTCHA"
                  name="captcha"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Type the characters above"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'var(--bg-glass-light)',
                      color: 'var(--text-primary)',
                      borderRadius: '10px',
                      '& fieldset': { borderColor: 'var(--border-light)' },
                    },
                    '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
                    '& input::placeholder': { color: 'var(--text-disabled)' },
                  }}
                />
              </>
            )}
            </>
            )}

            {error && (
              <Alert severity="error" sx={{ borderRadius: '10px' }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 0.5,
                py: 1.2,
                borderRadius: '10px',
                background: 'var(--gradient-accent)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: 'var(--shadow-lg)',
                '&:hover': {
                  background: '#1d4ed8',
                  boxShadow: 'var(--shadow-lg)',
                },
              }}
            >
              {showOtp ? 'Verify & Login' : (isLogin || role !== 'Citizen' ? 'Sign In' : 'Sign Up')}
            </Button>

            {role === 'Citizen' && (
              <Button
                fullWidth
                variant="text"
                onClick={toggleMode}
                sx={{
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  '&:hover': {
                    background: 'transparent',
                    color: '#93c5fd',
                  },
                }}
              >
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={showOtp && !error ? "success" : "error"} variant="filled" sx={{ width: '100%', fontSize: '1rem', fontWeight: 600, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', borderRadius: '12px' }}>
          {error || (showOtp ? "OTP sent to your email! Please check your inbox." : "")}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LoginPage;