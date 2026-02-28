import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AnalyticsPanel() {
    const { stats, activityLogs } = useContext(AppContext);

    // Prepare data for Pie Chart (Entry Distribution)
    const pieData = [
        { name: 'Caregivers', value: stats.entriesCaregiver },
        { name: 'Visitors', value: stats.entriesVisitor },
        { name: 'Blocked', value: stats.blockedAttempts }
    ];

    const COLORS = ['#3b82f6', '#10b981', '#ef4444'];

    // Prepare simple time-series data for Blocked Attempts Bar Chart
    // We'll group the last few blocked activity logs by a simple index to show a trend.
    // In a real app this would group by hours/days.
    const blockedLogs = activityLogs
        .filter(log => log.type === 'danger')
        .slice(0, 5) // take last 5 blocked attempts
        .reverse() // chronological
        .map((log, index) => ({
            time: log.time,
            attempts: 1 // representing a blocked incident at that time
        }));

    // Ensure we have some base structure even if no blocks yet
    const barData = blockedLogs.length > 0 ? blockedLogs : [
        { time: 'System Start', attempts: 0 }
    ];

    return (
        <div className="row g-4 mt-2 mb-5 animate-slide-up delay-200">
            <div className="col-lg-12">
                <div className="d-flex align-items-center mb-3">
                    <h4 className="brand-font m-0" style={{ color: 'var(--text-main)' }}>
                        <i className="bi bi-graph-up-arrow text-secondary me-2"></i>
                        Security Intelligence
                    </h4>
                    <span className="badge bg-danger ms-3"><i className="bi bi-shield-lock me-1"></i> ENTERPRISE SUITE</span>
                </div>
            </div>

            {/* Entry Distribution Pie Chart */}
            <div className="col-md-6">
                <div className="glass-card p-4 h-100 d-flex flex-column" style={{ borderTop: '4px solid var(--secondary)' }}>
                    <div className="mb-4 d-flex justify-content-between">
                        <div>
                            <h5 className="fw-bold m-0" style={{ color: 'var(--text-main)' }}>Terminal Authorization Breakdown</h5>
                            <p className="small mb-0 mt-1" style={{ color: 'var(--text-muted)' }}>Distribution of all system scans</p>
                        </div>
                        <i className="bi bi-pie-chart-fill fs-2" style={{ color: 'rgba(59, 130, 246, 0.2)' }}></i>
                    </div>

                    <div style={{ width: '100%', height: 250 }} className="mt-auto">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-main)' }}
                                    itemStyle={{ color: 'var(--text-main)', fontWeight: 'bold' }}
                                />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Blocked Attempts Timeline */}
            <div className="col-md-6">
                <div className="glass-card p-4 h-100 d-flex flex-column" style={{ borderTop: '4px solid var(--danger)' }}>
                    <div className="mb-4 d-flex justify-content-between">
                        <div>
                            <h5 className="fw-bold m-0" style={{ color: 'var(--text-main)' }}>Unauthorized Access Defense Trajectory</h5>
                            <p className="small mb-0 mt-1" style={{ color: 'var(--text-muted)' }}>Chronological view of blocked attempts</p>
                        </div>
                        <i className="bi bi-bar-chart-fill fs-2" style={{ color: 'rgba(239, 68, 68, 0.2)' }}></i>
                    </div>

                    <div style={{ width: '100%', height: 250 }} className="mt-auto">
                        <ResponsiveContainer>
                            <BarChart data={barData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100,100,100,0.2)" />
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(239, 68, 68, 0.1)' }}
                                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-main)' }}
                                />
                                <Bar
                                    dataKey="attempts"
                                    name="Blocked Entries"
                                    fill="var(--danger)"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                    animationDuration={1500}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AnalyticsPanel;
