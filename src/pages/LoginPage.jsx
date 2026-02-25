import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// MUI Imports
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Logo from '../components/Logo';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Citizen');
  const [error, setError] = useState('');

  const roles = [
    { id: 'Admin', label: 'Admin' },
    { id: 'Citizen', label: 'Citizen' },
    { id: 'Election Observer', label: 'Observer' },
    { id: 'Data Analyst', label: 'Analyst' }
  ];

  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const navigate = useNavigate();
  const { login, register } = useAuth();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

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

    setTimeout(() => {
      try {
        if (isLogin) {
          login(email, password, role);
        } else {
          register(username, email, password, role);
        }
        navigate('/home');
      } catch (err) {
        setError(err.message || 'Login failed. Please try again.');
        generateCaptcha();
      }
    }, 500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
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
          border: '1px solid rgba(255,255,255,0.25)',
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
            borderRadius: '50%', background: 'rgba(255,255,255,0.07)',
            top: -60, right: -60,
          }} />
          <Box sx={{
            position: 'absolute', width: 160, height: 160,
            borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
            bottom: -40, left: -40,
          }} />

          <Logo size={90} color1="#ffffff" color2="rgba(255,255,255,0.6)" />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: '#fff',
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
              color: 'rgba(255,255,255,0.85)',
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
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
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
            background: 'rgba(255,255,255,0.18)',
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
              color: '#fff',
              mb: 0.5,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {isLogin ? 'Welcome back' : 'Create account'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
            {isLogin ? 'Sign in to continue to your dashboard' : 'Register to start monitoring elections'}
          </Typography>

          {/* Role selector */}
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', mb: 0.75, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Login As
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 3 }}>
            {roles.map((r) => (
              <Button
                key={r.id}
                onClick={() => setRole(r.id)}
                variant={role === r.id ? 'contained' : 'outlined'}
                size="small"
                sx={{
                  fontSize: '0.72rem',
                  py: 0.9,
                  textTransform: 'none',
                  borderRadius: '10px',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: role === r.id ? '#fff' : 'rgba(255,255,255,0.75)',
                  background: role === r.id ? 'rgba(255,255,255,0.25)' : 'transparent',
                  backdropFilter: role === r.id ? 'blur(10px)' : 'none',
                  '&:hover': {
                    background: role === r.id ? 'rgba(255,255,255,0.25)' : 'transparent',
                    borderColor: 'rgba(255,255,255,0.3)',
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
            {!isLogin && (
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
                    background: 'rgba(255,255,255,0.88)',
                    borderRadius: '10px',
                    '& fieldset': { borderColor: 'transparent' },
                  },
                }}
              />
            )}

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
                  background: 'rgba(255,255,255,0.88)',
                  borderRadius: '10px',
                  '& fieldset': { borderColor: 'transparent' },
                },
              }}
            />

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
                  background: 'rgba(255,255,255,0.88)',
                  borderRadius: '10px',
                  '& fieldset': { borderColor: 'transparent' },
                },
              }}
            />

            {/* CAPTCHA */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Paper
                sx={{
                  flex: 1,
                  py: 1,
                  textAlign: 'center',
                  background: 'var(--gradient-primary)',
                  color: '#fff',
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
                  background: 'rgba(255,255,255,0.88)',
                  borderRadius: '10px',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.88)',
                    boxShadow: 'none',
                  },
                }}
              >
                <RefreshIcon fontSize="small" />
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
                  background: 'rgba(255,255,255,0.88)',
                  borderRadius: '10px',
                  '& fieldset': { borderColor: 'transparent' },
                },
              }}
            />

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
                background: 'var(--gradient-primary)',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: 'var(--shadow-lg)',
                '&:hover': {
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-lg)',
                },
              }}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={toggleMode}
              sx={{
                color: '#fff',
                fontWeight: 500,
                fontSize: '0.85rem',
                '&:hover': {
                  background: 'transparent',
                  color: '#fff',
                },
              }}
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;