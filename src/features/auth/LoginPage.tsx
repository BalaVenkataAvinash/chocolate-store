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
      <div className="auth-card">
        {/* Back Link */}
        <Link to="/" className="back-to-store-link">
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Header */}
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to Chovique</p>
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

        <div className="auth-divider" style={{ margin: '24px 0' }}>Or continue with</div>

        <div className="social-login-group">
          <button 
            className="social-login-btn" 
            type="button" 
            onClick={() => window.location.href = 'https://accounts.google.com'}
            aria-label="Sign in with Google"
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
            aria-label="Sign in with Apple"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.23.67-2.95 1.51-.62.73-1.17 1.87-1.02 2.98 1.1.09 2.23-.55 2.98-1.43z"/>
            </svg>
            <span>Apple</span>
          </button>
        </div>

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
