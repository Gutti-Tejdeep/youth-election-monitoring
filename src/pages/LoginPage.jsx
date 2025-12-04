import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// MUI Imports
import { Box, Button, Container, TextField, Typography, Alert, Paper } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New state for registration
  const [error, setError] = useState('');

  // Captcha State
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const navigate = useNavigate();
  const { login, register } = useAuth();

  // Generate random captcha on mount and when refreshed
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

    // Basic validation
    if (!email || !password) {
      setError('Please enter an email and password.');
      return;
    }

    if (!isLogin && !username) {
      setError('Please enter a username.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Captcha Validation
    if (captchaInput !== captchaValue) {
      setError('Incorrect CAPTCHA. Please try again.');
      generateCaptcha(); // Regenerate on failure for security
      return;
    }

    // Simulate network delay
    setTimeout(() => {
      try {
        if (isLogin) {
          login(email, password);
        } else {
          register(username, email, password);
        }
        navigate('/home');
      } catch (err) {
        setError(err.message || 'Login failed. Please try again.');
        generateCaptcha(); // Regenerate on failure
      }
    }, 500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    generateCaptcha(); // Regenerate when switching modes
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          YEM
        </Typography>
        <Typography component="h2" variant="subtitle1" sx={{ mt: 1 }}>
          {isLogin ? 'Admin Login' : 'Create Account'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, width: '100%' }}>
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={isLogin}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Captcha Section */}
          <Box sx={{ mt: 2, mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 1,
                  mr: 1,
                  flexGrow: 1,
                  textAlign: 'center',
                  backgroundColor: '#f5f5f5',
                  letterSpacing: '5px',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  userSelect: 'none'
                }}
              >
                {captchaValue}
              </Paper>
              <Button
                onClick={generateCaptcha}
                size="small"
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <RefreshIcon />
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
            />
          </Box>

          {/* Display error message if 'error' state is not empty */}
          {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={toggleMode}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;