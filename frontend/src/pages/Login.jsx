import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import OTPVerification from './OTPVerification'
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState('login') // 'login' or 'verify-email'
    const [firebaseUser, setFirebaseUser] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Firebase login
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
            const user = userCredential.user
            const token = await user.getIdToken()

            // Get user details from backend
            const response = await fetch('http://localhost:5000/auth/me', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const userData = await response.json()

            // Check if email is verified
            if (!userData.is_verified) {
                // If not verified, show OTP verification screen
                setFirebaseUser(user)
                setStep('verify-email')
            } else {
                // Email is verified, login successful
                console.log("Logged in user:", userData)
                
                // Check if user is a consultant with a profile
                try {
                    const consultantRes = await fetch('http://localhost:5000/consultant/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    
                    if (consultantRes.ok) {
                        navigate('/consultant-profile')
                    } else {
                        if (userData.role === 'CONSULTANT') {
                            navigate('/consultant-profile')
                        } else {
                            navigate('/consultants')
                        }
                    }
                } catch (error) {
                    navigate('/consultants')
                }
                
                // Reset form
                setFormData({ email: '', password: '' })
            }
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleVerificationSuccess = async () => {
        try {
            const token = await firebaseUser.getIdToken()
            const response = await fetch('http://localhost:5000/auth/me', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const userData = await response.json()
            console.log("User verified and logged in:", userData)
            
            // Check if user is a consultant with a profile
            try {
                const consultantRes = await fetch('http://localhost:5000/consultant/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                
                if (consultantRes.ok) {
                    navigate('/consultant-profile')
                } else {
                    if (userData.role === 'CONSULTANT') {
                        navigate('/consultant-profile')
                    } else {
                        navigate('/consultants')
                    }
                }
            } catch (error) {
                navigate('/consultants')
            }
            
            setStep('login')
            setFormData({ email: '', password: '' })
            setFirebaseUser(null)
        } catch (error) {
            setError('Failed to complete login: ' + error.message)
        }
    }

    // OTP Verification Step
    if (step === 'verify-email' && firebaseUser) {
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

                        <button
                            onClick={() => {
                                setStep('login')
                                setFirebaseUser(null)
                                setError('')
                            }}
                            className="btn btn-outline btn-large"
                            style={{ width: '100%', marginTop: '1.5rem' }}
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Login Step
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
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Login to your account to continue</p>

                    <form className="auth-form" onSubmit={handleSubmit}>
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

                        <div className="form-footer">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="link">Forgot password?</Link>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button 
                            type="submit" 
                            className="btn btn-primary btn-large" 
                            style={{ width: '100%' }}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/signup" className="link">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
