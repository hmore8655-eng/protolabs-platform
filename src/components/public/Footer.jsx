import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon } from '../common/Icons';
import { ProtoLabsLogoHorizontal } from '../common/ProtoLabsLogo';
import { useApp } from '../../context/AppContext';
import './Footer.css';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'catalog', label: 'Projects Catalog' },
  { id: 'why-us', label: 'Why Choose Us' },
  { id: 'portfolio', label: 'Portfolio & Reviews' },
  { id: 'contact', label: 'Request Custom Quote' }
];

export const Footer = ({ onOpenAuthModal }) => {
  const { data } = useApp();
  const { settings } = data;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const phoneHref = settings.contactPhone ? `tel:${String(settings.contactPhone).replace(/[^\d+]/g, '')}` : undefined;

  return (
    <footer className="ft">
      <div className="ft__wrap">
        <div className="ft__cta">
          <h2>Have a project <em>in mind?</em></h2>
          <button type="button" className="ft__ctaLink" onClick={() => scrollToSection('contact')}>
            Request a quote <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="ft__grid">
          <div className="ft__brand">
            <ProtoLabsLogoHorizontal size={36} theme="dark" showTagline={false} />
            <p className="ft__disciplines">Electronics • Telecommunication • Real solutions</p>
            <p className="ft__tagline">{settings.tagline}</p>
            <p className="ft__social">
              <a href="https://github.com/hmore8655-eng" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/harsh-more-593a87300" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/protolabs_engineering/" target="_blank" rel="noreferrer">Instagram</a>
              <a href={`mailto:${settings.contactEmail}`}>Email</a>
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="ft__title">Quick navigation</h3>
            <ul className="ft__list">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button type="button" className="ft__link" onClick={() => scrollToSection(link.id)}>{link.label}</button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="ft__title">Contact specialist</h3>
            <ul className="ft__list ft__contact">
              <li><MailIcon size={18} color="var(--ft-orange)" /><a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a></li>
              <li><PhoneIcon size={18} color="var(--ft-orange)" />{phoneHref ? <a href={phoneHref}>{settings.contactPhone}</a> : <span>{settings.contactPhone}</span>}</li>
              <li><MapPinIcon size={18} color="var(--ft-orange)" /><span>{settings.location}</span></li>
            </ul>
          </div>

          <div>
            <h3 className="ft__title">Accepted payments</h3>
            <div className="ft__pay">
              <p className="ft__upi">UPI ID: hmore8655@okicici</p>
              <p>Payment accepted via Google Pay, PhonePe, Paytm, or direct Bank Transfer.</p>
            </div>
            <p className="ft__verified">All project hardware designs, schematics, and simulation models are verified for physical fabrication.</p>
          </div>
        </div>

        <div className="ft__bottom">
          <div onDoubleClick={onOpenAuthModal} title="ProtoLabs Verified Platform" className="ft__copy">
            © {new Date().getFullYear()} Harsh More — ProtoLabs Engineering. All rights reserved.
          </div>
          <div className="ft__legal">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Hardware Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
