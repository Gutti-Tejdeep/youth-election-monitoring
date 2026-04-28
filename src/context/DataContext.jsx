import React, { createContext, useState, useContext, useEffect } from 'react';
import {
    getVolunteers, addVolunteerAPI, deleteVolunteerAPI, updateVolunteerAPI,
    getIncidents, addIncidentAPI, deleteIncidentAPI,
    getReports, addReportAPI, deleteReportAPI,
    getInteractions, addInteractionAPI, deleteInteractionAPI
} from '../services/api';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [volunteers, setVolunteers] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [reports, setReports] = useState([]);
    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ─── Fetch all data from backend only when logged in ────────────
    useEffect(() => {
        if (user) {
            fetchAllData();
        } else {
            setLoading(false); // Stop loading if not logged in
        }
    }, [user]);

    const fetchAllData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [volRes, incRes, repRes, intRes] = await Promise.all([
                getVolunteers(),
                getIncidents(),
                getReports(),
                getInteractions()
            ]);
            setVolunteers(volRes.data);
            setIncidents(incRes.data);
            setReports(repRes.data);
            setInteractions(intRes.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data from server');
        } finally {
            setLoading(false);
        }
    };

    // ─── Volunteer operations ────────────────────────────
    const addVolunteer = async (volunteer) => {
        try {
            const res = await addVolunteerAPI(volunteer);
            setVolunteers(prev => [...prev, res.data]);
            return res.data;
        } catch (err) {
            console.error('Error adding volunteer:', err);
            throw new Error('Failed to add volunteer');
        }
    };

    const deleteVolunteer = async (id) => {
        try {
            await deleteVolunteerAPI(id);
            setVolunteers(prev => prev.filter(v => v.id !== id));
        } catch (err) {
            console.error('Error deleting volunteer:', err);
            throw new Error('Failed to delete volunteer');
        }
    };

    const updateVolunteer = async (id, updatedData) => {
        try {
            const res = await updateVolunteerAPI(id, updatedData);
            setVolunteers(prev => prev.map(v => v.id === id ? res.data : v));
            return res.data;
        } catch (err) {
            console.error('Error updating volunteer:', err);
            throw new Error('Failed to update volunteer');
        }
    };

    // ─── Incident operations ─────────────────────────────
    const addIncident = async (incident) => {
        try {
            const res = await addIncidentAPI(incident);
            setIncidents(prev => [res.data, ...prev]);
            return res.data;
        } catch (err) {
            console.error('Error adding incident:', err);
            throw new Error('Failed to add incident');
        }
    };

    const deleteIncident = async (id) => {
        try {
            await deleteIncidentAPI(id);
            setIncidents(prev => prev.filter(i => i.id !== id));
        } catch (err) {
            console.error('Error deleting incident:', err);
            throw new Error('Failed to delete incident');
        }
    };

    // ─── Report operations ───────────────────────────────
    const addReport = async (report) => {
        try {
            const res = await addReportAPI(report);
            setReports(prev => [res.data, ...prev]);
            return res.data;
        } catch (err) {
            console.error('Error adding report:', err);
            throw new Error('Failed to add report');
        }
    };

    const deleteReport = async (id) => {
        try {
            await deleteReportAPI(id);
            setReports(prev => prev.filter(r => r.id !== id));
        } catch (err) {
            console.error('Error deleting report:', err);
            throw new Error('Failed to delete report');
        }
    };

    // ─── Interaction operations ──────────────────────────
    const addInteraction = async (interaction) => {
        try {
            const res = await addInteractionAPI(interaction);
            setInteractions(prev => [res.data, ...prev]);
            return res.data;
        } catch (err) {
            console.error('Error adding interaction:', err);
            throw new Error('Failed to add interaction');
        }
    };

    const deleteInteraction = async (id) => {
        try {
            await deleteInteractionAPI(id);
            setInteractions(prev => prev.filter(i => i.id !== id));
        } catch (err) {
            console.error('Error deleting interaction:', err);
            throw new Error('Failed to delete interaction');
        }
    };

    const value = {
        // Data
        volunteers,
        incidents,
        reports,
        interactions,
        // Status
        loading,
        error,
        // Volunteer ops
        setVolunteers,
        addVolunteer,
        deleteVolunteer,
        updateVolunteer,
        // Incident ops
        setIncidents,
        addIncident,
        deleteIncident,
        // Report ops
        setReports,
        addReport,
        deleteReport,
        // Interaction ops
        setInteractions,
        addInteraction,
        deleteInteraction,
        // Refresh
        fetchAllData
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
