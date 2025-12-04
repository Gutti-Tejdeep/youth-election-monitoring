import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [credentials, setCredentials] = useState([]);

    // --- MOCK AUTH BYPASS FLAG ---
    // Set this to true to immediately bypass the login screen for testing.
    // KEEP THIS SET TO 'true' to run without Firebase.
    const MOCK_AUTH_ENABLED = false;

    // Load credentials from localStorage on mount
    useEffect(() => {
        const savedCredentials = localStorage.getItem('userCredentials');
        if (savedCredentials) {
            try {
                setCredentials(JSON.parse(savedCredentials));
            } catch (error) {
                console.error('Error loading credentials:', error);
            }
        }

        // 1. MOCK AUTHENTICATION LOGIC
        if (MOCK_AUTH_ENABLED) {
            setUser({ uid: 'mock-user-id', email: 'tester@example.com' });
        }
        setLoading(false);
    }, []);

    // Save credentials to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('userCredentials', JSON.stringify(credentials));
    }, [credentials]);

    const login = (email, password) => {
        // Validate credentials exist and match
        const credential = credentials.find(cred => cred.email === email && cred.password === password);
        
        if (!credential) {
            throw new Error('Invalid email or password. Please register first.');
        }

        // Create new user
        const newUser = {
            uid: 'mock-user-id-' + Math.random().toString(36).substring(7),
            email: email,
            displayName: credential.username || email
        };
        setUser(newUser);
        return newUser;
    };

    const register = (username, email, password) => {
        // Create new user
        const newUser = {
            uid: 'mock-user-id-' + Math.random().toString(36).substring(7),
            email: email,
            displayName: username
        };
        setUser(newUser);

        // Save new user credentials
        const credentialExists = credentials.some(cred => cred.email === email);
        if (!credentialExists) {
            setCredentials(prev => [...prev, { email, password, username, createdAt: new Date().toISOString() }]);
        }
    };

    const logout = () => {
        setUser(null);
    };

    const getCredentials = () => {
        return credentials;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, getCredentials }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
