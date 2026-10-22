import React, { useState, useMemo } from 'react';
import { SearchIcon, ArrowRightIcon, CpuIcon, RadioIcon, AntennaIcon, ServerIcon, LayersIcon, ZapIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';
import './ProjectCatalog.css';

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
  const href = `/project/${encodeURIComponent(proj.id)}`;
  const features = proj.features || [];

  return (
    <article className="pc-card">
      <div>
        <div className="pc-card__meta">
          <span className="pc-card__index">{String(idx + 1).padStart(2, '0')}</span>
          <span className="pc-card__tag">
            {proj.featured && <span className="pc-card__featured">Featured</span>}
            <span>{proj.category}</span>
            <span className="pc-card__icon" aria-hidden="true"><IconComp size={18} /></span>
          </span>
        </div>

        <h3>
          <a href={href} aria-label={`View ${proj.title} project details`}>
            {proj.title}<span aria-hidden="true">↗</span>
          </a>
        </h3>
        <p>{proj.description}</p>

        {features.length > 0 && (
          <ul aria-label="Deliverables">
            {features.slice(0, 4).map((feat, i) => <li key={i}>{feat}</li>)}
          </ul>
        )}
      </div>

      <div className="pc-card__foot">
        <div className="pc-card__price">
          <small>Price</small>
          <strong>₹{typeof proj.price === 'number' ? proj.price.toLocaleString('en-IN') : proj.price}</strong>
          <em>Time: {proj.duration}</em>
        </div>
        <div className="pc-card__actions">
          <a href={href} className="pc-btn pc-btn--line">View details <ArrowRightIcon size={14} /></a>
          <button type="button" onClick={() => onQuickStart(proj)} className="pc-btn pc-btn--solid">
            Enquire <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};

export const ProjectCatalog = ({ onSelectProjectForInquiry }) => {
  const { data, isAdminLoggedIn } = useApp();
  const { projects } = data;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const categories = useMemo(() => {
    const defaultList = ['All', 'Robotics', 'IoT & Automation', 'Telecom & RF', 'Embedded Systems', 'FPGA & DSP', 'PCB Design'];
    const dynamicSet = new Set(defaultList);
    (projects || []).forEach(p => {
      if (p.category) dynamicSet.add(p.category);
    });
    return Array.from(dynamicSet);
  }, [projects]);

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
            (p.features || []).some(f => f.toLowerCase().includes(q))
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
    <section id="catalog" className="pc" aria-labelledby="catalog-title">
      <div className="pc__wrap">
        <header className="pc__head">
          <div>
            <p className="pc__eyebrow"><span>02</span> The catalog</p>
            <h2 id="catalog-title">Projects you can <em>commission.</em></h2>
          </div>
          <p className="pc__lede">
            Explore hardware schematics, firmware code, and CST/HFSS RF antenna simulations. Each project is built with complete engineering documentation.
          </p>
        </header>

        <div className="pc__controls">
          <div className="pc__search">
            <label className="pc__sr" htmlFor="catalog-search">Search the catalog</label>
            <SearchIcon size={18} />
            <input
              id="catalog-search"
              type="search"
              placeholder="Search by keyword — STM32, LoRa, antenna, KiCAD"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="pc__sort">
            <label htmlFor="catalog-sort">Sort by</label>
            <select id="catalog-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Featured / Reordered</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="pc__tabs" role="group" aria-label="Filter by category">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className="pc__tab"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="pc__count" role="status" aria-live="polite">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="pc__empty">
            <h3>No projects match your search.</h3>
            <p>Try clearing the filters, or ask us about a custom project.</p>
            <button type="button" className="pc-btn pc-btn--line" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
              Reset filters
            </button>
          </div>
        ) : (
          <div className="pc__grid">
            {filteredProjects.map((proj, idx) => (
              <ProjectCard key={proj.id} proj={proj} idx={idx} onQuickStart={handleQuickStart} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
