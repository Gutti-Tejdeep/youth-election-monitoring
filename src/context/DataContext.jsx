import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    // Load data from localStorage on init
    const [volunteers, setVolunteers] = useState(() => {
        const saved = localStorage.getItem('volunteers');
        return saved ? JSON.parse(saved) : [];
    });

    const [incidents, setIncidents] = useState(() => {
        const saved = localStorage.getItem('incidents');
        return saved ? JSON.parse(saved) : [];
    });

    const [reports, setReports] = useState(() => {
        const saved = localStorage.getItem('reports');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('volunteers', JSON.stringify(volunteers));
    }, [volunteers]);

    useEffect(() => {
        localStorage.setItem('incidents', JSON.stringify(incidents));
    }, [incidents]);

    useEffect(() => {
        localStorage.setItem('reports', JSON.stringify(reports));
    }, [reports]);

    // Helper functions
    const addVolunteer = (volunteer) => {
        setVolunteers(prev => [...prev, volunteer]);
    };

    const addIncident = (incident) => {
        setIncidents(prev => [incident, ...prev]);
    };

    const addReport = (report) => {
        setReports(prev => [report, ...prev]);
    };

    const value = {
        volunteers,
        setVolunteers,
        addVolunteer,
        incidents,
        setIncidents,
        addIncident,
        reports,
        setReports,
        addReport
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
