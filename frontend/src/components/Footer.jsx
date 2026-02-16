import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo">
                            <span className="logo-icon">💼</span>
                            <span className="logo-text">ConsultHub</span>
                        </div>
                        <p className="footer-tagline">
                            Connecting you with expert consultants worldwide
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4 className="footer-title">Company</h4>
                            <Link to="/" className="footer-link">Home</Link>
                            <Link to="/consultants" className="footer-link">Find Consultants</Link>
                            <Link to="/contact" className="footer-link">Contact</Link>
                        </div>

                        <div className="footer-column">
                            <h4 className="footer-title">Legal</h4>
                            <a href="#" className="footer-link">Privacy</a>
                            <a href="#" className="footer-link">Terms</a>
                            <a href="#" className="footer-link">Cookies</a>
                        </div>

                        <div className="footer-column">
                            <h4 className="footer-title">Support</h4>
                            <a href="#" className="footer-link">Help Center</a>
                            <a href="#" className="footer-link">FAQ</a>
                            <a href="#" className="footer-link">Community</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © 2026 ConsultHub. All rights reserved.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link" aria-label="Twitter">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                        </a>
                        <a href="#" className="social-link" aria-label="LinkedIn">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                        <a href="#" className="social-link" aria-label="GitHub">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
