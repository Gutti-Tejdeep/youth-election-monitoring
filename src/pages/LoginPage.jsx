import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// MUI Imports
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New state for registration
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, register } = useAuth();

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

    // Simulate network delay
    setTimeout(() => {
      if (isLogin) {
        login(email);
      } else {
        register(username, email);
      }
      navigate('/home');
    }, 500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    // Optional: Clear fields on toggle
    // setEmail('');
    // setPassword('');
    // setUsername('');
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
        <Typography component="h1" variant="h5">
          Youth Election Monitoring
        </Typography>
        <Typography component="h2" variant="subtitle1" sx={{ mt: 1 }}>
          {isLogin ? 'Admin Login' : 'Create Account'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
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
            autoFocus={isLogin} // Focus email only if login mode (otherwise username is first)
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