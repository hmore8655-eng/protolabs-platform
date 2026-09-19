import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EditIcon, CheckIcon } from '../common/Icons';

export const AdminServicesManager = () => {
  const { data, updateServices, updateHowItWorks } = useApp();
  const { services, howItWorks } = data;

  const [servicesList, setServicesList] = useState(services);
  const [stepsList, setStepsList] = useState(howItWorks);

  const handleSaveServices = () => {
    updateServices(servicesList);
  };

  const handleSaveSteps = () => {
    updateHowItWorks(stepsList);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Why Choose Us Differentiators */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>Why Choose Us Differentiators</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Customize the 4 core service highlights on the public website.</p>
          </div>
          <button onClick={handleSaveServices} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <CheckIcon size={16} />
            <span>Save Differentiators</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {servicesList.map((srv, index) => (
            <div key={srv.id || index} style={{ backgroundColor: 'var(--secondary-bg)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div className="form-group">
                <label className="form-label">Item #{index + 1} Title</label>
                <input
                  type="text"
                  value={srv.title}
                  onChange={(e) => {
                    const copy = [...servicesList];
                    copy[index].title = e.target.value;
                    setServicesList(copy);
                  }}
                  className="form-input"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Description</label>
                <textarea
                  rows="3"
                  value={srv.description}
                  onChange={(e) => {
                    const copy = [...servicesList];
                    copy[index].description = e.target.value;
                    setServicesList(copy);
                  }}
                  className="form-textarea"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Steps */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>How It Works (3-Step Timeline)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Edit the titles and descriptions of the 3 process steps.</p>
          </div>
          <button onClick={handleSaveSteps} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <CheckIcon size={16} />
            <span>Save Process Steps</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {stepsList.map((st, index) => (
            <div key={index} style={{ backgroundColor: 'var(--secondary-bg)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>Step {st.step}</div>
              <div className="form-group">
                <label className="form-label">Step Title</label>
                <input
                  type="text"
                  value={st.title}
                  onChange={(e) => {
                    const copy = [...stepsList];
                    copy[index].title = e.target.value;
                    setStepsList(copy);
                  }}
                  className="form-input"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Step Description</label>
                <textarea
                  rows="3"
                  value={st.description}
                  onChange={(e) => {
                    const copy = [...stepsList];
                    copy[index].description = e.target.value;
                    setStepsList(copy);
                  }}
                  className="form-textarea"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
