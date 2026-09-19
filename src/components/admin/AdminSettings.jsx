import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckIcon, SparklesIcon } from '../common/Icons';

export const AdminSettings = () => {
  const { data, updateHero, updateSettings } = useApp();
  const { hero, settings } = data;

  const [heroForm, setHeroForm] = useState(hero);
  const [settingsForm, setSettingsForm] = useState(settings);
  const [timelineInput, setTimelineInput] = useState('');
  const [budgetInput, setBudgetInput] = useState('');

  const handleSaveHero = () => {
    updateHero(heroForm);
  };

  const handleSaveSettings = () => {
    updateSettings(settingsForm);
  };

  const handleAddTimeline = () => {
    if (!timelineInput.trim()) return;
    setSettingsForm(prev => ({
      ...prev,
      timelines: [...prev.timelines, timelineInput.trim()]
    }));
    setTimelineInput('');
  };

  const handleRemoveTimeline = (index) => {
    setSettingsForm(prev => ({
      ...prev,
      timelines: prev.timelines.filter((_, i) => i !== index)
    }));
  };

  const handleAddBudget = () => {
    if (!budgetInput.trim()) return;
    setSettingsForm(prev => ({
      ...prev,
      budgets: [...prev.budgets, budgetInput.trim()]
    }));
    setBudgetInput('');
  };

  const handleRemoveBudget = (index) => {
    setSettingsForm(prev => ({
      ...prev,
      budgets: prev.budgets.filter((_, i) => i !== index)
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Section Config */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>Hero Section Content</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Edit the main banner headline, subtext, and CTAs.</p>
          </div>
          <button onClick={handleSaveHero} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <CheckIcon size={16} />
            <span>Save Hero Copy</span>
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Hero Main Headline</label>
          <input
            type="text"
            value={heroForm.headline}
            onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hero Subheading</label>
          <textarea
            rows="3"
            value={heroForm.subheading}
            onChange={(e) => setHeroForm({ ...heroForm, subheading: e.target.value })}
            className="form-textarea"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Primary CTA Button Text</label>
            <input
              type="text"
              value={heroForm.primaryCta}
              onChange={(e) => setHeroForm({ ...heroForm, primaryCta: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Secondary CTA Button Text</label>
            <input
              type="text"
              value={heroForm.secondaryCta}
              onChange={(e) => setHeroForm({ ...heroForm, secondaryCta: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Platform Contact & Email Settings */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>Contact & Auto-Responder Settings</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Configure specialist contact info, payment notes, and auto-reply templates.</p>
          </div>
          <button onClick={handleSaveSettings} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <CheckIcon size={16} />
            <span>Save All Settings</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Contact Email</label>
            <input
              type="email"
              value={settingsForm.contactEmail}
              onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contact Phone</label>
            <input
              type="text"
              value={settingsForm.contactPhone}
              onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lab Location</label>
            <input
              type="text"
              value={settingsForm.location}
              onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Payment Information Display Note</label>
          <input
            type="text"
            value={settingsForm.paymentDetails}
            onChange={(e) => setSettingsForm({ ...settingsForm, paymentDetails: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Thank You Post-Submission Message</label>
          <textarea
            rows="2"
            value={settingsForm.thankYouMessage}
            onChange={(e) => setSettingsForm({ ...settingsForm, thankYouMessage: e.target.value })}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Auto-Reply Email Subject</label>
          <input
            type="text"
            value={settingsForm.autoReplySubject}
            onChange={(e) => setSettingsForm({ ...settingsForm, autoReplySubject: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Auto-Reply Email Body Template</label>
          <textarea
            rows="4"
            value={settingsForm.autoReplyTemplate}
            onChange={(e) => setSettingsForm({ ...settingsForm, autoReplyTemplate: e.target.value })}
            className="form-textarea"
            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
          />
        </div>

        {/* Timeline & Budget Dropdown Options Managers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div>
            <label className="form-label">Customizable Timeline Options</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={timelineInput}
                onChange={(e) => setTimelineInput(e.target.value)}
                placeholder="Add timeline option..."
                className="form-input"
              />
              <button type="button" onClick={handleAddTimeline} className="btn btn-secondary">Add</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {settingsForm.timelines.map((t, idx) => (
                <span key={idx} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  {t} <span onClick={() => handleRemoveTimeline(idx)} style={{ cursor: 'pointer', color: '#EF4444', marginLeft: '4px' }}>×</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Customizable Budget Range Options</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                placeholder="Add budget option..."
                className="form-input"
              />
              <button type="button" onClick={handleAddBudget} className="btn btn-secondary">Add</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {settingsForm.budgets.map((b, idx) => (
                <span key={idx} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  {b} <span onClick={() => handleRemoveBudget(idx)} style={{ cursor: 'pointer', color: '#EF4444', marginLeft: '4px' }}>×</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
