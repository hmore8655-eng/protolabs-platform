import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, StarIcon, XIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

export const AdminTestimonialsManager = () => {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = useApp();
  const { testimonials } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    name: '',
    title: '',
    quote: '',
    rating: 5,
    avatar: 'AT'
  };

  const [formData, setFormData] = useState(initialForm);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateTestimonial(editingItem.id, formData);
    } else {
      addTestimonial(formData);
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
          <h2 style={{ fontSize: '1.35rem', color: 'var(--text-dark)' }}>Client Testimonials Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Manage client reviews, star ratings, and student/researcher testimonials.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ padding: '0.65rem 1.2rem', fontSize: '0.875rem' }}>
          <PlusIcon size={18} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {testimonials.map(item => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <StarIcon key={i} size={16} color="var(--accent-orange)" fill="var(--accent-orange)" />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button onClick={() => handleOpenEdit(item)} style={{ padding: '0.2rem 0.4rem' }}>
                    <EditIcon size={16} color="var(--text-dark)" />
                  </button>
                  <button onClick={() => deleteTestimonial(item.id)} style={{ padding: '0.2rem 0.4rem' }}>
                    <TrashIcon size={16} color="#EF4444" />
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', fontStyle: 'italic', marginBottom: '1rem' }}>
                "{item.quote}"
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-orange)',
                color: '#FFFFFF',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem'
              }}>
                {item.avatar || 'CL'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '2rem', maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-light)' }}><XIcon size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Dr. Aris Thorne"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Title / Role</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Lead Researcher, Robotics Institute"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Star Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="form-select"
                  >
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Avatar Initials</label>
                <input
                  type="text"
                  maxLength="2"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value.toUpperCase() })}
                  className="form-input"
                  placeholder="AT"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Quote Feedback *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">{editingItem ? 'Save Changes' : 'Add Review'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
