import React, { useState, useEffect } from 'react';
import { SendIcon, CheckCircleIcon, DollarSignIcon, SparklesIcon, MailIcon, ShieldCheckIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

export const ContactSection = ({ selectedProjectTitle, onClearSelectedProject }) => {
  const { data, addInquiry } = useApp();
  const { projects, settings } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Pre-defined',
    selectedProject: '',
    description: '',
    agree: true
  });

  const [errors, setErrors] = useState({});
  const [submittedInquiry, setSubmittedInquiry] = useState(null);

  useEffect(() => {
    if (selectedProjectTitle) {
      setFormData(prev => ({
        ...prev,
        projectType: 'Pre-defined',
        selectedProject: selectedProjectTitle
      }));
    } else if (projects.length > 0 && !formData.selectedProject) {
      setFormData(prev => ({ ...prev, selectedProject: projects[0].title }));
    }
  }, [selectedProjectTitle, projects]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.projectType === 'Custom') {
      if (!formData.description.trim() || formData.description.length < 15) {
        newErrors.description = 'Please describe your hardware/firmware project requirements (min 15 characters)';
      }
    }

    if (!formData.agree) {
      newErrors.agree = 'You must agree to be contacted for proposal review';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newInq = addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
      selectedProject: formData.projectType === 'Pre-defined' ? formData.selectedProject : 'Custom Engineering Request',
      description: formData.description
    });

    setSubmittedInquiry(newInq);
  };

  const handleResetForm = () => {
    setSubmittedInquiry(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'Pre-defined',
      selectedProject: projects[0]?.title || '',
      description: '',
      agree: true
    });
    if (onClearSelectedProject) onClearSelectedProject();
  };

  return (
    <section id="contact" style={{ padding: '5rem 0', backgroundColor: 'var(--secondary-bg)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>
            Direct Project Proposal
          </div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Request Project Quote</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Submit your project details. Target budget and custom delivery timeline will be finalized directly with ProtoLabs Engineer via live chat or 24-hour proposal email.
          </p>
        </div>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color)'
        }}>
          {submittedInquiry ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-light-orange)',
                color: 'var(--accent-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 8px 24px rgba(255,149,0,0.25)'
              }}>
                <CheckCircleIcon size={40} />
              </div>

              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Inquiry Submitted Successfully!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                {settings.thankYouMessage}
              </p>

              {/* Live Chat Prompt card */}
              <div style={{
                backgroundColor: 'var(--accent-light-orange)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'left',
                marginBottom: '2rem',
                border: '1px solid var(--accent-soft-orange)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-dark-orange)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                  <SparklesIcon size={18} />
                  <span>Start Live Chat with ProtoLabs Engineer</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                  Click the orange 💬 Live Chat icon at the bottom right of your screen to discuss your target budget and deadline in real-time!
                </div>
              </div>

              <button onClick={handleResetForm} className="btn btn-primary">
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Category selector */}
              <div style={{ marginBottom: '2rem' }}>
                <label className="form-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Inquiry Category</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, projectType: 'Pre-defined' }))}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 600,
                      border: formData.projectType === 'Pre-defined' ? '2px solid var(--accent-orange)' : '1px solid var(--border-color)',
                      backgroundColor: formData.projectType === 'Pre-defined' ? 'var(--accent-light-orange)' : '#FFFFFF',
                      color: formData.projectType === 'Pre-defined' ? 'var(--accent-dark-orange)' : 'var(--text-dark)',
                      transition: 'all 0.2s'
                    }}
                  >
                    1. Pre-Defined Project
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, projectType: 'Custom' }))}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 600,
                      border: formData.projectType === 'Custom' ? '2px solid var(--accent-orange)' : '1px solid var(--border-color)',
                      backgroundColor: formData.projectType === 'Custom' ? 'var(--accent-light-orange)' : '#FFFFFF',
                      color: formData.projectType === 'Custom' ? 'var(--accent-dark-orange)' : 'var(--text-dark)',
                      transition: 'all 0.2s'
                    }}
                  >
                    2. Custom Hardware / Firmware Quote
                  </button>
                </div>
              </div>

              {/* Selected project dropdown */}
              {formData.projectType === 'Pre-defined' && (
                <div className="form-group">
                  <label className="form-label">Select Project from Catalog</label>
                  <select
                    name="selectedProject"
                    value={formData.selectedProject}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.title}>
                        {p.title} (₹{typeof p.price === 'number' ? p.price.toLocaleString('en-IN') : p.price} - {p.category})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Contact Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 8856082411"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Project Description */}
              <div className="form-group">
                <label className="form-label">
                  {formData.projectType === 'Custom' ? 'Custom Hardware / Firmware Specifications *' : 'System Modifications / Custom Requirements (Optional)'}
                </label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder={formData.projectType === 'Custom' 
                    ? 'Describe your hardware requirements, microcontroller chips (STM32/ESP32), LoRa/5G frequencies, sensors, and expected outputs...' 
                    : 'Add any specific component preferences, custom sensors, or notes...'}
                  value={formData.description}
                  onChange={handleChange}
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                />
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>

              {/* Live Chat & Proposal Note */}
              <div style={{
                backgroundColor: 'var(--secondary-bg)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <SparklesIcon size={16} color="var(--accent-orange)" />
                <span><strong>Budget & Deadline Note:</strong> Target budget and delivery timeframe will be discussed live with ProtoLabs Engineer via chat or proposal email.</span>
              </div>

              {/* Agreement Checkbox */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent-orange)' }}
                  />
                  <span>I agree to receive a technical proposal within 24 hours.</span>
                </label>
                {errors.agree && <span className="error-text" style={{ display: 'block', marginTop: '0.25rem' }}>{errors.agree}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', gap: '0.75rem' }}
              >
                <span>Submit Inquiry & Open Live Proposal</span>
                <SendIcon size={20} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
