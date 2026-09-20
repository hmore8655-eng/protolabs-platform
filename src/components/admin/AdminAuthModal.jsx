import React, { useState, useEffect, useRef } from 'react';
import { LockIcon, XIcon, AlertCircleIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';

export const AdminAuthModal = ({ isOpen, onClose }) => {
  const { loginAdminWithGoogle } = useApp();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleClientId, setGoogleClientId] = useState('');
  const googleBtnRef = useRef(null);
  const hasRenderedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      hasRenderedRef.current = false;
      return;
    }
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
    if (hasRenderedRef.current) return;

    try {
      googleBtnRef.current.innerHTML = '';
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        auto_select: false,
        cancel_on_tap_outside: true,
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
        type: 'standard',
        theme: 'filled_blue',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: 320,
        logo_alignment: 'left'
      });
      hasRenderedRef.current = true;
    } catch (e) {
      console.warn('Google Identity initialization:', e);
    }
  }, [isOpen, googleClientId, loginAdminWithGoogle, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '400px', padding: '2rem' }}>
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
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Google OAuth 2.0 Security</span>
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

        {/* Google Button */}
        <div style={{
          margin: '1.5rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '46px',
          justifyContent: 'center'
        }}>
          {isLoading ? (
            <div style={{ fontSize: '0.9rem', color: 'var(--accent-orange)', fontWeight: 600 }}>
              Verifying Google Credentials...
            </div>
          ) : (
            <div ref={googleBtnRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} />
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary" style={{ width: '100%' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
