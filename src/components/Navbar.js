import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "text-primary fw-bold border-bottom border-primary border-2" : "text-secondary";
    };

    return (
        <nav className="navbar navbar-expand-lg premium-navbar sticky-top py-3">
            <div className="container">
                <Link className="navbar-brand brand-font d-flex align-items-center" to="/" style={{ color: 'var(--text-main)', fontSize: '1.5rem' }}>
                    <i className="bi bi-shield-lock-fill text-primary me-2 fs-3"></i>
                    SafeWard<span className="text-primary">AI</span>
                </Link>
                <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <i className="bi bi-list fs-2 text-primary"></i>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center gap-2">
                        <li className="nav-item">
                            <Link className={`nav-link px-3 transition-all ${isActive('/')}`} to="/"><i className="bi bi-box-arrow-in-right me-1"></i> Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 transition-all ${isActive('/register')}`} to="/register"><i className="bi bi-person-plus me-1"></i> Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 transition-all ${isActive('/visitor')}`} to="/visitor"><i className="bi bi-person-badge me-1"></i> Visitor</Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <Link className="btn btn-premium btn-sm px-4 py-2" to="/dashboard">
                                <i className="bi bi-speedometer2 me-2"></i>Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
