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
      {/* Floating Back Link */}
      <Link to="/" className="back-to-store-link">
        <ArrowLeft size={16} />
        Back to Boutique
      </Link>

      <div className="auth-card">
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
