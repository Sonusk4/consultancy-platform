import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import OTPVerification from './OTPVerification'
import './Login.css'

function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: 'USER'
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState('signup') // 'signup' or 'otp-verification'
    const [firebaseUser, setFirebaseUser] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'phone') {
            // Only allow digits
            setFormData({
                ...formData,
                [name]: value.replace(/\D/g, '').slice(0, 10)
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)

        try {
            // 1. Create Firebase user
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                formData.email, 
                formData.password
            )
            const user = userCredential.user
            
            setFirebaseUser(user)

            // 2. Send OTP to email
            const otpResponse = await fetch('http://localhost:5000/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            })

            if (!otpResponse.ok) {
                throw new Error('Failed to send OTP')
            }

            // 3. Move to OTP verification step
            setStep('otp-verification')
        } catch (error) {
            setError(error.message || 'Signup failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleVerificationSuccess = async () => {
        try {
            // After OTP verification, get Firebase token and sync with backend
            const token = await firebaseUser.getIdToken()

            const response = await fetch('http://localhost:5000/auth/me', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    role: formData.role,
                    phone: formData.phone || null,
                    name: formData.name
                })
            })

            const data = await response.json()
            console.log("User created:", data)
            
            // Redirect based on role
            if (formData.role === 'CONSULTANT') {
                navigate('/consultant-profile')
            } else {
                navigate('/consultants')
            }
            
            // Reset form
            setStep('signup')
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                role: 'USER'
            })
            setFirebaseUser(null)
        } catch (error) {
            setError('Failed to complete signup: ' + error.message)
        }
    }

    // OTP Verification Step
    if (step === 'otp-verification' && firebaseUser) {
        return (
            <div className="auth-page">
                <div className="auth-background">
                    <div className="auth-orb orb-1"></div>
                    <div className="auth-orb orb-2"></div>
                </div>

                <div className="auth-container">
                    <Link to="/" className="auth-logo">
                        <span className="logo-icon">💼</span>
                        <span className="logo-text">ConsultHub</span>
                    </Link>

                    <div className="auth-card card glass">
                        <h1 className="auth-title">Verify Email</h1>
                        <p className="auth-subtitle">We've sent an OTP to {firebaseUser.email}</p>

                        <div style={{ marginTop: '2rem' }}>
                            <OTPVerification 
                                email={firebaseUser.email}
                                onVerificationSuccess={handleVerificationSuccess}
                            />
                        </div>

                        {formData.phone && (
                            <div style={{
                                marginTop: '2rem',
                                padding: '1rem',
                                background: 'rgba(37, 99, 235, 0.1)',
                                border: '1px solid rgba(37, 99, 235, 0.2)',
                                borderRadius: '8px'
                            }}>
                                <p style={{ fontSize: '0.875rem', color: '#cbd5e1', margin: '0.5rem 0' }}>
                                    📧 Email: {firebaseUser?.email}
                                </p>
                                <p style={{ fontSize: '0.875rem', color: '#cbd5e1', margin: '0.5rem 0' }}>
                                    👤 Role: {formData.role === 'CONSULTANT' ? 'Consultant' : 'Client'}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setStep('signup')
                                setFirebaseUser(null)
                                setError('')
                            }}
                            className="btn btn-outline btn-large"
                            style={{ width: '100%', marginTop: '1.5rem' }}
                        >
                            Back to Signup
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Signup Step
    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-orb orb-1"></div>
                <div className="auth-orb orb-2"></div>
            </div>

            <div className="auth-container">
                <Link to="/" className="auth-logo">
                    <span className="logo-icon">💼</span>
                    <span className="logo-text">ConsultHub</span>
                </Link>

                <div className="auth-card card glass">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Sign up to get started with ConsultHub</p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone (Optional)</label>
                            <input
                                type="tel"
                                name="phone"
                                className="input"
                                placeholder="1234567890"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength="10"
                            />
                            {formData.phone && formData.phone.length < 10 && (
                                <small style={{ color: '#fca5a5', marginTop: '0.25rem' }}>
                                    Enter 10-digit phone number
                                </small>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">I am a</label>
                            <select
                                name="role"
                                className="input"
                                value={formData.role}
                                onChange={handleChange}
                                style={{ cursor: 'pointer' }}
                            >
                                <option value="USER">Client</option>
                                <option value="CONSULTANT">Consultant</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="input"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button 
                            type="submit" 
                            className="btn btn-primary btn-large" 
                            style={{ width: '100%' }}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
