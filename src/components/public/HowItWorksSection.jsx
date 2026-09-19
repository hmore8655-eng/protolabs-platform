import React from 'react';
import { useApp } from '../../context/AppContext';

export const HowItWorksSection = () => {
  const { data } = useApp();
  const { howItWorks } = data;

  return (
    <section id="process" style={{ padding: '5rem 0', backgroundColor: 'var(--secondary-bg)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>
            Simple 3-Step Process
          </div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>How It Works</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Streamlined workflow from initial specification check to physical hardware assembly and code verification.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          position: 'relative'
        }}>
          {howItWorks.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '2.25rem 1.75rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--accent-soft-orange)',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1
                }}>
                  {item.step}
                </span>

                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-orange)'
                }} />
              </div>

              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>
                {item.title}
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
