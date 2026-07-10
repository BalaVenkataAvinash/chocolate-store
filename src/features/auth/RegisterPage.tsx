import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../../app/providers';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const RegisterPage: React.FC = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');

  // Password Strength calculation
  const [strengthScore, setStrengthScore] = useState(0);
  const [strengthText, setStrengthText] = useState('Too Short');

  useEffect(() => {
    if (password.length === 0) {
      setStrengthScore(0);
      setStrengthText('');
      return;
    }
    if (password.length < 5) {
      setStrengthScore(1);
      setStrengthText('Weak');
      return;
    }

    let score = 1;
    // Check capitalization
    if (/[A-Z]/.test(password)) score++;
    // Check numbers
    if (/[0-9]/.test(password)) score++;
    // Check symbols
    if (/[^A-Za-z0-9]/.test(password)) score++;

    setStrengthScore(score);

    if (score === 2) setStrengthText('Fair');
    else if (score === 3) setStrengthText('Good');
    else if (score === 4) setStrengthText('Strong & Luxurious');
  }, [password]);

  const getStrengthColor = () => {
    if (strengthScore === 1) return '#e74c3c'; // red
    if (strengthScore === 2) return '#f39c12'; // orange
    if (strengthScore === 3) return '#f1c40f'; // yellow
    if (strengthScore === 4) return '#2ecc71'; // green
    return 'rgba(255,255,255,0.1)';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!termsAccepted) {
      setError('You must accept the Terms and Conditions.');
      return;
    }

    register(name, email);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Back Link */}
        <Link to="/" className="back-to-store-link">
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Header */}
        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join the Chovique Circle</p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                background: 'rgba(231, 76, 60, 0.1)',
                border: '1px solid #e74c3c',
                color: '#e74c3c',
                borderRadius: '4px',
                padding: '10px',
                fontSize: '0.85rem',
                marginBottom: '20px',
              }}
            >
              {error}
            </div>
          )}

          <Input
            label="Full Name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Password Strength UI */}
          {password.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: 'var(--beige)',
                  marginBottom: '6px',
                }}
              >
                <span>Password Strength</span>
                <span style={{ color: getStrengthColor(), fontWeight: 600 }}>{strengthText}</span>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="strength-bar-segment"
                    style={{
                      background: idx < strengthScore ? getStrengthColor() : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="form-checkbox-row" style={{ justifyContent: 'flex-start' }}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span style={{ fontSize: '0.82rem' }}>
                I accept the <a href="#" style={{ color: 'var(--gold)' }}>Terms of Service</a> &{' '}
                <a href="#" style={{ color: 'var(--gold)' }}>Privacy Policy</a>
              </span>
            </label>
          </div>

          <Button variant="gold" fullWidth size="lg" type="submit" glow>
            Register Account
          </Button>
        </form>

        <div className="auth-divider" style={{ margin: '24px 0' }}>Or sign up with</div>

        <div className="social-login-group">
          <button 
            className="social-login-btn" 
            type="button" 
            onClick={() => window.location.href = 'https://accounts.google.com'}
            aria-label="Sign up with Google"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.9-4.53-5.75-4.53z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google</span>
          </button>
          
          <button 
            className="social-login-btn" 
            type="button" 
            onClick={() => window.location.href = 'https://appleid.apple.com'}
            aria-label="Sign up with Apple"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.23.67-2.95 1.51-.62.73-1.17 1.87-1.02 2.98 1.1.09 2.23-.55 2.98-1.43z"/>
            </svg>
            <span>Apple</span>
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--grey-light)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
