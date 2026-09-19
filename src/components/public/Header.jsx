import React, { useState } from 'react';
import { LockIcon, MenuIcon, XIcon, ArrowRightIcon, PlusIcon } from '../common/Icons';
import { ProtoLabsLogoHorizontal } from '../common/ProtoLabsLogo';
import { useApp } from '../../context/AppContext';

export const Header = ({ onOpenAuthModal }) => {
  const { isAdminView, isAdminLoggedIn, toggleView, logoutAdmin } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px'
      }}>
        {/* ProtoLabs Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <ProtoLabsLogoHorizontal size={38} showTagline={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <button onClick={() => scrollToSection('hero')} style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Home</button>
          <button onClick={() => scrollToSection('catalog')} style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Projects Catalog</button>
          <button onClick={() => scrollToSection('process')} style={{ fontWeight: 600, color: 'var(--text-dark)' }}>How It Works</button>
          <button onClick={() => scrollToSection('why-us')} style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Services</button>
          <button onClick={() => scrollToSection('portfolio')} style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Portfolio</button>
          <button onClick={() => scrollToSection('contact')} style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Contact</button>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Admin Switch / Login Button */}
          {isAdminLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button 
                onClick={toggleView}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', gap: '0.4rem' }}
              >
                <LockIcon size={15} />
                <span>{isAdminView ? 'View Public Site' : 'Admin Portal (Add & Price)'}</span>
              </button>
              <button 
                onClick={logoutAdmin}
                style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 700, padding: '0.4rem 0.6rem' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid var(--accent-orange)',
                backgroundColor: 'var(--accent-light-orange)',
                transition: 'all 0.2s'
              }}
              title="Admin Login to add projects & manage pricing"
            >
              <LockIcon size={14} color="var(--accent-dark-orange)" />
              <span>Admin Login</span>
            </button>
          )}

          <button 
            onClick={() => scrollToSection('contact')}
            className="btn btn-primary"
            style={{ display: 'none', padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
            id="header-cta"
          >
            <span>Get Started</span>
            <ArrowRightIcon size={16} />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            style={{ padding: '0.5rem', color: 'var(--text-dark)' }}
            className="mobile-toggle"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <button onClick={() => scrollToSection('hero')} style={{ textAlign: 'left', fontWeight: 600, padding: '0.5rem 0' }}>Home</button>
          <button onClick={() => scrollToSection('catalog')} style={{ textAlign: 'left', fontWeight: 600, padding: '0.5rem 0' }}>Projects Catalog</button>
          <button onClick={() => scrollToSection('process')} style={{ textAlign: 'left', fontWeight: 600, padding: '0.5rem 0' }}>How It Works</button>
          <button onClick={() => scrollToSection('why-us')} style={{ textAlign: 'left', fontWeight: 600, padding: '0.5rem 0' }}>Services</button>
          <button onClick={() => scrollToSection('portfolio')} style={{ textAlign: 'left', fontWeight: 600, padding: '0.5rem 0' }}>Portfolio & Reviews</button>
          <button onClick={() => scrollToSection('contact')} style={{ textAlign: 'left', fontWeight: 600, padding: '0.5rem 0' }}>Contact Form</button>
          
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onOpenAuthModal(); }}
            className="btn btn-outline"
            style={{ width: '100%', marginTop: '0.5rem', gap: '0.5rem' }}
          >
            <LockIcon size={16} />
            <span>Admin Portal Login</span>
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          #header-cta { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
