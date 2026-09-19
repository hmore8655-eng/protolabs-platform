import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Platform caught runtime error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
          backgroundColor: '#F9FAFB'
        }}>
          <h2 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '0.5rem' }}>ProtoLabs Engineering</h2>
          <p style={{ color: '#6B7280', marginBottom: '1.5rem', maxWidth: '500px' }}>
            A temporary display error occurred. Please click below to reload the platform.
          </p>
          <button
            onClick={() => { window.location.reload(); }}
            style={{
              backgroundColor: '#FF9500',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Reload Website
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
