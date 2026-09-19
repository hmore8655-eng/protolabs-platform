import React, { useState } from 'react';
import { StarIcon, ExternalLinkIcon, CheckCircleIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

export const PortfolioSection = () => {
  const { data } = useApp();
  const { portfolio, testimonials } = data;

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Telecom & RF', 'IoT & Automation', 'FPGA & DSP', 'Embedded Systems'];

  const filteredPortfolio = portfolio.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="portfolio" style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>
            Proven Track Record
          </div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Completed Portfolio & Client Reviews</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Explore recently delivered custom hardware boards, RF antenna prototypes, and testimonials from research labs & tech startups.
          </p>
        </div>

        {/* Portfolio Category Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                backgroundColor: activeCategory === cat ? 'var(--accent-orange)' : 'var(--secondary-bg)',
                color: activeCategory === cat ? '#FFFFFF' : 'var(--text-dark)',
                border: activeCategory === cat ? '1px solid var(--accent-orange)' : '1px solid var(--border-color)',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem'
        }}>
          {filteredPortfolio.map(item => (
            <div
              key={item.id}
              className="card-hover"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Showcase Image */}
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative', backgroundColor: '#F1F5F9' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge badge-orange" style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  {item.category}
                </span>
              </div>

              {/* Showcase Info */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                    {item.title}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.75rem', fontWeight: 600 }}>
                    Client: {item.client}
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    <strong>Key Outcome:</strong> {item.outcome}
                  </p>
                </div>

                {/* Tech stack tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {item.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--secondary-bg)',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Sub-Section */}
        <div style={{
          backgroundColor: 'var(--secondary-bg)',
          borderRadius: 'var(--radius-lg)',
          padding: '3.5rem 2rem',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>What Our Clients Say</h3>
            <p style={{ color: 'var(--text-muted)' }}>Feedback from researchers, engineering students, and IoT hardware startups.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {testimonials.map(item => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem'
                }}
              >
                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <StarIcon key={i} size={18} color="var(--accent-orange)" fill="var(--accent-orange)" />
                  ))}
                </div>

                {/* Quote */}
                <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{item.quote}"
                </p>

                {/* Client Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-orange)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.95rem'
                  }}>
                    {item.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-dark)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
