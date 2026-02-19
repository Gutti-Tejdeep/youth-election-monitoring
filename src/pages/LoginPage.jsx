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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          className="glass-card floating"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 5,
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
            }}
          >
            <Typography variant="h3" sx={{ color: '#fff' }}>
              🗳️
            </Typography>
          </Box>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            YEM
          </Typography>
          <Typography component="h2" variant="subtitle1" sx={{ mt: 1, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
            {isLogin ? 'Admin Login' : 'Create Account'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                  },
                }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              }}
            />

            {/* Captcha Section */}
            <Box sx={{ mt: 2, mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mr: 1,
                    flexGrow: 1,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    letterSpacing: '8px',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    fontFamily: 'monospace',
                    userSelect: 'none',
                    borderRadius: 2,
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  {captchaValue}
                </Paper>
                <Button
                  onClick={generateCaptcha}
                  size="small"
                  sx={{
                    minWidth: 'auto',
                    p: 1.5,
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2,
                    '&:hover': {
                      background: '#fff',
                    }
                  }}
                >
                  <RefreshIcon />
                </Button>
              </Box>
              <TextField
                required
                fullWidth
                size="medium"
                id="captcha"
                label="Enter CAPTCHA"
                name="captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Type the characters above"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                  },
                }}
              />
            </Box>

            {/* Display error message if 'error' state is not empty */}
            {error && (
              <Alert severity="error" sx={{ width: '100%', mt: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                }
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
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;