import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';

import { Header } from './components/public/Header';
import { HeroSection } from './components/public/HeroSection';
import { ProjectCatalog } from './components/public/ProjectCatalog';
import { HowItWorksSection } from './components/public/HowItWorksSection';
import { WhyChooseUsSection } from './components/public/WhyChooseUsSection';
import { ContactSection } from './components/public/ContactSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { Footer } from './components/public/Footer';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { Toast } from './components/common/Toast';
import { LiveChatWidget } from './components/common/LiveChatWidget';

const MainAppContent = () => {
  const { isAdminView, isAdminLoggedIn, toggleView, logoutAdmin } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  // Discrete Admin Access: Shortcut (Ctrl+Shift+A or Alt+A) & URL hash (#admin)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Shift + A or Alt + A
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          toggleView();
        } else {
          setIsAuthModalOpen(true);
        }
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        if (isAdminLoggedIn) {
          toggleView();
        } else {
          setIsAuthModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      handleHashChange();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isAdminLoggedIn, toggleView]);

  const handleSelectProject = (projectTitle) => {
    setSelectedProject(projectTitle);
  };

  if (isAdminView && isAdminLoggedIn) {
    return (
      <>
        <AdminLayout />
        <Toast />
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Floating Discrete Admin Bar (Only visible when Harsh is actively logged in) */}
      {isAdminLoggedIn && (
        <div style={{
          position: 'fixed',
          top: '12px',
          right: '16px',
          zIndex: 99999,
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--accent-orange)',
          borderRadius: '30px',
          padding: '0.35rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          fontSize: '0.8rem',
          color: '#FFFFFF'
        }}>
          <span style={{ fontWeight: 700, color: 'var(--accent-orange)' }}>Admin Active</span>
          <button
            onClick={toggleView}
            style={{
              backgroundColor: 'var(--accent-orange)',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.25rem 0.65rem',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Go to Admin Dashboard
          </button>
          <button
            onClick={logoutAdmin}
            style={{
              backgroundColor: 'transparent',
              color: '#EF4444',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      )}

      <Header
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSelectProjectForInquiry={handleSelectProject}
      />

      <main style={{ flex: 1 }}>
        <HeroSection />
        <ProjectCatalog onSelectProjectForInquiry={handleSelectProject} />
        <HowItWorksSection />
        <WhyChooseUsSection />
        <ContactSection
          selectedProjectTitle={selectedProject}
          onClearSelectedProject={() => setSelectedProject('')}
        />
        <PortfolioSection />
      </main>

      <Footer onOpenAuthModal={() => setIsAuthModalOpen(true)} />

      <LiveChatWidget />

      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
