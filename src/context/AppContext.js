import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [caregivers, setCaregivers] = useState([]);
    const [visitors, setVisitors] = useState([]);
    // Occupancy is simulated. Base is caregivers inside (assumed all are in) + visitors inside
    const [occupancy, setOccupancy] = useState(0);
    const [policyMode, setPolicyMode] = useState('DAY'); // 'DAY' or 'NIGHT'
    const [activityLogs, setActivityLogs] = useState([
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event: "System Initialized - SafeWard AI Active", type: "info" }
    ]);

    const addCaregiver = (caregiver) => {
        setCaregivers(prev => [...prev, caregiver]);
        setOccupancy(prev => prev + 1);
        addLog(`Caregiver Registered: ${caregiver.caregiverName}`, "success");
    };

    const addVisitor = (visitor) => {
        const newVisitor = {
            ...visitor,
            expiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
        }
        setVisitors(prev => [...prev, newVisitor]);
        setOccupancy(prev => prev + 1);
        addLog(`Visitor Approved: ${visitor.visitorName} (Expires 24hrs)`, "success");
    };

    const togglePolicyMode = () => {
        setPolicyMode(prev => {
            const newMode = prev === 'DAY' ? 'NIGHT' : 'DAY';
            addLog(`System Policy Switched to ${newMode} MODE`, "warning");
            return newMode;
        });
    };

    // Analytics State
    const [stats, setStats] = useState({
        entriesCaregiver: 0,
        entriesVisitor: 0,
        blockedAttempts: 0
    });

    const addLog = (event, type = "info") => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setActivityLogs(prev => [{ time, event, type }, ...prev]);
    };

    const simulateFaceScan = () => {
        if (occupancy >= 4) {
            addLog("Unauthorized Attempt - Room Full (Capacity 4/4)", "danger");
            setStats(prev => ({ ...prev, blockedAttempts: prev.blockedAttempts + 1 }));
            return "Unauthorized";
        }

        if (policyMode === 'NIGHT') {
            // Explicitly simulated attempt logic for Night Mode
            const simulationScannedType = Math.random() > 0.4 ? "Visitor" : "Caregiver";

            if (simulationScannedType === "Visitor") {
                // 🎯 EXPLICIT REQUEST IMPLEMENTED: Strict policy block for Visitors
                addLog("Visitor blocked due to Night Policy", "danger");
                setStats(prev => ({ ...prev, blockedAttempts: prev.blockedAttempts + 1 }));
                return "Unauthorized";
            } else {
                addLog("Caregiver Entry - Authorized (Night Mode)", "success");
                setStats(prev => ({ ...prev, entriesCaregiver: prev.entriesCaregiver + 1 }));
                setOccupancy(prev => prev + 1); // Realistically increase occupancy
                return "Authorized";
            }
        } else {
            // DAY MODE
            const isKnown = Math.random() > 0.2; // 80% chance recognized
            if (isKnown) {
                const type = Math.random() > 0.5 ? "Caregiver" : "Visitor";
                addLog(`${type} Entry - Authorized`, "success");
                setOccupancy(prev => prev + 1); // Realistically increase occupancy
                if (type === "Caregiver") setStats(prev => ({ ...prev, entriesCaregiver: prev.entriesCaregiver + 1 }));
                else setStats(prev => ({ ...prev, entriesVisitor: prev.entriesVisitor + 1 }));
                return "Authorized";
            } else {
                addLog("Unknown Person - Unauthorized Attempt", "danger");
                setStats(prev => ({ ...prev, blockedAttempts: prev.blockedAttempts + 1 }));
                return "Unauthorized";
            }
        }
    };

    const simulateExit = () => {
        if (occupancy <= 0) return false;

        const type = Math.random() > 0.5 ? "Caregiver" : "Visitor";
        addLog(`${type} Exited Facility`, "info");
        setOccupancy(prev => prev - 1);
        return true;
    };

    return (
        <AppContext.Provider value={{
            caregivers,
            visitors,
            occupancy,
            policyMode,
            activityLogs,
            stats,
            addCaregiver,
            addVisitor,
            togglePolicyMode,
            simulateFaceScan,
            simulateExit
        }}>
            {children}
        </AppContext.Provider>
    );
};
