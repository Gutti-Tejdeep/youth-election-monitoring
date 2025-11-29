import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- MOCK AUTH BYPASS FLAG ---
    // Set this to true to immediately bypass the login screen for testing.
    // KEEP THIS SET TO 'true' to run without Firebase.
    const MOCK_AUTH_ENABLED = false;

    useEffect(() => {
        // 1. MOCK AUTHENTICATION LOGIC
        if (MOCK_AUTH_ENABLED) {
            setUser({ uid: 'mock-user-id', email: 'tester@example.com' });
        }
        setLoading(false);
    }, []);

    const login = (email) => {
        // Simulate login
        setUser({ uid: 'mock-user-id-' + Math.random().toString(36).substring(7), email: email });
    };

    const register = (username, email) => {
        // Simulate registration (auto-login)
        setUser({
            uid: 'mock-user-id-' + Math.random().toString(36).substring(7),
            email: email,
            displayName: username
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
