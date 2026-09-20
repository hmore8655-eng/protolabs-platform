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
      const res = await api.login(password, 'protolabs26@gmail.com');
      if (res && res.token) {
        setIsAdminLoggedIn(true);
        setIsAdminView(true);
        localStorage.setItem('protolabs_token', res.token);
        showToast('Authenticated! Welcome Harsh More (Admin).');
        await fetchBackendData();
        return true;
      }
    } catch (err) {
      console.warn('Backend login attempt:', err.message);
    }
    showToast('Invalid admin password', 'error');
    return false;
  };

  const loginAdminWithGoogle = async (credential) => {
    try {
      const res = await api.loginWithGoogle(credential);
      if (res && res.token) {
        setIsAdminLoggedIn(true);
        setIsAdminView(true);
        localStorage.setItem('protolabs_token', res.token);
        showToast(`Google Verified! Welcome ${res.user?.name || 'Harsh More'} (Admin).`);
        await fetchBackendData();
        return { success: true };
      }
      return { success: false, error: res?.error || 'Authentication failed' };
    } catch (err) {
      const msg = err.message || 'Google authentication failed';
      showToast(msg, 'error');
      return { success: false, error: msg };
    }
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

  const restoreBackup = async (backupPayload) => {
    try {
      const res = await api.restoreBackup(backupPayload);
      if (res && res.data) {
        setData(res.data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res.data));
      }
      showToast('Platform data restored successfully!');
      return true;
    } catch (err) {
      showToast(`Restore failed: ${err.message}`, 'error');
      return false;
    }
  };

  const refreshData = () => fetchBackendData();

  // Projects CRUD with double persistence (API + Local Storage)
  const addProject = async (project) => {
    try {
      const newProj = await api.createProject(project);
      setData(prev => {
        const nextProjects = [newProj, ...prev.projects];
        const nextData = { ...prev, projects: nextProjects };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));
        return nextData;
      });
      showToast(`Project "${project.title}" created & saved.`);
    } catch (err) {
      const newProject = {
        ...project,
        id: `proj-${Date.now()}`,
        order: data.projects.length + 1,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setData(prev => {
        const nextProjects = [newProject, ...prev.projects];
        const nextData = { ...prev, projects: nextProjects };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));
        return nextData;
      });
      showToast(`Project "${project.title}" created.`);
    }
  };

  const updateProject = async (id, updatedFields) => {
    try {
      const updated = await api.updateProject(id, updatedFields);
      setData(prev => {
        const nextProjects = prev.projects.map(p => p.id === id ? (updated || { ...p, ...updatedFields }) : p);
        const nextData = { ...prev, projects: nextProjects };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));
        return nextData;
      });
      showToast('Project updated & saved permanently.');
    } catch (err) {
      console.warn('API update failed, saving locally:', err);
      setData(prev => {
        const nextProjects = prev.projects.map(p => p.id === id ? { ...p, ...updatedFields } : p);
        const nextData = { ...prev, projects: nextProjects };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));
        return nextData;
      });
      showToast('Project updated.');
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.deleteProject(id);
    } catch (e) {}
    setData(prev => {
      const nextProjects = prev.projects.filter(p => p.id !== id);
      const nextData = { ...prev, projects: nextProjects };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));
      return nextData;
    });
    showToast('Project deleted.', 'info');
  };

  const reorderProjects = async (reorderedList) => {
    setData(prev => {
      const nextData = { ...prev, projects: reorderedList };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));
      return nextData;
    });
    try {
      await api.reorderProjects(reorderedList);
    } catch (e) {}
    showToast('Project display order updated.');
  };

  const bulkUploadProjects = async (newProjects) => {
    try {
      await api.bulkImportProjects(newProjects);
    } catch (e) {}
    setData(prev => {
      const nextProjects = [...newProjects, ...prev.projects];
      const nextData = { ...prev, projects: nextProjects };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));
      return nextData;
    });
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
      loginAdminWithGoogle,
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
      updateSettings,
      restoreBackup,
      refreshData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
