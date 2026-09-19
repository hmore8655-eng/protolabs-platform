import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, LockIcon, DollarSignIcon } from '../common/Icons';
import { ProtoLabsLogoHorizontal } from '../common/ProtoLabsLogo';
import { useApp } from '../../context/AppContext';

export const Footer = ({ onOpenAuthModal }) => {
  const { data } = useApp();
  const { settings } = data;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: '#111827',
      color: '#F9FAFB',
      padding: '4rem 0 2rem 0',
      borderTop: '4px solid var(--accent-orange)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Col 1: Brand */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <ProtoLabsLogoHorizontal size={36} theme="dark" showTagline={false} />
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              ELECTRONICS • TELECOMMUNICATION • REAL SOLUTIONS
            </div>

            <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {settings.tagline}
            </p>

            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <a href="https://github.com/hmore8655-eng" target="_blank" rel="noreferrer" style={{ color: '#9CA3AF', fontWeight: 600, transition: 'color 0.2s' }}>GitHub</a>
              <a href="https://www.linkedin.com/in/harsh-more-593a87300" target="_blank" rel="noreferrer" style={{ color: '#9CA3AF', fontWeight: 600, transition: 'color 0.2s' }}>LinkedIn</a>
              <a href={`mailto:${settings.contactEmail}`} style={{ color: '#9CA3AF', fontWeight: 600, transition: 'color 0.2s' }}>Email</a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '1.25rem', fontWeight: 700 }}>Quick Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <button onClick={() => scrollToSection('hero')} style={{ color: '#9CA3AF', textAlign: 'left' }}>Home</button>
              <button onClick={() => scrollToSection('catalog')} style={{ color: '#9CA3AF', textAlign: 'left' }}>Projects Catalog</button>
              <button onClick={() => scrollToSection('process')} style={{ color: '#9CA3AF', textAlign: 'left' }}>How It Works</button>
              <button onClick={() => scrollToSection('why-us')} style={{ color: '#9CA3AF', textAlign: 'left' }}>Why Choose Us</button>
              <button onClick={() => scrollToSection('portfolio')} style={{ color: '#9CA3AF', textAlign: 'left' }}>Portfolio & Reviews</button>
              <button onClick={() => scrollToSection('contact')} style={{ color: '#9CA3AF', textAlign: 'left' }}>Request Custom Quote</button>
            </div>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '1.25rem', fontWeight: 700 }}>Contact Specialist</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.9rem', color: '#9CA3AF' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MailIcon size={18} color="var(--accent-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{settings.contactEmail}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <PhoneIcon size={18} color="var(--accent-orange)" />
                <span>{settings.contactPhone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPinIcon size={18} color="var(--accent-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{settings.location}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Payments & Admin */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '1.25rem', fontWeight: 700 }}>Accepted Payments</h4>
            <div style={{
              backgroundColor: '#1F2937',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              color: '#D1D5DB',
              marginBottom: '1.25rem',
              borderLeft: '3px solid var(--accent-orange)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                <DollarSignIcon size={16} color="var(--accent-orange)" />
                <span>UPI ID: hmore8655@okicici</span>
              </div>
              <span>Payment accepted via Google Pay, PhonePe, Paytm, or direct Bank Transfer.</span>
            </div>

            <button
              onClick={onOpenAuthModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.825rem',
                color: '#FFFFFF',
                padding: '0.55rem 0.95rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--accent-orange)',
                backgroundColor: 'rgba(255, 149, 0, 0.15)',
                fontWeight: 600
              }}
            >
              <LockIcon size={14} color="var(--accent-orange)" />
              <span>Admin Portal (hmore8655@gmail.com)</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid #1F2937',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#6B7280'
        }}>
          <div>
            © {new Date().getFullYear()} Harsh More — ProtoLabs Engineering. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Hardware Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
