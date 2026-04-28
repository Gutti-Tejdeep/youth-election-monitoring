import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, verifyOtpAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount (optional: check session later if using JWT)
    useEffect(() => {
        setLoading(false);
    }, []);

    // 🔐 LOGIN (Backend API or Local Bypass)
    const login = async (identifier, password, loginRole = "Citizen") => {
        try {
            // Local fallback for special roles requested by user
            if (loginRole === 'Admin') {
                if (password === 'admin') {
                    const adminUser = { email: 'admin@system.com', displayName: 'Administrator', role: 'Admin' };
                    setUser(adminUser);
                    return adminUser;
                }
                throw new Error("Invalid admin password");
            }

            if (loginRole === 'Election Observer') {
                if (password === 'observer') {
                    const obsUser = { email: 'observer@system.com', displayName: 'Lead Observer', role: 'Election Observer' };
                    setUser(obsUser);
                    return obsUser;
                }
                throw new Error("Invalid observer password");
            }

            if (loginRole === 'Data Analyst') {
                if (password === 'analyst') {
                    const anaUser = { email: 'analyst@system.com', displayName: 'Lead Analyst', role: 'Data Analyst' };
                    setUser(anaUser);
                    return anaUser;
                }
                throw new Error("Invalid analyst password");
            }

            // Normal citizen route hitting the backend
            const res = await loginUser({
                email: identifier,
                password
            });

            setUser(res.data); // backend user object
            return res.data;

        } catch (err) {
            console.error(err);
            let detailedError = err.message || "Invalid credentials";
            if (err.response?.data) {
                if (typeof err.response.data === 'string') {
                    detailedError = err.response.data;
                } else if (err.response.data.message) {
                    detailedError = err.response.data.message;
                } else if (err.response.data.error) {
                    detailedError = err.response.data.error;
                }
            }
            throw new Error(detailedError);
        }
    };

    // 📝 REGISTER (Backend API)
    const register = async (username, email, password, role = "Citizen") => {
        try {
            const res = await registerUser({
                name: username,
                email,
                password,
                role
            });

            // Do NOT log the user in yet, they need to verify OTP.
            return res.data;

        } catch (err) {
            console.error("DEBUG REGISTRATION ERROR:", err, err.response?.data);
            let detailedError = err.message || "Unknown error";
            if (err.response?.data) {
                if (typeof err.response.data === 'string') {
                    detailedError = err.response.data;
                } else if (err.response.data.message) {
                    detailedError = err.response.data.message;
                } else if (err.response.data.error) {
                    detailedError = err.response.data.error;
                }
            }
            
            const errStr = detailedError.toString().toLowerCase();
            const isDuplicate = err.response?.status === 409 || errStr.includes('duplicate') || errStr.includes('already exists') || errStr.includes('constraint');
            
            if (isDuplicate) {
                throw new Error("The username or email is already taken. Please use another.");
            }
            
            throw new Error(`Registration failed: ${detailedError}`);
        }
    };

    // 📩 VERIFY OTP
    const verifyOtp = async (email, otp) => {
        try {
            const res = await verifyOtpAPI(email, otp);
            return res.data;
        } catch (err) {
            console.error("DEBUG OTP ERROR:", err);
            let detailedError = err.message || "OTP Verification failed";
            if (err.response?.data) {
                if (typeof err.response.data === 'string') {
                    detailedError = err.response.data;
                } else if (err.response.data.message) {
                    detailedError = err.response.data.message;
                }
            }
            throw new Error(`Verification failed: ${detailedError}`);
        }
    };

    // 🚪 LOGOUT
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, verifyOtp, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);