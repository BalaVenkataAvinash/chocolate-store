import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../../app/providers';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    // Default to customer role if standard fields used
    login(email, 'customer');
    navigate('/');
  };

  // testing role bypasses
  const handleShortcutLogin = (role: 'customer' | 'admin' | 'superadmin') => {
    login(`${role}@chovique.com`, role);
    if (role === 'admin') navigate('/admin');
    else if (role === 'superadmin') navigate('/superadmin');
    else navigate('/');
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
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to Chovique</p>
        </div>

        {/* Social logins */}
        <div className="social-login-group">
          <button className="social-login-btn" type="button" aria-label="Sign in with Google">
            Google
          </button>
          <button className="social-login-btn" type="button" aria-label="Sign in with Apple">
            Apple
          </button>
          <button className="social-login-btn" type="button" aria-label="Sign in with Facebook">
            Facebook
          </button>
        </div>

        <div className="auth-divider">Or continue with</div>

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

          <div className="form-checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <a href="#" style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>
              Forgot Password?
            </a>
          </div>

          <Button variant="gold" fullWidth size="lg" type="submit" glow>
            Sign In
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--grey-light)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--gold)', fontWeight: 600 }}>
            Register Now
          </Link>
        </p>

        {/* Showcase / Tester Shortcuts Panel */}
        <div
          style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600,
              display: 'block',
              marginBottom: '12px',
            }}
          >
            Tester Role Shortcuts
          </span>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={() => handleShortcutLogin('customer')}
              style={{
                fontSize: '0.75rem',
                color: 'var(--cream)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                padding: '6px 10px',
                borderRadius: '4px',
              }}
            >
              Customer
            </button>
            <button
              onClick={() => handleShortcutLogin('admin')}
              style={{
                fontSize: '0.75rem',
                color: 'var(--cream)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                padding: '6px 10px',
                borderRadius: '4px',
              }}
            >
              Admin
            </button>
            <button
              onClick={() => handleShortcutLogin('superadmin')}
              style={{
                fontSize: '0.75rem',
                color: 'var(--cream)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                padding: '6px 10px',
                borderRadius: '4px',
              }}
            >
              Superadmin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
