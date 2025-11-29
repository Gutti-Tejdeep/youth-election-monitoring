import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Page Imports
import Home from './pages/Home';
import Reports from './pages/Reports';
import Volunteers from './pages/Volunteers';
import Incidents from './pages/Incidents';
import LoginPage from './pages/LoginPage';

// Component Imports
import Layout from './components/Layout';
import { Box, CircularProgress } from '@mui/material';

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
          <Route path="reports" element={<Reports />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="incidents" element={<Incidents />} />

          {/* Default Route: Redirect root path to /home */}
          <Route index element={<Navigate to="/home" replace />} />
        </Route>

      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;