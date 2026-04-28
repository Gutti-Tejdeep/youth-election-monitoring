import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Page Imports
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Volunteers from './pages/Volunteers';
import Incidents from './pages/Incidents';
import LoginPage from './pages/LoginPage';
import Interaction from './pages/Interaction';
import Profile from './pages/Profile';

// Component Imports
import Layout from './components/Layout';
import { Box, CircularProgress, ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    background: {
      default: '#0B0F19',
      paper: '#111827',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#9CA3AF',
      disabled: '#6B7280',
    },
    divider: 'rgba(255,255,255,0.12)',
  },
  typography: {
    fontFamily: "'Outfit', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111827',
          border: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.03)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.2)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3b82f6',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#9CA3AF',
          fontWeight: 500,
          '&.Mui-focused': {
            color: '#60a5fa',
          },
        },
      },
    },
  },
});

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Route 1: Login Page */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/home" replace />}
        />

        {/* Route 2: Protected Routes (Dashboard) */}
        <Route
          path="/*"
          element={
            user ? (
              <Layout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/* Nested Routes inside the Layout */}
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="interaction" element={<Interaction />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="profile" element={<Profile />} />

          {/* Default Route: Redirect root path to /home */}
          <Route index element={<Navigate to="/home" replace />} />
        </Route>

      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;