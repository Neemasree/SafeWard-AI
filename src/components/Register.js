import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function Register() {
    const { addCaregiver } = useContext(AppContext);
    const [formData, setFormData] = useState({
        patientName: "",
        roomNumber: "",
        caregiverName: "",
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addCaregiver({
            patientName: formData.patientName,
            roomNumber: formData.roomNumber,
            caregiverName: formData.caregiverName,
            registeredAt: new Date().toISOString()
        });
        // Visual feedback handled by bootstrap alert instead of browser alert
        const formEl = e.target;
        const btn = formEl.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Registered Successfully';
        btn.classList.add('btn-premium-success');
        btn.classList.remove('btn-premium');

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.add('btn-premium');
            btn.classList.remove('btn-premium-success');
            setFormData({ patientName: "", roomNumber: "", caregiverName: "", image: null });
            formEl.reset();
        }, 2500);
    };

    return (
        <div className="container mt-5 py-4 animate-slide-up delay-100">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="text-center mb-4">
                        <h2 className="brand-font">Patient & Caregiver <span className="text-primary">Registry</span></h2>
                        <p className="text-muted">Register a primary caregiver for a patient room.</p>
                    </div>

                    <div className="glass-card p-4 p-md-5 position-relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="position-absolute top-0 end-0 p-3 opacity-10 pointer-events-none">
                            <i className="bi bi-hospital" style={{ fontSize: '10rem' }}></i>
                        </div>

                        <form onSubmit={handleSubmit} className="position-relative z-1">
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-muted small text-uppercase tracking-wide"><i className="bi bi-person me-1"></i> Patient Name</label>
                                    <input type="text" className="form-control premium-input" placeholder="John Doe" required onChange={e => setFormData({ ...formData, patientName: e.target.value })} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-muted small text-uppercase tracking-wide"><i className="bi bi-door-open me-1"></i> Room Number</label>
                                    <input type="text" className="form-control premium-input" placeholder="e.g. 402A" required onChange={e => setFormData({ ...formData, roomNumber: e.target.value })} />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-muted small text-uppercase tracking-wide"><i className="bi bi-person-badge me-1"></i> Primary Caregiver Name</label>
                                <input type="text" className="form-control premium-input" placeholder="Jane Doe" required onChange={e => setFormData({ ...formData, caregiverName: e.target.value })} />
                            </div>

                            <div className="mb-5 bg-light p-4 rounded-3 border bg-opacity-50">
                                <label className="form-label fw-semibold text-main mb-3 d-flex align-items-center">
                                    <i className="bi bi-camera me-2 fs-5 text-primary"></i>
                                    Caregiver Face Biometrics
                                </label>
                                <input type="file" className="form-control" accept="image/*" required onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />
                                <div className="form-text mt-2 small"><i className="bi bi-info-circle me-1"></i> Image will be encrypted and used for terminal verification via SafeWard AI.</div>
                            </div>

                            <button type="submit" className="btn btn-premium w-100 py-3 d-flex justify-content-center align-items-center fs-5 transition-all">
                                <i className="bi bi-shield-lock me-2"></i> Register Caregiver Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
