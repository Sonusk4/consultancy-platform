import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './LandingPage.css'

function LandingPage() {
    const categories = [
        {
            id: 1,
            title: 'Law',
            icon: '⚖️',
            description: 'Expert legal consultants for all your legal needs',
            consultants: '500+',
            color: '#667eea'
        },
        {
            id: 2,
            title: 'Finance',
            icon: '💰',
            description: 'Financial advisors to help grow your wealth',
            consultants: '750+',
            color: '#764ba2'
        },
        {
            id: 3,
            title: 'Career',
            icon: '🎯',
            description: 'Career coaches to guide your professional journey',
            consultants: '600+',
            color: '#f093fb'
        },
        {
            id: 4,
            title: 'Health',
            icon: '🏥',
            description: 'Health professionals and wellness experts',
            consultants: '450+',
            color: '#f87171'
        },
        {
            id: 5,
            title: 'Technology',
            icon: '💻',
            description: 'Tech specialists and IT consultants',
            consultants: '820+',
            color: '#3b82f6'
        },
        {
            id: 6,
            title: 'Marketing',
            icon: '📱',
            description: 'Marketing strategists and digital experts',
            consultants: '580+',
            color: '#10b981'
        },
        {
            id: 7,
            title: 'Education',
            icon: '📚',
            description: 'Academic advisors and learning specialists',
            consultants: '420+',
            color: '#f59e0b'
        },
        {
            id: 8,
            title: 'Real Estate',
            icon: '🏠',
            description: 'Property experts and real estate advisors',
            consultants: '380+',
            color: '#ec4899'
        },
        {
            id: 9,
            title: 'HR & Management',
            icon: '👥',
            description: 'HR professionals and business managers',
            consultants: '540+',
            color: '#06b6d4'
        }
    ]

    return (
        <div className="landing-page">
            <Header />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="hero-orb orb-1"></div>
                    <div className="hero-orb orb-2"></div>
                    <div className="hero-orb orb-3"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge animate-fade-in">
                            <span className="badge">🚀 Trusted by 10,000+ professionals</span>
                        </div>

                        <h1 className="hero-title animate-fade-in-up">
                            Connect with Expert
                            <br />
                            <span className="text-gradient">Consultants Worldwide</span>
                        </h1>

                        <p className="hero-description animate-fade-in-up">
                            Get personalized guidance from top professionals in Law, Finance, and Career.
                            Book sessions instantly and transform your future.
                        </p>

                        <div className="hero-cta animate-fade-in-up">
                            <Link to="/consultants" className="btn btn-primary btn-large">
                                <span>Find Your Consultant</span>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link to="/consultant-profile" className="btn btn-secondary btn-large">
                                Become a Consultant
                            </Link>
                        </div>

                        <div className="hero-stats animate-fade-in">
                            <div className="stat-item">
                                <div className="stat-number">10K+</div>
                                <div className="stat-label">Active Users</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">1,850+</div>
                                <div className="stat-label">Expert Consultants</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">50K+</div>
                                <div className="stat-label">Sessions Completed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Section */}
            <section className="category-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="heading-2">Explore by Category</h2>
                        <p className="section-description">
                            Find the perfect consultant for your specific needs
                        </p>
                    </div>

                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                className="category-card card-interactive"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="category-icon" style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` }}>
                                    {category.icon}
                                </div>
                                <h3 className="category-title">{category.title}</h3>
                                <p className="category-description">{category.description}</p>
                                <div className="category-meta">
                                    <span className="consultant-count">{category.consultants} Consultants</span>
                                    <Link to={`/consultants?domain=${category.title.toLowerCase()}`} className="category-link">
                                        Explore
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="heading-2">Why Choose ConsultHub?</h2>
                        <p className="section-description">
                            The most trusted platform for professional consultation
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card card">
                            <div className="feature-icon">⚡</div>
                            <h3 className="feature-title">Instant Booking</h3>
                            <p className="feature-description">
                                Book sessions with consultants instantly. No waiting, no hassle.
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">🔒</div>
                            <h3 className="feature-title">Secure & Private</h3>
                            <p className="feature-description">
                                Your data is encrypted and protected with industry-leading security.
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">⭐</div>
                            <h3 className="feature-title">Verified Experts</h3>
                            <p className="feature-description">
                                All consultants are thoroughly vetted and verified professionals.
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">💳</div>
                            <h3 className="feature-title">Flexible Credits</h3>
                            <p className="feature-description">
                                Purchase credits and use them anytime. No subscriptions required.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card glass">
                        <h2 className="cta-title">Ready to Get Started?</h2>
                        <p className="cta-description">
                            Join thousands of professionals who trust ConsultHub for expert guidance
                        </p>
                        <div className="cta-buttons">
                            <Link to="/signup" className="btn btn-primary btn-large">
                                Create Free Account
                            </Link>
                            <Link to="/consultants" className="btn btn-outline btn-large">
                                Browse Consultants
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default LandingPage
