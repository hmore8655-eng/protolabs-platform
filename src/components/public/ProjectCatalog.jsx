import React, { useState, useMemo } from 'react';
import { SearchIcon, CheckIcon, ArrowRightIcon, CpuIcon, RadioIcon, AntennaIcon, ServerIcon, LayersIcon, ZapIcon, LockIcon, PlusIcon, EditIcon } from '../common/Icons';
import { ProtoLabsIcon } from '../common/ProtoLabsLogo';
import { useApp } from '../../context/AppContext';

const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'Radio': return RadioIcon;
    case 'Antenna': return AntennaIcon;
    case 'Cpu': return CpuIcon;
    case 'Server': return ServerIcon;
    case 'Layers': return LayersIcon;
    default: return ZapIcon;
  }
};

export const ProjectCatalog = ({ onSelectProjectForInquiry, onOpenAuthModal }) => {
  const { data, isAdminLoggedIn, toggleView } = useApp();
  const { projects } = data;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['All', 'IoT & Automation', 'Telecom & RF', 'FPGA & DSP', 'PCB Design', 'Embedded Systems'];

  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => p.published || isAdminLoggedIn) // Show drafts if admin is logged in
      .filter(p => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.features.some(f => f.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return (a.order || 0) - (b.order || 0);
      });
  }, [projects, selectedCategory, searchQuery, sortBy, isAdminLoggedIn]);

  const handleQuickStart = (project) => {
    if (onSelectProjectForInquiry) {
      onSelectProjectForInquiry(project.title);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="catalog" style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
          <div className="badge badge-orange" style={{ marginBottom: '0.75rem', gap: '0.4rem' }}>
            <ProtoLabsIcon size={16} />
            <span>Industry-Grade Hardware & Telecom Portfolio</span>
          </div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Engineering Projects & Solutions Catalog</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Explore verified hardware schematics, firmware code, and CST/HFSS RF antenna simulations. Production-ready prototypes built with complete engineering documentation.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '2.5rem',
          backgroundColor: 'var(--secondary-bg)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {/* Search Box */}
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
              <input
                type="text"
                placeholder="Search catalog by keyword (STM32, LoRa, Antenna, KiCAD)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <div style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                <SearchIcon size={18} />
              </div>
            </div>

            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 1rem', fontSize: '0.875rem' }}
              >
                <option value="default">Featured / Reordered</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    backgroundColor: isSelected ? 'var(--accent-orange)' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : 'var(--text-dark)',
                    border: isSelected ? '1px solid var(--accent-orange)' : '1px solid var(--border-color)',
                    boxShadow: isSelected ? '0 6px 16px rgba(255, 149, 0, 0.35)' : 'none',
                    transform: isSelected ? 'scale(1.04)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = 'var(--accent-orange)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="animate-fade-up" style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: 'var(--secondary-bg)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No projects match your search filters.</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Try clearing filters or request a custom ProtoLabs project!</p>
            <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="btn btn-outline">
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProjects.map((proj, idx) => {
              const IconComp = getIconComponent(proj.icon);
              return (
                <div
                  key={proj.id}
                  className="card-hover animate-fade-up"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    animationDelay: `${Math.min(idx * 70, 420)}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--accent-light-orange)',
                        color: 'var(--accent-dark-orange)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComp size={24} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                        <span className="badge badge-orange">{proj.category}</span>
                        {proj.featured && (
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-dark-orange)', letterSpacing: '0.5px' }}>FEATURED</span>
                        )}
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                      {proj.title}
                    </h3>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.25rem', minHeight: '3.6em' }}>
                      {proj.description}
                    </p>

                    {/* Features list */}
                    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>
                        Deliverables:
                      </span>
                      {proj.features.map((feat, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          <CheckIcon size={16} color="var(--accent-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Price & Quick Start */}
                  <div style={{
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 500 }}>Price</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-orange)', lineHeight: 1 }}>
                        ${proj.price}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Time: {proj.duration}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleQuickStart(proj)}
                        className="btn btn-primary"
                        style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}
                      >
                        <span>Quick Start</span>
                        <ArrowRightIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
