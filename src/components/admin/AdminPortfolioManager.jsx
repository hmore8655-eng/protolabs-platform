import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, XIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

export const AdminPortfolioManager = () => {
  const { data, addPortfolio, updatePortfolio, deletePortfolio } = useApp();
  const { portfolio } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    title: '',
    category: 'Telecom & RF',
    client: '',
    outcome: '',
    techStack: ['STM32', 'KiCAD'],
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
  };

  const [formData, setFormData] = useState(initialForm);
  const [techInput, setTechInput] = useState('');

  const categories = ['Telecom & RF', 'IoT & Automation', 'FPGA & DSP', 'Embedded Systems'];

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      techStack: [...prev.techStack, techInput.trim()]
    }));
    setTechInput('');
  };

  const handleRemoveTech = (index) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updatePortfolio(editingItem.id, formData);
    } else {
      addPortfolio(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--text-dark)' }}>Completed Portfolio Showcase</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Manage past ENTC engineering achievements, technical outcomes, and hardware images.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ padding: '0.65rem 1.2rem', fontSize: '0.875rem' }}>
          <PlusIcon size={18} />
          <span>Add Portfolio Item</span>
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {portfolio.map(item => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span className="badge badge-orange" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                {item.category}
              </span>
            </div>

            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Client: {item.client}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', marginBottom: '1rem' }}>
                  <strong>Outcome:</strong> {item.outcome}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {item.techStack.map((tech, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', backgroundColor: 'var(--secondary-bg)', borderRadius: '4px', fontWeight: 600 }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button onClick={() => handleOpenEdit(item)} style={{ padding: '0.3rem' }}><EditIcon size={16} /></button>
                  <button onClick={() => deletePortfolio(item.id)} style={{ padding: '0.3rem' }}><TrashIcon size={16} color="#EF4444" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '2rem', maxWidth: '560px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{editingItem ? 'Edit Portfolio Item' : 'Add Portfolio Showcase'}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-light)' }}><XIcon size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Showcase Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Client Name</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Key Technical Outcome *</label>
                <input
                  type="text"
                  required
                  value={formData.outcome}
                  onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Filtered 60Hz noise down to -80dB SNR."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tech Stack Tags</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="form-input"
                    placeholder="Add tag (e.g. STM32, KiCAD)..."
                  />
                  <button type="button" onClick={handleAddTech} className="btn btn-secondary">Add</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {formData.techStack.map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', backgroundColor: 'var(--accent-light-orange)', color: 'var(--accent-dark-orange)', borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      {t}
                      <XIcon size={12} onClick={() => handleRemoveTech(idx)} style={{ cursor: 'pointer' }} />
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">{editingItem ? 'Save Changes' : 'Add Showcase'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
