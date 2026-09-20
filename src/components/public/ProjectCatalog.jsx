import React, { useState, useMemo } from 'react';
import { SearchIcon, CheckIcon, ArrowRightIcon, CpuIcon, RadioIcon, AntennaIcon, ServerIcon, LayersIcon, ZapIcon } from '../common/Icons';
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

const ProjectCard = ({ proj, idx, onQuickStart }) => {
  const IconComp = getIconComponent(proj.icon);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
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
        animationFillMode: 'both',
        transform: tilt.isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.015)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)',
        transition: tilt.isHovered 
          ? 'transform 0.1s ease-out, box-shadow 0.25s ease-out' 
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease-out',
        boxShadow: tilt.isHovered 
          ? '0 20px 40px -10px rgba(255, 149, 0, 0.22), 0 0 0 1.5px var(--accent-orange)' 
          : '0 4px 16px rgba(0, 0, 0, 0.05), 0 0 0 1px var(--border-color)',
        overflow: 'hidden'
      }}
    >
      {/* Dynamic specular light reflection that smoothly tracks cursor */}
      {tilt.isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 149, 0, 0.09) 0%, transparent 65%)`,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--accent-light-orange)',
            color: 'var(--accent-dark-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(255, 149, 0, 0.15)',
            transform: tilt.isHovered ? 'scale(1.08) rotate(3deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <IconComp size={26} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
            <span className="badge badge-orange">{proj.category}</span>
            {proj.featured && (
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-dark-orange)', letterSpacing: '0.5px' }}>
                FEATURED
              </span>
            )}
          </div>
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.35, color: 'var(--text-dark)' }}>
          {proj.title}
        </h3>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.35rem', minHeight: '3.6em', lineHeight: 1.6 }}>
          {proj.description}
        </p>

        {/* Deliverables list */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.1rem' }}>
            Deliverables:
          </span>
          {proj.features.slice(0, 4).map((feat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
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
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 500 }}>Price</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            ₹{typeof proj.price === 'number' ? proj.price.toLocaleString('en-IN') : proj.price}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '3px' }}>Time: {proj.duration}</div>
        </div>

        <button
          onClick={() => onQuickStart(proj)}
          className="btn btn-primary"
          style={{ padding: '0.65rem 1.15rem', fontSize: '0.875rem' }}
        >
          <span>Select Solution</span>
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export const ProjectCatalog = ({ onSelectProjectForInquiry }) => {
  const { data, isAdminLoggedIn } = useApp();
  const { projects } = data;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['All', 'IoT & Automation', 'Telecom & RF', 'FPGA & DSP', 'PCB Design', 'Embedded Systems'];

  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => p.published || isAdminLoggedIn)
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
              <div style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
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
            {filteredProjects.map((proj, idx) => (
              <ProjectCard
                key={proj.id}
                proj={proj}
                idx={idx}
                onQuickStart={handleQuickStart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
