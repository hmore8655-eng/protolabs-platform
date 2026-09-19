import React from 'react';
import { ArrowRightIcon, CheckCircleIcon, SparklesIcon, LockIcon, PlusIcon } from '../common/Icons';
import { ProtoLabsIcon } from '../common/ProtoLabsLogo';
import { useApp } from '../../context/AppContext';

export const HeroSection = ({ onOpenAuthModal }) => {
  const { data, isAdminLoggedIn, toggleView } = useApp();
  const { hero } = data;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{
      position: 'relative',
      padding: '5rem 0 6rem 0',
      background: 'linear-gradient(135deg, #FFFFFF 0%, var(--accent-light-orange) 100%)',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-color)'
    }}>
      {/* Background Decorative Element */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        right: '-120px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,149,0,0.15) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Left Text Column */}
          <div style={{ zIndex: 2 }}>
            <div className="badge badge-orange" style={{ marginBottom: '1.25rem', fontSize: '0.875rem', padding: '0.4rem 1rem' }}>
              <SparklesIcon size={16} />
              <span>ProtoLabs Hardware & Telecom Innovations</span>
            </div>

            <h1 style={{
              fontSize: '2.6rem',
              letterSpacing: '-0.5px',
              marginBottom: '1.25rem',
              color: 'var(--text-dark)'
            }}>
              {hero.headline}
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              maxWidth: '600px',
              lineHeight: 1.65
            }}>
              {hero.subheading}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button 
                onClick={() => scrollToSection('catalog')} 
                className="btn btn-primary"
                style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
              >
                <span>{hero.primaryCta}</span>
                <ArrowRightIcon size={18} />
              </button>

              <button 
                onClick={() => scrollToSection('contact')} 
                className="btn btn-outline"
                style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
              >
                <span>{hero.secondaryCta}</span>
              </button>
            </div>

            {/* Trust Signals & Admin Note */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <CheckCircleIcon size={18} color="var(--accent-orange)" />
                <span>Admin Customizable Pricing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <CheckCircleIcon size={18} color="var(--accent-orange)" />
                <span>KiCAD & Gerber BOM Files</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <CheckCircleIcon size={18} color="var(--accent-orange)" />
                <span>24h Technical Proposal</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual - ProtoLabs Circuit Interactive Shield */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div className="card-hover" style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2.25rem 2rem',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <ProtoLabsIcon size={28} />
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.3px' }}>
                    Proto<span style={{ color: 'var(--accent-orange)' }}>Labs</span>
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-light)', backgroundColor: 'var(--secondary-bg)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  ADMIN_STATION_READY
                </span>
              </div>

              {/* Hardware & Circuit Schematic SVG */}
              <svg viewBox="0 0 400 220" style={{ width: '100%', height: 'auto' }}>
                {/* Circuit Traces */}
                <path d="M 60 110 L 140 110 M 180 110 L 260 110 M 300 110 L 340 110" stroke="#FF9500" strokeWidth="3" strokeDasharray="6,4" />
                <path d="M 160 70 L 160 150 M 280 70 L 280 150" stroke="#E0E0E0" strokeWidth="2" />
                
                {/* Central ProtoLabs Hub */}
                <circle cx="200" cy="110" r="32" fill="#FFF3E0" stroke="#FF9500" strokeWidth="3" />
                <circle cx="200" cy="110" r="12" fill="#FF9500" />
                <line x1="200" y1="110" x2="200" y2="85" stroke="#FFFFFF" strokeWidth="3" />
                <line x1="200" y1="110" x2="218" y2="120" stroke="#FFFFFF" strokeWidth="3" />
                <line x1="200" y1="110" x2="182" y2="120" stroke="#FFFFFF" strokeWidth="3" />

                {/* Node 1: Custom Projects */}
                <g transform="translate(30, 85)">
                  <rect width="60" height="50" rx="8" fill="#1A1A1A" />
                  <text x="30" y="27" fill="#FF9500" fontSize="9" fontWeight="bold" textAnchor="middle">PROJECTS</text>
                  <text x="30" y="40" fill="#FFFFFF" fontSize="7" textAnchor="middle">ADMIN EDIT</text>
                </g>

                {/* Node 2: Pricing */}
                <g transform="translate(310, 85)">
                  <rect width="60" height="50" rx="8" fill="#FF9500" />
                  <text x="30" y="27" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">PRICING</text>
                  <text x="30" y="40" fill="#FFFFFF" fontSize="7" textAnchor="middle">DYNAMIC</text>
                </g>

                {/* Signal Pulses */}
                <circle cx="100" cy="110" r="4" fill="#FF7F00">
                  <animate attributeName="cx" values="60;168" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="270" cy="110" r="4" fill="#FF9500">
                  <animate attributeName="cx" values="232;310" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Admin Quick Action Banner inside Card */}
              <div style={{
                marginTop: '1rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--accent-light-orange)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--accent-soft-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--accent-dark-orange)' }}>
                  <LockIcon size={16} />
                  <span>Admin Credentials: <code>admin123</code></span>
                </div>
                
                <button
                  onClick={isAdminLoggedIn ? toggleView : onOpenAuthModal}
                  style={{
                    backgroundColor: 'var(--accent-orange)',
                    color: '#FFFFFF',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    fontSize: '0.75rem'
                  }}
                >
                  {isAdminLoggedIn ? 'Open Admin' : 'Login Admin'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
          h1 {
            font-size: 3.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};
