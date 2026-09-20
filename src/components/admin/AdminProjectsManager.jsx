import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, DownloadIcon, UploadIcon, CheckIcon, XIcon, SlidersIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

export const AdminProjectsManager = () => {
  const { data, addProject, updateProject, deleteProject, reorderProjects, bulkUploadProjects } = useApp();
  const { projects } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [csvText, setCsvText] = useState('');

  const initialForm = {
    title: '',
    category: 'IoT & Automation',
    description: '',
    price: 299,
    duration: '1-2 Weeks',
    features: ['Schematic & Gerber Files', 'Source Code Firmware', 'Technical Report'],
    icon: 'Radio',
    featured: false,
    published: true
  };

  const [formData, setFormData] = useState(initialForm);
  const [featureInput, setFeatureInput] = useState('');

  const categories = ['IoT & Automation', 'Telecom & RF', 'FPGA & DSP', 'PCB Design', 'Embedded Systems'];
  const icons = ['Radio', 'Antenna', 'Cpu', 'Server', 'Layers', 'Zap'];

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      price: project.price,
      duration: project.duration,
      features: [...project.features],
      icon: project.icon || 'Radio',
      featured: project.featured || false,
      published: project.published !== false
    });
    setIsModalOpen(true);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, featureInput.trim()]
    }));
    setFeatureInput('');
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData);
    }
    setIsModalOpen(false);
  };

  const handleMoveOrder = (index, direction) => {
    const newList = [...projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newList.length) return;
    const temp = newList[index];
    newList[index] = newList[targetIndex];
    newList[targetIndex] = temp;
    reorderProjects(newList);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Category', 'Price', 'Duration', 'Description', 'Featured', 'Published'];
    const rows = projects.map(p => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.price,
      `"${p.duration}"`,
      `"${p.description.replace(/"/g, '""')}"`,
      p.featured ? 'Yes' : 'No',
      p.published ? 'Yes' : 'No'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `entc_projects_catalog_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import CSV text
  const handleProcessBulkCSV = () => {
    if (!csvText.trim()) return;
    try {
      const lines = csvText.trim().split('\n');
      const newItems = [];
      lines.forEach((line, index) => {
        if (index === 0 && line.toLowerCase().includes('title')) return; // header row
        const parts = line.split(',');
        if (parts.length >= 3) {
          newItems.push({
            id: `proj-csv-${Date.now()}-${index}`,
            title: parts[0]?.replace(/"/g, '').trim() || 'Untitled Project',
            category: parts[1]?.replace(/"/g, '').trim() || 'IoT & Automation',
            price: parseFloat(parts[2]) || 299,
            duration: parts[3]?.replace(/"/g, '').trim() || '1-2 Weeks',
            description: parts[4]?.replace(/"/g, '').trim() || 'Custom hardware project specification.',
            features: ['Schematic PCB', 'Firmware Code'],
            icon: 'Radio',
            featured: false,
            published: true,
            createdAt: new Date().toISOString().split('T')[0]
          });
        }
      });
      if (newItems.length > 0) {
        bulkUploadProjects(newItems);
        setIsBulkModalOpen(false);
        setCsvText('');
      }
    } catch (err) {
      alert('Error parsing CSV format. Please ensure comma separated values.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header & Actions */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: '#FFFFFF',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--text-dark)' }}>Projects Catalog Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Add, update pricing, reorder display sequence, or export your pre-defined ENTC engineering items.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button onClick={handleOpenAdd} className="btn btn-primary" style={{ padding: '0.65rem 1.2rem', fontSize: '0.875rem' }}>
            <PlusIcon size={18} />
            <span>Add New Project</span>
          </button>

          <button onClick={() => setIsBulkModalOpen(true)} className="btn btn-secondary" style={{ padding: '0.65rem 1rem', fontSize: '0.875rem' }}>
            <UploadIcon size={16} />
            <span>Bulk CSV Import</span>
          </button>

          <button onClick={handleExportCSV} className="btn btn-outline" style={{ padding: '0.65rem 1rem', fontSize: '0.875rem' }}>
            <DownloadIcon size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--secondary-bg)', color: 'var(--text-muted)', borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Order</th>
                <th style={{ padding: '0.85rem 1rem' }}>Project Title & Details</th>
                <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                <th style={{ padding: '0.85rem 1rem' }}>Price & Duration</th>
                <th style={{ padding: '0.85rem 1rem' }}>Featured</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, idx) => (
                <tr key={proj.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  {/* Order reordering */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-muted)', minWidth: '20px' }}>{idx + 1}</span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMoveOrder(idx, 'up')}
                          style={{ opacity: idx === 0 ? 0.3 : 1, padding: '0 0.2rem', fontSize: '0.7rem' }}
                        >
                          ▲
                        </button>
                        <button
                          disabled={idx === projects.length - 1}
                          onClick={() => handleMoveOrder(idx, 'down')}
                          style={{ opacity: idx === projects.length - 1 ? 0.3 : 1, padding: '0 0.2rem', fontSize: '0.7rem' }}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Title & Description */}
                  <td style={{ padding: '0.85rem 1rem', maxWidth: '320px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{proj.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {proj.description}
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className="badge badge-orange">{proj.category}</span>
                  </td>

                  {/* Price & Timeline */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 800, color: 'var(--accent-orange)', fontSize: '1.1rem' }}>
                      ₹{typeof proj.price === 'number' ? proj.price.toLocaleString('en-IN') : proj.price}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{proj.duration}</div>
                  </td>

                  {/* Featured toggle */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button
                      onClick={() => updateProject(proj.id, { featured: !proj.featured })}
                      className={`badge ${proj.featured ? 'badge-orange' : 'badge-gray'}`}
                      style={{ cursor: 'pointer' }}
                    >
                      {proj.featured ? 'Featured' : 'Standard'}
                    </button>
                  </td>

                  {/* Published toggle */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button
                      onClick={() => updateProject(proj.id, { published: !proj.published })}
                      className={`badge ${proj.published ? 'badge-green' : 'badge-gray'}`}
                      style={{ cursor: 'pointer' }}
                    >
                      {proj.published ? 'Published' : 'Draft'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        style={{ padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                        title="Edit Project"
                      >
                        <EditIcon size={16} color="var(--text-dark)" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                            deleteProject(proj.id);
                          }
                        }}
                        style={{ padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2' }}
                        title="Delete Project"
                      >
                        <TrashIcon size={16} color="#EF4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '2rem', maxWidth: '640px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem' }}>
                {editingProject ? 'Edit Project Details' : 'Add New Pre-Defined Project'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-light)' }}>
                <XIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                  placeholder="e.g. 5G Phased Array Beamforming Module"
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
                  <label className="form-label">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Delivery Timeframe</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="form-input"
                    placeholder="e.g. 1-2 Weeks"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Card Icon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="form-select"
                  >
                    {icons.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                  placeholder="2-3 line overview of project capabilities and specs..."
                />
              </div>

              {/* Features List manager */}
              <div className="form-group">
                <label className="form-label">Key Deliverable Features</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add deliverable feature (e.g. Gerber files)..."
                    className="form-input"
                  />
                  <button type="button" onClick={handleAddFeature} className="btn btn-secondary">
                    Add
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {formData.features.map((feat, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--secondary-bg)',
                      padding: '0.4rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem'
                    }}>
                      <span>{feat}</span>
                      <button type="button" onClick={() => handleRemoveFeature(index)} style={{ color: '#EF4444' }}>
                        <XIcon size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', margin: '1.5rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    style={{ accentColor: 'var(--accent-orange)' }}
                  />
                  <span>Mark as Featured</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    style={{ accentColor: 'var(--accent-orange)' }}
                  />
                  <span>Publish to Public Catalog</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk CSV Import Modal */}
      {isBulkModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '2rem', maxWidth: '580px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Bulk Import Projects via CSV</h3>
              <button onClick={() => setIsBulkModalOpen(false)} style={{ color: 'var(--text-light)' }}>
                <XIcon size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Paste CSV rows formatted as: <code>Title, Category, Price, Duration, Description</code>
            </p>

            <textarea
              rows="6"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="form-textarea"
              placeholder={`Title, Category, Price, Duration, Description\nSmart Agriculture Node, IoT & Automation, 299, 1 Week, Solar LoRa Gateway\n28GHz Phased Array, Telecom & RF, 499, 2 Weeks, Microstrip Antenna Array`}
              style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button type="button" onClick={() => setIsBulkModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button type="button" onClick={handleProcessBulkCSV} className="btn btn-primary">
                Import CSV Rows
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
