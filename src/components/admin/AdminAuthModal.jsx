import React, { useState, useEffect, useRef } from 'react';
import { LockIcon, XIcon, ShieldCheckIcon, AlertCircleIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';

export const AdminAuthModal = ({ isOpen, onClose }) => {
  const { loginAdmin, loginAdminWithGoogle } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleClientId, setGoogleClientId] = useState('');
  const [showConfigHelper, setShowConfigHelper] = useState(false);
  const googleBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setError('');

    // Fetch Google Client ID from backend
    api.getAuthConfig().then(cfg => {
      if (cfg && cfg.googleClientId) {
        setGoogleClientId(cfg.googleClientId);
      }
    }).catch(() => {});
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !googleClientId || !window.google?.accounts?.id || !googleBtnRef.current) return;

    try {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (response) => {
          if (!response || !response.credential) return;
          setIsLoading(true);
          setError('');
          const res = await loginAdminWithGoogle(response.credential);
          setIsLoading(false);
          if (res.success) {
            onClose();
          } else {
            setError(res.error || 'Google login failed. Make sure you use an authorized administrator account.');
          }
        }
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'filled_blue',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: 375
      });
    } catch (e) {
      console.warn('Google Identity initialization:', e);
    }
  }, [isOpen, googleClientId, loginAdminWithGoogle, onClose]);

  if (!isOpen) return null;

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const success = await loginAdmin(password);
    setIsLoading(false);
    if (success) {
      onClose();
    } else {
      setError('Incorrect admin password. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '440px', padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent-light-orange)',
              color: 'var(--accent-dark-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <LockIcon size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', lineHeight: 1.2 }}>Admin Portal Login</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Secure Owner Authentication</span>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-light)', padding: '0.2rem', cursor: 'pointer' }}>
            <XIcon size={20} />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            backgroundColor: '#FEE2E2',
            border: '1px solid #F87171',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem 1rem',
            color: '#991B1B',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            lineHeight: 1.4
          }}>
            <AlertCircleIcon size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        {/* Identity Badge */}
        <div style={{
          backgroundColor: 'var(--secondary-bg)',
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <ShieldCheckIcon size={22} color="var(--accent-orange)" />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.85rem' }}>Authorized Administrator</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Harsh More (<strong style={{ color: 'var(--accent-dark-orange)' }}>hmore8655@gmail.com</strong>)
            </div>
          </div>
        </div>

        {/* Option 1: Google OAuth Sign-In */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Recommended: Google Sign-In
          </div>

          {googleClientId ? (
            <div ref={googleBtnRef} style={{ display: 'flex', justifyContent: 'center', minHeight: '44px' }} />
          ) : (
            <div>
              <button
                type="button"
                onClick={() => setShowConfigHelper(!showConfigHelper)}
                className="btn"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  backgroundColor: '#FFFFFF',
                  color: '#374151',
                  border: '1px solid #D1D5DB',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '0.65rem 1rem'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>Sign in with Google</span>
              </button>

              {showConfigHelper && (
                <div style={{
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem',
                  marginTop: '0.6rem',
                  fontSize: '0.8rem',
                  color: '#1E40AF',
                  lineHeight: 1.45
                }}>
                  <strong>Google OAuth Setup (2 Minutes):</strong>
                  <ol style={{ margin: '0.35rem 0 0 1.1rem', padding: 0 }}>
                    <li>Create OAuth Client ID (Web Application) at <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: '#1D4ED8', fontWeight: 600 }}>Google Cloud Console</a>.</li>
                    <li>Add authorized origin: <code>https://protolabs-platform.onrender.com</code>.</li>
                    <li>Add <code>GOOGLE_CLIENT_ID</code> to your Render Environment variables.</li>
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>OR Password</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
        </div>

        {/* Option 2: Password Login */}
        <form onSubmit={handleSubmitPassword}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="form-input"
              placeholder="Enter your private admin password"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              {isLoading ? 'Checking...' : 'Authenticate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
