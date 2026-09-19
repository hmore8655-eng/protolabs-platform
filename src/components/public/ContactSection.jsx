import React, { useState, useEffect } from 'react';
import { SendIcon, CheckCircleIcon, DollarSignIcon, SparklesIcon, XIcon, ShieldCheckIcon } from '../common/Icons';
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
    timeline: settings.timelines[1] || '1-2 Weeks',
    budget: settings.budgets[1] || '$300 - $500',
    description: '',
    notes: '',
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
      if (!formData.description.trim() || formData.description.length < 20) {
        newErrors.description = 'Please describe your custom project requirements (min 20 characters)';
      }
    }

    if (!formData.agree) {
      newErrors.agree = 'You must agree to be contacted for the quote';
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
      selectedProject: formData.projectType === 'Pre-defined' ? formData.selectedProject : 'Custom Project Request',
      timeline: formData.timeline,
      budget: formData.budget,
      description: formData.description,
      notes: formData.notes
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
      timeline: settings.timelines[1] || '1-2 Weeks',
      budget: settings.budgets[1] || '$300 - $500',
      description: '',
      notes: '',
      agree: true
    });
    if (onClearSelectedProject) onClearSelectedProject();
  };

  return (
    <section id="contact" style={{ padding: '5rem 0', backgroundColor: 'var(--secondary-bg)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>
            Direct Engineering Proposal
          </div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Request Project Quote</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Submit your pre-defined selection or custom hardware/firmware specs. Guaranteed response with block diagram within 24 hours.
          </p>
        </div>

        <div style={{
          maxWidth: '840px',
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

              {/* Auto reply simulation preview card */}
              <div style={{
                backgroundColor: 'var(--secondary-bg)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                textAlign: 'left',
                marginBottom: '2rem',
                border: '1px dashed var(--accent-orange)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-dark-orange)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  <SparklesIcon size={16} />
                  <span>Auto-Reply Email Notification Triggered</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, whiteSpace: 'pre-line', fontFamily: 'monospace' }}>
                  To: {submittedInquiry.email}
                  {'\n'}Subject: {settings.autoReplySubject}
                  {'\n\n'}
                  {settings.autoReplyTemplate.replace('{{name}}', submittedInquiry.name).replace('{{project}}', submittedInquiry.selectedProject)}
                </div>
              </div>

              {/* Payment note display */}
              <div style={{
                backgroundColor: '#FFFDF9',
                border: '1px solid var(--accent-soft-orange)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                color: 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                justifyContent: 'center'
              }}>
                <DollarSignIcon size={20} color="var(--accent-orange)" />
                <span><strong>Payment Note:</strong> {settings.paymentDetails}</span>
              </div>

              <button onClick={handleResetForm} className="btn btn-primary">
                Submit Another Project Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Project Type Switcher */}
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
                    1. Instant Pre-Defined Project
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
                    2. Custom ENTC Service Quote
                  </button>
                </div>
              </div>

              {/* Selected Project Dropdown (If Pre-defined) */}
              {formData.projectType === 'Pre-defined' && (
                <div className="form-group">
                  <label className="form-label">Select Pre-Defined Project</label>
                  <select
                    name="selectedProject"
                    value={formData.selectedProject}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.title}>
                        {p.title} (${p.price} - {p.category})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Personal Info Grid */}
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
                    placeholder="alex@university.edu"
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
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Timeline & Budget Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Project Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {settings.timelines.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {settings.budgets.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Description Textarea */}
              <div className="form-group">
                <label className="form-label">
                  {formData.projectType === 'Custom' ? 'Project Requirements & Specifications *' : 'Custom Modifications / Notes (Optional)'}
                </label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder={formData.projectType === 'Custom' 
                    ? 'Describe your hardware requirements, microcontrollers (STM32/ESP32), frequency bands (LoRa/5G), sensors, and expected outputs...' 
                    : 'Add any specific component preferences, custom sensors, or delivery deadline notes...'}
                  value={formData.description}
                  onChange={handleChange}
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                />
                {errors.description && <span className="error-text">{errors.description}</span>}
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
                  <span>I agree to receive a technical quote & proposal within 24 hours.</span>
                </label>
                {errors.agree && <span className="error-text" style={{ display: 'block', marginTop: '0.25rem' }}>{errors.agree}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', gap: '0.75rem' }}
              >
                <span>Get Instant Quote Proposal</span>
                <SendIcon size={20} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
