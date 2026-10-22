import React, { useEffect, useMemo, useState } from 'react';
import { SendIcon, CheckCircleIcon, SparklesIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';
import './ContactSection.css';

export const ContactSection = ({ selectedProjectTitle, onClearSelectedProject }) => {
  const { data, addInquiry, isAdminLoggedIn } = useApp();
  const { projects = [], settings = {} } = data;
  const visibleProjects = useMemo(() => projects.filter(p => p.published || isAdminLoggedIn), [projects, isAdminLoggedIn]);
  const [form, setForm] = useState({ name:'', email:'', phone:'', projectType:'Pre-defined', selectedProject:'', description:'', agree:true });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (selectedProjectTitle) setForm(p => ({ ...p, projectType:'Pre-defined', selectedProject:selectedProjectTitle }));
    else if (!form.selectedProject && visibleProjects.length) setForm(p => ({ ...p, selectedProject:visibleProjects[0].title }));
  }, [selectedProjectTitle, visibleProjects, form.selectedProject]);

  const change = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    setErrors(p => ({ ...p, [name]: undefined }));
  };
  const submit = async e => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    if (!form.email.trim()) next.email = 'Email address is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (form.projectType === 'Custom' && form.description.trim().length < 15) next.description = 'Describe your requirements in at least 15 characters';
    if (!form.agree) next.agree = 'Please agree to be contacted about your proposal';
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    try {
      await addInquiry({ name:form.name.trim(), email:form.email.trim(), phone:form.phone.trim(), projectType:form.projectType, selectedProject:form.projectType === 'Pre-defined' ? form.selectedProject : 'Custom Engineering Request', description:form.description.trim() });
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit:'Could not submit the inquiry. Please try again.' });
    } finally { setBusy(false); }
  };
  const reset = () => {
    setSubmitted(false); setErrors({});
    setForm({ name:'', email:'', phone:'', projectType:'Pre-defined', selectedProject:visibleProjects[0]?.title || '', description:'', agree:true });
    onClearSelectedProject?.();
  };
  const custom = form.projectType === 'Custom';
  return <section id="contact" className="ct" aria-labelledby="contact-title">
    <div className="ct__wrap">
      <header className="ct__intro">
        <p className="ct__eyebrow"><span>04</span> Start a project</p>
        <h2 id="contact-title">Tell us what you want to <em>build.</em></h2>
        <p className="ct__lede">Share your project details. Scope, budget and delivery timelines can be finalized directly with the ProtoLabs engineering team.</p>
        <p className="ct__note"><SparklesIcon size={16}/><span><strong>Budget &amp; deadline:</strong> discussed with our engineer once we understand your requirements.</span></p>
      </header>
      <div className="ct__panel">
        {submitted ? <div className="ct-done" role="status">
          <span className="ct-done__icon"><CheckCircleIcon size={40}/></span>
          <h3>Inquiry submitted successfully.</h3>
          <p>{settings.thankYouMessage || 'Thanks for reaching out. The ProtoLabs team will review your project details and follow up soon.'}</p>
          <p className="ct-done__chat"><SparklesIcon size={18}/><span><strong>Want to discuss it sooner?</strong> Use the Live Chat widget at the bottom-right of the page.</span></p>
          <button type="button" onClick={reset} className="ct-btn ct-btn--line">Submit another inquiry</button>
        </div> : <form onSubmit={submit} noValidate>
          <fieldset className="ct-type"><legend>Inquiry category</legend><div className="ct-switch">
            <button type="button" aria-pressed={!custom} onClick={() => setForm(p => ({ ...p, projectType:'Pre-defined' }))}>1. Pre-defined project</button>
            <button type="button" aria-pressed={custom} onClick={() => setForm(p => ({ ...p, projectType:'Custom' }))}>2. Custom hardware / firmware quote</button>
          </div></fieldset>
          {!custom && <div className="ct-field"><label htmlFor="ct-project">Select project from catalog</label><select id="ct-project" name="selectedProject" value={form.selectedProject} onChange={change}>
            {visibleProjects.map(p => <option key={p.id} value={p.title}>{p.title} ({typeof p.price === 'number' ? '₹' + p.price.toLocaleString('en-IN') : p.price} — {p.category})</option>)}
            {!visibleProjects.length && <option value="">Project details to be discussed</option>}
          </select></div>}
          <div className="ct-row">
            <div className="ct-field"><label htmlFor="ct-name">Full name *</label><input id="ct-name" name="name" autoComplete="name" value={form.name} onChange={change} placeholder="e.g. Alex Mercer" aria-invalid={!!errors.name}/>{errors.name && <span className="ct-error" role="alert">{errors.name}</span>}</div>
            <div className="ct-field"><label htmlFor="ct-email">Email address *</label><input id="ct-email" type="email" name="email" autoComplete="email" value={form.email} onChange={change} placeholder="alex@example.com" aria-invalid={!!errors.email}/>{errors.email && <span className="ct-error" role="alert">{errors.email}</span>}</div>
            <div className="ct-field"><label htmlFor="ct-phone">Phone number (optional)</label><input id="ct-phone" type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={change} placeholder="+91 88560 82411"/></div>
          </div>
          <div className="ct-field"><label htmlFor="ct-description">{custom ? 'Custom hardware / firmware specifications *' : 'System modifications / custom requirements (optional)'}</label><textarea id="ct-description" name="description" rows="4" value={form.description} onChange={change} placeholder={custom ? 'Describe hardware, MCU (STM32/ESP32), wireless links, sensors and expected outputs…' : 'Add component preferences, custom sensors or notes…'} aria-invalid={!!errors.description}/>{errors.description && <span className="ct-error" role="alert">{errors.description}</span>}</div>
          <div className="ct-check"><label><input type="checkbox" name="agree" checked={form.agree} onChange={change}/><span>I agree to be contacted about this project proposal.</span></label>{errors.agree && <span className="ct-error" role="alert">{errors.agree}</span>}</div>
          {errors.submit && <p className="ct-error" role="alert">{errors.submit}</p>}
          <button type="submit" className="ct-btn ct-btn--solid" disabled={busy}><span>{busy ? 'Submitting inquiry…' : 'Submit inquiry & request proposal'}</span><SendIcon size={18}/></button>
        </form>}
      </div>
    </div>
  </section>;
};
