import React, { useState } from 'react';
import { ArrowRightIcon, CheckCircleIcon, SparklesIcon } from '../common/Icons';
import { ProtoLabsIcon } from '../common/ProtoLabsLogo';
import { useApp } from '../../context/AppContext';

const HeroVisualShowcase = () => {
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
          backgroundColor: '#0F172A',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          boxShadow: tilt.isHovered 
            ? '0 30px 60px -15px rgba(255, 149, 0, 0.4), 0 0 0 2px var(--accent-orange)' 
            : '0 20px 45px -10px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${tilt.isHovered ? 1.02 : 1}, ${tilt.isHovered ? 1.02 : 1}, 1)`,
          transition: tilt.isHovered ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Dynamic Specular Glare Layer */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 200, 100, 0.25) 0%, rgba(255, 149, 0, 0.1) 40%, transparent 75%)`,
            pointerEvents: 'none',
            zIndex: 10,
            borderRadius: 'inherit'
          }}
        />

        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ProtoLabsIcon size={24} />
            <span style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF' }}>
              Proto<span style={{ color: 'var(--accent-orange)' }}>Labs</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '999px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <span className="animate-pulse-radar" style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10B981', letterSpacing: '0.5px' }}>
              LAB ACTIVE • 28GHz RF
            </span>
          </div>
        </div>

        {/* Image Showcase Container with zoom on hover */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid rgba(255, 149, 0, 0.3)',
          backgroundColor: '#000000'
        }}>
          <img
            src="/images/hero-hardware.jpg"
            alt="ProtoLabs Engineering Hardware Prototype"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '340px',
              objectFit: 'cover',
              display: 'block',
              transform: tilt.isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />

          {/* Floating HUD Telemetry Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '0.5rem',
            zIndex: 5
          }}>
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 149, 0, 0.4)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <span style={{ color: 'var(--accent-orange)' }}>⚡</span>
              <span>STM32 + LoRaWAN</span>
            </div>

            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 149, 0, 0.4)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <span style={{ color: 'var(--accent-orange)' }}>📡</span>
              <span>KiCAD 8 4-Layer Stackup</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Interactive 3D Hardware Telemetry</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 600 }}>Hover & Move Cursor to Inspect</span>
        </div>
      </div>
    </div>
  );
};

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

          {/* Right Hero Visual - 3D Interactive Telemetry Device Showcase */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <HeroVisualShowcase />
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
