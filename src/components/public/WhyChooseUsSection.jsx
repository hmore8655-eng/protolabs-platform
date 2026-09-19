import React from 'react';
import { ClockIcon, LayersIcon, ShieldCheckIcon, UserIcon, ZapIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'Clock': return ClockIcon;
    case 'Layers': return LayersIcon;
    case 'ShieldCheck': return ShieldCheckIcon;
    case 'User': return UserIcon;
    default: return ZapIcon;
  }
};

export const WhyChooseUsSection = () => {
  const { data } = useApp();
  const { services } = data;

  return (
    <section id="why-us" style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>
            Why Engineering Clients Choose Us
          </div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Engineering Excellence & Reliability</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            We combine rigorous academic hardware theory with practical, manufacturable Gerber files and tested firmware.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {services.map((item) => {
            const IconComp = getServiceIcon(item.icon);
            return (
              <div
                key={item.id}
                className="card-hover"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem 1.5rem',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--accent-light-orange)',
                  color: 'var(--accent-dark-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(255, 149, 0, 0.15)'
                }}>
                  <IconComp size={26} />
                </div>

                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-dark)' }}>
                  {item.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
