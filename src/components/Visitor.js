import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function Visitor() {
    const { addVisitor } = useContext(AppContext);
    const [formData, setFormData] = useState({
        visitorName: "",
        relationship: "",
        image: null,
    });
    const [approved, setApproved] = useState(false);

    const handleApprove = (e) => {
        e.preventDefault();
        addVisitor({
            visitorName: formData.visitorName,
            relationship: formData.relationship,
            approvedAt: new Date().toISOString()
        });
        setApproved(true);
    };

    const handleNewPass = () => {
        setApproved(false);
        setFormData({ visitorName: "", relationship: "", image: null });
    };

    return (
        <div className="container mt-5 py-4 animate-slide-up delay-100">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">

                    <div className="text-center mb-4">
                        <h2 className="brand-font">Temporary <span className="text-secondary">Visitor Pass</span></h2>
                        <p className="text-muted">Issue a time-limited clearance for hospital visitors.</p>
                    </div>

                    <div className={`glass-card p-4 p-md-5 transition-all ${approved ? 'border-success' : ''}`} style={{ boxShadow: approved ? '0 0 0 2px rgba(16, 185, 129, 0.2), var(--shadow-md)' : '' }}>
                        {!approved ? (
                            <form onSubmit={handleApprove}>
                                <div className="alert alert-primary bg-primary bg-opacity-10 border-0 d-flex align-items-center p-3 mb-4 rounded-3 text-primary">
                                    <i className="bi bi-clock-history fs-4 me-3"></i>
                                    <div>
                                        <h6 className="mb-0 fw-bold">24-Hour Pass</h6>
                                        <small>Visitor access auto-expires after 24 hours.</small>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold text-muted small text-uppercase tracking-wide">Visitor Full Name</label>
                                    <input type="text" className="form-control premium-input" placeholder="Enter Full Name" required onChange={e => setFormData({ ...formData, visitorName: e.target.value })} />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold text-muted small text-uppercase tracking-wide">Relationship to Patient</label>
                                    <input type="text" className="form-control premium-input" placeholder="e.g. Brother, Friend" required onChange={e => setFormData({ ...formData, relationship: e.target.value })} />
                                </div>

                                <div className="mb-5 bg-light p-4 rounded-3 border bg-opacity-50">
                                    <label className="form-label fw-semibold text-main mb-3 d-flex align-items-center">
                                        <i className="bi bi-person-bounding-box me-2 fs-5 text-secondary"></i>
                                        Visitor Face Capture
                                    </label>
                                    <input type="file" className="form-control" accept="image/*" required onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />
                                </div>

                                <button type="submit" className="btn btn-premium-success w-100 py-3 d-flex justify-content-center align-items-center fs-5 transition-all outline-none">
                                    <i className="bi bi-check2-circle me-2"></i> Authorize Visitor Clearance
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-4 animate-slide-up">
                                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 mb-4" style={{ width: '80px', height: '80px' }}>
                                    <i className="bi bi-shield-check text-success" style={{ fontSize: '3rem' }}></i>
                                </div>
                                <h3 className="brand-font text-success mb-3">Clearance Confirmed</h3>

                                <div className="card border-0 bg-light rounded-4 p-4 text-start mb-4 mx-auto" style={{ maxWidth: '400px' }}>
                                    <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                                        <span className="text-muted small">VISITOR IDENTITY</span>
                                        <span className="fw-bold fs-5">{formData.visitorName || "Guest"}</span>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                                        <span className="text-muted small">ASSOCIATION</span>
                                        <span className="fw-bold">{formData.relationship || "N/A"}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-muted small d-flex align-items-center"><i className="bi bi-hourglass-split me-1"></i> STATUS</span>
                                        <span className="badge bg-danger rounded-pill px-3 py-2 animate-pulse">⏳ Expires in 24h</span>
                                    </div>
                                </div>

                                <button onClick={handleNewPass} className="btn btn-outline-secondary px-4 py-2 rounded-pill shadow-sm hover-bg-light transition-all">
                                    <i className="bi bi-arrow-counterclockwise me-2"></i> Issue Additional Clearance
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Visitor;
