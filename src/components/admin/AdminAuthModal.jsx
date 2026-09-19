import React, { useState } from 'react';
import { LockIcon, XIcon, CheckCircleIcon, SparklesIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

export const AdminAuthModal = ({ isOpen, onClose }) => {
  const { loginAdmin } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await loginAdmin(password);
    if (success) {
      onClose();
    } else {
      setError('Incorrect password. Please enter your admin password.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '440px', padding: '2rem' }}>
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
            <h3 style={{ fontSize: '1.25rem' }}>Admin Portal Login</h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-light)', padding: '0.2rem' }}>
            <XIcon size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            backgroundColor: 'var(--secondary-bg)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.2rem' }}>Admin Identity</div>
            <div>Authorized Lead: <strong style={{ color: 'var(--accent-dark-orange)' }}>protolabs26@gmail.com</strong></div>
          </div>

          <div className="form-group">
            <label className="form-label">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="Enter Admin Password"
              autoFocus
            />
            {error && <span className="error-text">{error}</span>}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Authenticate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
