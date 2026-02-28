import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <div className="container mt-5 py-5 animate-slide-up">
            <div className="row justify-content-center">
                <div className="col-md-5 col-lg-4">
                    <div className="text-center mb-5">
                        <div className="d-inline-block p-3 rounded-circle" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--secondary)' }}>
                            <i className="bi bi-shield-check" style={{ fontSize: '3rem' }}></i>
                        </div>
                        <h2 className="mt-3 brand-font mb-2">Welcome Back</h2>
                        <p className="text-muted">Enter your credentials to access the SafeWard Terminal.</p>
                    </div>

                    <div className="glass-card p-4 p-md-5">
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-muted small text-uppercase tracking-wide">Staff Email</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 text-muted">
                                        <i className="bi bi-envelope"></i>
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control premium-input border-start-0 ps-0"
                                        placeholder="name@hospital.org"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="form-label fw-semibold text-muted small text-uppercase tracking-wide d-flex justify-content-between">
                                    Password
                                    <a href="#" className="text-primary text-decoration-none text-capitalize">Forgot?</a>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 text-muted">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control premium-input border-start-0 ps-0"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-premium w-100 py-3 d-flex justify-content-center align-items-center">
                                <span>Secure Login</span>
                                <i className="bi bi-arrow-right ms-2 mt-1"></i>
                            </button>
                        </form>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-muted small">
                            <i className="bi bi-lock-fill me-1"></i> End-to-end encrypted connection
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
