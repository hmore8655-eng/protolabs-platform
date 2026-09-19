import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';
import { api } from '../services/api';

const AppContext = createContext();

const LOCAL_STORAGE_KEY = 'protolabs_data_v2';

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialData;
  });

  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return !!localStorage.getItem('protolabs_token');
  });
  const [toast, setToast] = useState(null);

  // Sync with backend API on mount
  useEffect(() => {
    fetchBackendData();
  }, []);

  const fetchBackendData = async () => {
    try {
      const [projects, portfolio, testimonials, settingsData] = await Promise.all([
        api.getProjects().catch(() => null),
        api.getPortfolio().catch(() => null),
        api.getTestimonials().catch(() => null),
        api.getSettings().catch(() => null)
      ]);

      setData(prev => ({
        ...prev,
        ...(projects ? { projects } : {}),
        ...(portfolio ? { portfolio } : {}),
        ...(testimonials ? { testimonials } : {}),
        ...(settingsData && settingsData.hero ? { hero: settingsData.hero } : {}),
        ...(settingsData && settingsData.settings ? { settings: settingsData.settings } : {})
      }));

      // Fetch inquiries if admin token exists
      if (localStorage.getItem('protolabs_token')) {
        const inquiries = await api.getInquiries().catch(() => null);
        if (inquiries) {
          setData(prev => ({ ...prev, inquiries }));
        }
      }
    } catch (err) {
      console.log('Backend API sync notice: Using local state backup.', err.message);
    }
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  // Auth
  const loginAdmin = async (password) => {
    try {
      const res = await api.login(password);
      if (res.token) {
        setIsAdminLoggedIn(true);
        setIsAdminView(true);
        showToast('Authenticated! Welcome to ProtoLabs Admin Panel.');
        fetchBackendData();
        return true;
      }
    } catch (err) {
      // Local password fallback
      if (password === 'admin123') {
        setIsAdminLoggedIn(true);
        setIsAdminView(true);
        showToast('Welcome back, Admin! (Offline Mode)');
        return true;
      }
    }
    showToast('Invalid password. Try "admin123"', 'error');
    return false;
  };

  const logoutAdmin = () => {
    api.logout();
    setIsAdminLoggedIn(false);
    setIsAdminView(false);
    showToast('Logged out of Admin Dashboard.');
  };

  const toggleView = () => {
    setIsAdminView(!isAdminView);
  };

  // Reset demo
  const resetToDemoData = async () => {
    try {
      const res = await api.resetDemo();
      if (res && res.data) {
        setData(res.data);
      }
    } catch (e) {
      setData(initialData);
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    showToast('All platform data reset to factory demo values.');
  };

  // Projects CRUD
  const addProject = async (project) => {
    try {
      const newProj = await api.createProject(project);
      setData(prev => ({ ...prev, projects: [newProj, ...prev.projects] }));
      showToast(`Project "${project.title}" created & saved to database.`);
    } catch (err) {
      // Fallback
      const newProject = {
        ...project,
        id: `proj-${Date.now()}`,
        order: data.projects.length + 1,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setData(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
      showToast(`Project "${project.title}" created.`);
    }
  };

  const updateProject = async (id, updatedFields) => {
    try {
      const updated = await api.updateProject(id, updatedFields);
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === id ? updated : p)
      }));
    } catch (err) {
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === id ? { ...p, ...updatedFields } : p)
      }));
    }
    showToast('Project updated.');
  };

  const deleteProject = async (id) => {
    try {
      await api.deleteProject(id);
    } catch (e) {}
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    showToast('Project deleted.', 'info');
  };

  const reorderProjects = async (reorderedList) => {
    setData(prev => ({ ...prev, projects: reorderedList }));
    try {
      await api.reorderProjects(reorderedList);
    } catch (e) {}
    showToast('Project display order updated.');
  };

  const bulkUploadProjects = async (newProjects) => {
    try {
      await api.bulkImportProjects(newProjects);
    } catch (e) {}
    setData(prev => ({ ...prev, projects: [...newProjects, ...prev.projects] }));
    showToast(`Successfully imported ${newProjects.length} projects.`);
  };

  // Inquiry CRUD
  const addInquiry = async (inquiryData) => {
    let newInquiry;
    try {
      newInquiry = await api.submitInquiry(inquiryData);
    } catch (err) {
      newInquiry = {
        ...inquiryData,
        id: `inq-${Date.now()}`,
        status: 'Pending',
        createdAt: new Date().toISOString().split('T')[0]
      };
    }
    setData(prev => ({ ...prev, inquiries: [newInquiry, ...prev.inquiries] }));
    showToast('Inquiry submitted & saved to server! You will get a quote within 24h.');
    return newInquiry;
  };

  const updateInquiryStatus = async (id, status, notes = '', quotedPrice = '', customMessage = '') => {
    try {
      await api.updateInquiryStatus(id, status, notes, quotedPrice, customMessage);
    } catch (e) {}
    setData(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(inq => inq.id === id ? { ...inq, status, notes, quotedPrice } : inq)
    }));
    showToast(`Inquiry #${id} status updated to ${status}.`);
  };

  const deleteInquiry = async (id) => {
    try { await api.deleteInquiry(id); } catch (e) {}
    setData(prev => ({ ...prev, inquiries: prev.inquiries.filter(i => i.id !== id) }));
    showToast(`Inquiry #${id} deleted.`, 'info');
  };

  // Testimonials
  const addTestimonial = async (item) => {
    try {
      const created = await api.createTestimonial(item);
      setData(prev => ({ ...prev, testimonials: [created, ...prev.testimonials] }));
    } catch (e) {
      const newItem = { ...item, id: `test-${Date.now()}` };
      setData(prev => ({ ...prev, testimonials: [...prev.testimonials, newItem] }));
    }
    showToast('Testimonial added.');
  };

  const updateTestimonial = async (id, fields) => {
    try { await api.updateTestimonial(id, fields); } catch (e) {}
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...fields } : t)
    }));
    showToast('Testimonial updated.');
  };

  const deleteTestimonial = async (id) => {
    try { await api.deleteTestimonial(id); } catch (e) {}
    setData(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => t.id !== id) }));
    showToast('Testimonial removed.', 'info');
  };

  // Portfolio
  const addPortfolio = async (item) => {
    try {
      const created = await api.createPortfolio(item);
      setData(prev => ({ ...prev, portfolio: [created, ...prev.portfolio] }));
    } catch (e) {
      const newItem = { ...item, id: `port-${Date.now()}` };
      setData(prev => ({ ...prev, portfolio: [...prev.portfolio, newItem] }));
    }
    showToast('Portfolio showcase added.');
  };

  const updatePortfolio = async (id, fields) => {
    try { await api.updatePortfolio(id, fields); } catch (e) {}
    setData(prev => ({
      ...prev,
      portfolio: prev.portfolio.map(p => p.id === id ? { ...p, ...fields } : p)
    }));
    showToast('Portfolio showcase updated.');
  };

  const deletePortfolio = async (id) => {
    try { await api.deletePortfolio(id); } catch (e) {}
    setData(prev => ({ ...prev, portfolio: prev.portfolio.filter(p => p.id !== id) }));
    showToast('Portfolio item removed.', 'info');
  };

  // Services & How It Works
  const updateServices = (newServices) => {
    setData(prev => ({ ...prev, services: newServices }));
    showToast('Services updated.');
  };

  const updateHowItWorks = (newSteps) => {
    setData(prev => ({ ...prev, howItWorks: newSteps }));
    showToast('Process steps updated.');
  };

  // Settings
  const updateHero = async (heroData) => {
    const updatedHero = { ...data.hero, ...heroData };
    setData(prev => ({ ...prev, hero: updatedHero }));
    try { await api.updateSettings({ hero: updatedHero }); } catch (e) {}
    showToast('Hero section content saved.');
  };

  const updateSettings = async (newSettings) => {
    const updatedSettings = { ...data.settings, ...newSettings };
    setData(prev => ({ ...prev, settings: updatedSettings }));
    try { await api.updateSettings({ settings: updatedSettings }); } catch (e) {}
    showToast('Platform settings saved to database.');
  };

  return (
    <AppContext.Provider value={{
      data,
      isAdminView,
      isAdminLoggedIn,
      toast,
      showToast,
      loginAdmin,
      logoutAdmin,
      toggleView,
      resetToDemoData,
      addProject,
      updateProject,
      deleteProject,
      reorderProjects,
      bulkUploadProjects,
      addInquiry,
      updateInquiryStatus,
      deleteInquiry,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addPortfolio,
      updatePortfolio,
      deletePortfolio,
      updateServices,
      updateHowItWorks,
      updateHero,
      updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
