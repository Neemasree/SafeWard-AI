import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import AnalyticsPanel from "./AnalyticsPanel";

function Dashboard() {
    const {
        caregivers,
        visitors,
        occupancy,
        policyMode,
        togglePolicyMode,
        activityLogs,
        simulateFaceScan,
        simulateExit
    } = useContext(AppContext);

    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    // Apply dark theme to body when dashboard mounts for that "Control Center" feel
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        return () => document.documentElement.removeAttribute('data-theme');
    }, []);

    const handleSimulateScan = () => {
        setIsScanning(true);
        setScanResult(null);

        // Fake a loading delay for the "AI Processing" effect
        setTimeout(() => {
            const result = simulateFaceScan();
            setScanResult(result);
            setIsScanning(false);

            // Auto clear after 4 seconds
            setTimeout(() => {
                setScanResult(null);
            }, 4000);
        }, 1200);
    };

    return (
        <div className="container-fluid px-4 py-4 animate-slide-up" style={{ maxWidth: '1400px' }}>

            {/* Dashboard Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 border-bottom border-secondary pb-4">
                <div>
                    <h2 className="brand-font m-0 d-flex align-items-center" style={{ color: 'var(--text-main)' }}>
                        <i className="bi bi-shield-lock-fill text-primary me-3 fs-1"></i>
                        Command Center
                    </h2>
                    <p className="mt-1 mb-0 fs-5" style={{ color: 'var(--text-muted)' }}>Real-time room analytics & security feed</p>
                </div>

                <div className="mt-4 mt-md-0 glass-card p-2 px-3 d-flex align-items-center" style={{ background: 'rgba(30,30,40,0.6)' }}>
                    <span className="me-3 fw-bold small text-uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}><i className="bi bi-gear-fill me-1"></i> Policy Engine</span>

                    <span className={`badge rounded-pill ${policyMode === 'DAY' ? 'bg-primary text-white shadow-sm' : 'bg-transparent'} px-3 py-2 transition-all`} style={{ color: policyMode === 'DAY' ? '#fff' : 'var(--text-muted)' }}>DAY</span>

                    <div className="form-check form-switch fs-4 mx-2 m-0 d-flex align-items-center" style={{ height: '30px' }}>
                        <input
                            className="form-check-input m-0 cursor-pointer shadow-none"
                            type="checkbox"
                            role="switch"
                            checked={policyMode === 'NIGHT'}
                            onChange={togglePolicyMode}
                            style={{ borderColor: policyMode === 'NIGHT' ? 'var(--secondary)' : 'var(--text-muted)' }}
                        />
                    </div>

                    <span className={`badge rounded-pill ${policyMode === 'NIGHT' ? 'bg-danger text-white shadow-sm' : 'bg-transparent'} px-3 py-2 transition-all`} style={{ color: policyMode === 'NIGHT' ? '#fff' : 'var(--text-muted)' }}>NIGHT</span>
                </div>
            </div>

            {/* Top Metrics Row */}
            <div className="row g-4 mb-5 delay-100 animate-slide-up">
                <div className="col-md-4">
                    <div className="glass-card p-4 h-100 d-flex flex-column position-relative overflow-hidden" style={{ borderLeft: '4px solid var(--primary)' }}>
                        {occupancy >= 4 && <div className="position-absolute top-0 end-0 m-3 pulse-danger rounded-circle bg-danger" style={{ width: '12px', height: '12px' }}></div>}

                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <p className="fw-bold small text-uppercase m-0" style={{ color: 'var(--text-muted)' }}>Live Occupancy</p>
                            <i className="bi bi-people-fill text-primary fs-4 opacity-50"></i>
                        </div>

                        <h2 className={`fw-bold display-4 mb-0 brand-font ${occupancy >= 4 ? 'text-danger' : ''}`} style={{ color: occupancy < 4 ? 'var(--text-main)' : '' }}>
                            {occupancy}<span className="fs-3" style={{ color: 'var(--text-muted)' }}>/4</span>
                        </h2>

                        <div className="mt-auto pt-4">
                            <div className="d-flex justify-content-between small mb-2" style={{ color: 'var(--text-muted)' }}>
                                <span>Capacity Status</span>
                                <span>{occupancy === 4 ? 'FULL' : `${Math.round((occupancy / 4) * 100)}%`}</span>
                            </div>
                            <div className="progress bg-dark" style={{ height: '6px' }}>
                                <div
                                    className={`progress-bar progress-bar-animated-custom ${occupancy >= 4 ? 'bg-danger' : 'bg-primary'}`}
                                    role="progressbar"
                                    style={{ width: `${(occupancy / 4) * 100}%` }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="glass-card p-4 h-100 d-flex flex-column" style={{ borderLeft: '4px solid var(--accent)' }}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <p className="fw-bold small text-uppercase m-0" style={{ color: 'var(--text-muted)' }}>Active Caregivers</p>
                            <i className="bi bi-person-badge-fill text-accent fs-4 opacity-50"></i>
                        </div>
                        <h2 className="fw-bold display-4 mb-0 brand-font" style={{ color: 'var(--text-main)' }}>{caregivers.length}</h2>
                        <p className="mt-auto mb-0 pt-4" style={{ color: 'var(--text-muted)' }}><i className="bi bi-check-circle-fill text-accent me-1"></i> Fully authorized personnel</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="glass-card p-4 h-100 d-flex flex-column" style={{ borderLeft: '4px solid var(--secondary)' }}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <p className="fw-bold small text-uppercase m-0" style={{ color: 'var(--text-muted)' }}>Approved Visitors</p>
                            <i className="bi bi-person-lines-fill text-secondary fs-4 opacity-50"></i>
                        </div>
                        <h2 className="fw-bold display-4 mb-0 brand-font" style={{ color: 'var(--text-main)' }}>{visitors.length}</h2>
                        <p className="mt-auto mb-0 pt-4" style={{ color: 'var(--text-muted)' }}><i className="bi bi-clock-history text-secondary me-1"></i> 24-hr constrained access</p>
                    </div>
                </div>
            </div>

            <div className="row g-4 delay-200 animate-slide-up">
                {/* Core AI Terminal */}
                <div className="col-lg-6">
                    <div className="glass-card p-0 d-flex flex-column h-100 overflow-hidden" style={{ border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                        <div className="bg-dark bg-opacity-50 p-3 border-bottom border-secondary d-flex justify-content-between align-items-center">
                            <h5 className="m-0 fw-bold d-flex align-items-center brand-font">
                                <i className="bi bi-robot text-primary me-2"></i> SafeWard Core AI
                            </h5>
                            <span className="badge bg-primary bg-opacity-25 text-primary border border-primary px-2"><i className="bi bi-wifi me-1"></i> ONLINE</span>
                        </div>

                        <div className="p-4 p-md-5 d-flex flex-column flex-grow-1 align-items-center justify-content-center text-center">

                            <div className="position-relative mb-5">
                                <div className={`rounded-circle d-flex align-items-center justify-content-center border border-2 ${isScanning ? 'border-primary pulse-danger' : scanResult === 'Authorized' ? 'border-success' : scanResult === 'Unauthorized' ? 'border-danger' : 'border-secondary'}`} style={{ width: '140px', height: '140px', background: 'rgba(0,0,0,0.2)' }}>
                                    {isScanning ? (
                                        <i className="bi bi-upc-scan fs-1 text-primary animate-pulse"></i>
                                    ) : scanResult === 'Authorized' ? (
                                        <i className="bi bi-check-lg fs-1 text-success"></i>
                                    ) : scanResult === 'Unauthorized' ? (
                                        <i className="bi bi-x-lg fs-1 text-danger"></i>
                                    ) : (
                                        <i className="bi bi-person-bounding-box fs-1 text-secondary"></i>
                                    )}
                                </div>
                                {isScanning && (
                                    <div className="position-absolute top-50 start-50 translate-middle w-100" style={{ height: '2px', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)', animation: 'scanCode 1.5s infinite linear' }}></div>
                                )}
                            </div>

                            <h4 className="mb-2 brand-font">Security Interface Terminal</h4>
                            <p className="text-muted mb-4 small" style={{ maxWidth: '350px' }}>Initiate biometric verification to validate entry against active room safety protocols and occupancy thresholds.</p>

                            <button
                                onClick={handleSimulateScan}
                                disabled={isScanning}
                                className={`btn btn-premium btn-lg w-100 fs-5 py-3 ${policyMode === 'NIGHT' ? 'btn-danger bg-danger' : ''} text-white shadow-lg`}
                                style={{ maxWidth: '350px', background: policyMode === 'NIGHT' ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' : '' }}
                            >
                                {isScanning ? (
                                    <span><span className="spinner-border spinner-border-sm me-2"></span> Analyzing Biometrics...</span>
                                ) : (
                                    <span><i className="bi bi-camera-video-fill me-2"></i> Initiate Biometric Scan</span>
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    simulateExit();
                                    setScanResult(null);
                                }}
                                disabled={isScanning || occupancy === 0}
                                className={`btn btn-outline-secondary w-100 mt-3 py-2 fw-bold text-uppercase`}
                                style={{ maxWidth: '350px', letterSpacing: '2px' }}
                            >
                                <i className="bi bi-box-arrow-right me-2"></i> Log Departure Event
                            </button>

                            {/* Result Overlay */}
                            {scanResult && !isScanning && (
                                <div className={`alert ${scanResult === 'Authorized' ? 'alert-success border-success' : 'alert-danger border-danger'} mt-4 w-100 mb-0 fade show animate-slide-up d-flex align-items-center`} style={{ maxWidth: '350px', background: scanResult === 'Authorized' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}>
                                    <i className={`fs-3 me-3 ${scanResult === 'Authorized' ? 'bi bi-unlock-fill text-success' : 'bi bi-lock-fill text-danger'}`}></i>
                                    <div className="text-start">
                                        <h6 className={`fw-bold mb-0 ${scanResult === 'Authorized' ? 'text-success' : 'text-danger'}`}>{scanResult === 'Authorized' ? 'IDENTITY VERIFIED: ACCESS GRANTED' : 'ACCESS DENIED: SECURITY VIOLATION'}</h6>
                                        <small className={scanResult === 'Authorized' ? 'text-success' : 'text-danger'}>Terminal Locking Mechanism Released</small>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Live Event Stream */}
                <div className="col-lg-6">
                    <div className="glass-card p-0 d-flex flex-column h-100 overflow-hidden">
                        <div className="bg-dark bg-opacity-50 p-3 border-bottom border-secondary d-flex justify-content-between align-items-center">
                            <h5 className="m-0 fw-bold d-flex align-items-center brand-font" style={{ color: 'var(--text-main)' }}>
                                <i className="bi bi-activity text-accent me-2"></i> Security Event Stream
                            </h5>
                            <span className="badge bg-secondary px-2"><i className="bi bi-database me-1"></i> Live Logs</span>
                        </div>

                        <div className="p-0 flex-grow-1" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            {activityLogs.length === 0 ? (
                                <div className="p-5 text-center text-muted">No activity recorded yet in this session.</div>
                            ) : (
                                <div className="list-group list-group-flush border-0">
                                    {activityLogs.map((log, index) => (
                                        <div key={index} className={`list-group-item bg-transparent border-bottom border-dark p-3 px-4 d-flex align-items-start ${index === 0 ? 'bg-primary bg-opacity-10' : ''} transition-all`}>
                                            <div className="mt-1 me-3">
                                                {log.type === 'danger' && <i className="bi bi-exclamation-triangle-fill text-danger fs-5"></i>}
                                                {log.type === 'success' && <i className="bi bi-check-circle-fill text-success fs-5"></i>}
                                                {log.type === 'warning' && <i className="bi bi-shield-exclamation text-warning fs-5"></i>}
                                                {log.type === 'info' && <i className="bi bi-info-circle-fill text-primary fs-5"></i>}
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <span className={`fw-bold small text-uppercase tracking-wide text-${log.type}`}>{log.type === 'danger' ? 'SECURITY ALERT' : log.type.toUpperCase()}</span>
                                                    <span className="badge font-monospace opacity-75" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}>{log.time}</span>
                                                </div>
                                                <p className="m-0 text-white" style={{ fontSize: '0.95rem', color: 'var(--text-main) !important' }}>{log.event}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AnalyticsPanel />

        </div>
    );
}

export default Dashboard;
