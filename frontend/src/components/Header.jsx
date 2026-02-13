import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <header className="header glass">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <span className="logo-icon">💼</span>
                        <span className="logo-text">ConsultHub</span>
                    </Link>

                    <nav className="nav">
                        <Link to="/consultants" className="nav-link">
                            Find Consultants
                        </Link>
                        <Link to="/consultant-profile" className="nav-link">
                            Become Consultant
                        </Link>
                        <div className="nav-divider"></div>
                        <Link to="/login" className="btn btn-secondary">
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-primary">
                            Sign Up
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
