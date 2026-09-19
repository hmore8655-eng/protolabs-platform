import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckIcon, SparklesIcon, ServerIcon } from '../common/Icons';
import { api } from '../../services/api';

export const AdminSettings = () => {
  const { data, updateHero, updateSettings, restoreBackup, showToast } = useApp();
  const { hero, settings } = data;

  const [heroForm, setHeroForm] = useState(hero);
  const [settingsForm, setSettingsForm] = useState(settings);
  const [timelineInput, setTimelineInput] = useState('');
  const [budgetInput, setBudgetInput] = useState('');

  // Cloud Database Status
  const [dbStatus, setDbStatus] = useState({ loading: true, isCloud: false, mode: 'Checking...', info: '' });
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    api.getDatabaseStatus()
      .then(res => setDbStatus({ loading: false, ...res }))
      .catch(() => setDbStatus({
        loading: false,
        isCloud: false,
        mode: 'Local File Mode (Ephemeral)',
        info: 'Running on local file storage. Connect MongoDB Atlas to keep data permanent across sleep periods.'
      }));
  }, []);

  const handleExportBackup = async () => {
    try {
      setIsExporting(true);
      const backup = await api.exportBackup();
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `protolabs-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Database backup downloaded successfully!');
    } catch (e) {
      // Fallback export from local data
      const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), data }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `protolabs-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Platform backup exported from browser state.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileRestore = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const payload = json.data ? json.data : json;
        if (!payload.projects || !Array.isArray(payload.projects)) {
          showToast('Invalid backup file: Missing projects array', 'error');
          return;
        }
        await restoreBackup(payload);
        if (payload.hero) setHeroForm(payload.hero);
        if (payload.settings) setSettingsForm(payload.settings);
      } catch (err) {
        showToast(`Failed to parse backup: ${err.message}`, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset input
  };

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
      {/* Cloud Persistence & Database Status Card */}
      <div style={{
        backgroundColor: dbStatus.isCloud ? '#ECFDF5' : '#FFFBEB',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: `1px solid ${dbStatus.isCloud ? '#A7F3D0' : '#FDE68A'}`,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: dbStatus.isCloud ? '#10B981' : '#F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <ServerIcon size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-dark)' }}>Database Persistence Status</h3>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  backgroundColor: dbStatus.isCloud ? '#D1FAE5' : '#FEF3C7',
                  color: dbStatus.isCloud ? '#065F46' : '#92400E'
                }}>
                  {dbStatus.loading ? 'Checking...' : (dbStatus.isCloud ? '🟢 Permanent (MongoDB Atlas Cloud)' : '⚠️ Ephemeral (Local Storage)')}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                {dbStatus.mode}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleExportBackup}
              disabled={isExporting}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
            >
              📥 Download Backup (.json)
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileRestore}
              accept=".json"
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
            >
              📤 Restore from Backup
            </button>
          </div>
        </div>

        {!dbStatus.isCloud && (
          <div style={{
            fontSize: '0.875rem',
            color: '#78350F',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: '1rem',
            borderRadius: '6px',
            borderLeft: '4px solid #F59E0B',
            marginTop: '0.75rem',
            lineHeight: 1.5
          }}>
            <strong>Why do edits disappear if nobody visits the site for some time?</strong>
            <p style={{ margin: '0.35rem 0' }}>
              On Render's free tier, the web service goes to sleep after 15 minutes of inactivity. When someone visits, Render boots a fresh container from the GitHub repository, which resets all local file changes.
            </p>
            <strong>How to make all your changes permanent forever (100% Free):</strong>
            <ol style={{ margin: '0.35rem 0 0 1.25rem', padding: 0 }}>
              <li>Create a free forever cluster on <a href="https://www.mongodb.com/atlas" target="_blank" rel="noreferrer" style={{ color: '#047857', fontWeight: 600, textDecoration: 'underline' }}>MongoDB Atlas</a> (M0 Free Tier).</li>
              <li>Get your connection string (e.g. <code>mongodb+srv://admin:pass@cluster.mongodb.net/protolabs</code>).</li>
              <li>Go to <strong>Render Dashboard → protolabs-platform → Environment</strong>, add <code>MONGODB_URI</code> and click Save.</li>
            </ol>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.8rem', color: '#92400E' }}>
              💡 Once <code>MONGODB_URI</code> is added, all catalog edits, hero text, and client chats stay saved permanently regardless of spin-downs or new commits!
            </p>
          </div>
        )}
      </div>

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
