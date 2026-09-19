import React, { useState } from 'react';
import { ArrowRightIcon, CheckCircleIcon, SparklesIcon } from '../common/Icons';
import { ProtoLabsIcon } from '../common/ProtoLabsLogo';
import { useApp } from '../../context/AppContext';

const InteractiveCircuitShield = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setTilt({ x: rotateX, y: rotateY, glareX, glareY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        maxWidth: '540px',
        perspective: '1000px',
        cursor: 'pointer'
      }}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#0B0F19',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          boxShadow: tilt.isHovered 
            ? '0 30px 60px -15px rgba(255, 149, 0, 0.35), 0 0 0 2px var(--accent-orange)' 
            : '0 20px 45px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 149, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${tilt.isHovered ? 1.02 : 1}, ${tilt.isHovered ? 1.02 : 1}, 1)`,
          transition: tilt.isHovered ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Dynamic Specular Glare Follower */}
        {tilt.isHovered && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 180, 0, 0.18) 0%, transparent 65%)`,
              pointerEvents: 'none',
              zIndex: 10,
              borderRadius: 'inherit'
            }}
          />
        )}

        {/* Top Telemetry Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ProtoLabsIcon size={26} />
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF' }}>
              Proto<span style={{ color: 'var(--accent-orange)' }}>Labs</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '0.25rem 0.65rem', borderRadius: '999px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <span className="animate-pulse-radar" style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }} />
            <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#10B981', letterSpacing: '0.5px' }}>
              LAB STREAM • 28GHz ACTIVE
            </span>
          </div>
        </div>

        {/* Animated Circuit Matrix SVG */}
        <div style={{
          backgroundColor: '#070A10',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1rem',
          border: '1px solid rgba(255, 149, 0, 0.25)',
          position: 'relative'
        }}>
          <svg viewBox="0 0 460 260" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Grid Pattern */}
            <defs>
              <pattern id="circuitGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 149, 0, 0.05)" strokeWidth="1" />
              </pattern>
              <linearGradient id="glowOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF7F00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF9500" stopOpacity="1" />
              </linearGradient>
            </defs>

            <rect width="460" height="260" fill="url(#circuitGrid)" />

            {/* Circuit Traces */}
            <path d="M 40 70 L 120 70 L 160 130 L 300 130 L 340 70 L 420 70" fill="none" stroke="rgba(255, 149, 0, 0.2)" strokeWidth="2" />
            <path d="M 40 190 L 120 190 L 160 130 L 300 130 L 340 190 L 420 190" fill="none" stroke="rgba(255, 149, 0, 0.2)" strokeWidth="2" />
            <path d="M 230 30 L 230 230" fill="none" stroke="rgba(255, 149, 0, 0.25)" strokeWidth="2" strokeDasharray="4 4" />

            {/* Active Glowing Copper Bus */}
            <path d="M 60 130 L 400 130" fill="none" stroke="url(#glowOrange)" strokeWidth="3" />

            {/* Central Microprocessor Core */}
            <g transform="translate(190, 90)">
              <rect width="80" height="80" rx="12" fill="#111827" stroke="#FF9500" strokeWidth="3" />
              <rect x="10" y="10" width="60" height="60" rx="8" fill="rgba(255, 149, 0, 0.15)" stroke="#FF7F00" strokeWidth="1" />
              <circle cx="40" cy="40" r="14" fill="#FF9500" />
              <text x="40" y="44" fill="#0B0F19" fontSize="10" fontWeight="900" textAnchor="middle">STM32</text>
              <text x="40" y="88" fill="#FF9500" fontSize="8" fontWeight="bold" textAnchor="middle">ARM CORTEX-M4</text>
            </g>

            {/* Node Left: LoRa Transceiver */}
            <g transform="translate(30, 105)">
              <rect width="70" height="50" rx="8" fill="#161E2E" stroke="rgba(255, 149, 0, 0.5)" strokeWidth="1.5" />
              <text x="35" y="24" fill="#FF9500" fontSize="9" fontWeight="bold" textAnchor="middle">SX1276 LoRa</text>
              <text x="35" y="38" fill="#94A3B8" fontSize="8" textAnchor="middle">868/915 MHz</text>
            </g>

            {/* Node Right: 5G mmWave RF */}
            <g transform="translate(360, 105)">
              <rect width="70" height="50" rx="8" fill="#161E2E" stroke="rgba(255, 149, 0, 0.5)" strokeWidth="1.5" />
              <text x="35" y="24" fill="#FF9500" fontSize="9" fontWeight="bold" textAnchor="middle">5G mmWave</text>
              <text x="35" y="38" fill="#94A3B8" fontSize="8" textAnchor="middle">28GHz Array</text>
            </g>

            {/* Real-time Oscilloscope Waveform at Bottom */}
            <g transform="translate(40, 205)">
              <rect width="380" height="34" rx="6" fill="#090D16" stroke="rgba(255, 149, 0, 0.2)" />
              <path d="M 10 17 Q 30 2, 50 17 T 90 17 T 130 17 T 170 17 T 210 17 T 250 17 T 290 17 T 330 17 T 370 17" fill="none" stroke="#FF9500" strokeWidth="2">
                <animate attributeName="d" 
                  values="
                    M 10 17 Q 30 2, 50 17 T 90 17 T 130 17 T 170 17 T 210 17 T 250 17 T 290 17 T 330 17 T 370 17;
                    M 10 17 Q 30 30, 50 17 T 90 17 T 130 17 T 170 17 T 210 17 T 250 17 T 290 17 T 330 17 T 370 17;
                    M 10 17 Q 30 2, 50 17 T 90 17 T 130 17 T 170 17 T 210 17 T 250 17 T 290 17 T 330 17 T 370 17
                  " 
                  dur="2s" 
                  repeatCount="indefinite" 
                />
              </path>
            </g>

            {/* Glowing Signal Packets traveling in real time */}
            <circle cx="100" cy="130" r="5" fill="#FF9500">
              <animate attributeName="cx" values="100;190" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" />
            </circle>

            <circle cx="270" cy="130" r="5" fill="#FF7F00">
              <animate attributeName="cx" values="270;360" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" />
            </circle>

            <circle cx="230" cy="50" r="4" fill="#10B981">
              <animate attributeName="cy" values="50;90" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Bottom Interactive HUD Footer */}
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              KiCAD 8 4-Layer
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              DSP Filter CMSIS
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 600 }}>
            Interactive 3D Circuit Matrix
          </span>
        </div>
      </div>
    </div>
  );
};

export const HeroSection = ({ onOpenAuthModal }) => {
  const { data } = useApp();
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
            <div className="badge badge-orange animate-scale-pop" style={{ marginBottom: '1.25rem', fontSize: '0.875rem', padding: '0.4rem 1rem' }}>
              <SparklesIcon size={16} />
              <span>ProtoLabs Hardware & Telecom Innovations</span>
            </div>

            <h1 className="animate-fade-up" style={{
              fontSize: '2.6rem',
              letterSpacing: '-0.5px',
              marginBottom: '1.25rem',
              color: 'var(--text-dark)'
            }}>
              {hero.headline}
            </h1>

            <p className="animate-fade-up stagger-1" style={{
              fontSize: '1.125rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              maxWidth: '600px',
              lineHeight: 1.65
            }}>
              {hero.subheading}
            </p>

            {/* CTAs */}
            <div className="animate-fade-up stagger-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
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

            {/* Trust Signals */}
            <div className="animate-fade-up stagger-3" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <CheckCircleIcon size={18} color="var(--accent-orange)" />
                <span>Verified Hardware Tested</span>
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

          {/* Right Hero Visual - 3D Interactive Circuit Shield */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <InteractiveCircuitShield />
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
