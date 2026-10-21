import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';

import { Header } from './components/public/Header';
import { HeroSection } from './components/public/HeroSection';
import { ProjectCatalog } from './components/public/ProjectCatalog';
import { WhyChooseUsSection } from './components/public/WhyChooseUsSection';
import { ContactSection } from './components/public/ContactSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { PortfolioPage } from './components/public/PortfolioPage';
import { CapabilitiesPage } from './components/public/CapabilitiesPage';
import { StudioPage } from './components/public/StudioPage';
import { ProjectDetailPage } from './components/public/ProjectDetailPage';
import { Footer } from './components/public/Footer';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { Toast } from './components/common/Toast';
import { LiveChatWidget } from './components/common/LiveChatWidget';

const MainAppContent = () => {
  const { isAdminView, isAdminLoggedIn, toggleView, logoutAdmin } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(() => new URLSearchParams(window.location.search).get('project') || '');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) toggleView();
        else setIsAuthModalOpen(true);
      }
    };
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        if (isAdminLoggedIn) toggleView();
        else setIsAuthModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash === '#admin' || window.location.pathname === '/admin') handleHashChange();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isAdminLoggedIn, toggleView]);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || !('IntersectionObserver' in window) || window.location.pathname === '/portfolio') return;
    main.classList.add('reveal-ready');
    const targets = Array.from(main.children);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });
    targets.forEach((target, index) => {
      target.classList.add('scroll-reveal');
      target.style.setProperty('--reveal-delay', `${Math.min(index * 90, 270)}ms`);
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  const handleSelectProject = (projectTitle) => setSelectedProject(projectTitle);

  if (isAdminView && isAdminLoggedIn) {
    return <><AdminLayout /><Toast /></>;
  }

  const projectDetailMatch = window.location.pathname.match(/^\/project\/([^/]+)\/?$/);
  if (projectDetailMatch) {
    return (
      <>
        <ProjectDetailPage projectId={decodeURIComponent(projectDetailMatch[1])} />
        <LiveChatWidget />
        <AdminAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <Toast />
      </>
    );
  }

  if (window.location.pathname.replace(/\/$/, '') === '/studio') {
    return (
      <>
        {isAdminLoggedIn && <div style={{position:'fixed',top:12,right:16,zIndex:99999,display:'flex',gap:'.6rem',alignItems:'center',padding:'.5rem .8rem',background:'#292b29',color:'#f4eedf',border:'1px solid var(--accent-orange)'}}>
          <span style={{fontSize:'.8rem',fontWeight:700}}>Admin Active</span>
          <button onClick={toggleView} style={{color:'#f4eedf'}}>Dashboard</button>
          <button onClick={logoutAdmin} style={{color:'#e87962'}}>Logout</button>
        </div>}
        <StudioPage />
        <LiveChatWidget />
        <AdminAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <Toast />
      </>
    );
  }

  if (window.location.pathname.replace(/\/$/, '') === '/capabilities') {
    return (
      <>
        {isAdminLoggedIn && <div style={{position:'fixed',top:12,right:16,zIndex:99999,display:'flex',gap:'.6rem',alignItems:'center',padding:'.5rem .8rem',background:'#292b29',color:'#f4eedf',border:'1px solid var(--accent-orange)'}}>
          <span style={{fontSize:'.8rem',fontWeight:700}}>Admin Active</span>
          <button onClick={toggleView} style={{color:'#f4eedf'}}>Dashboard</button>
          <button onClick={logoutAdmin} style={{color:'#e87962'}}>Logout</button>
        </div>}
        <CapabilitiesPage />
        <LiveChatWidget />
        <AdminAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <Toast />
      </>
    );
  }

  if (window.location.pathname.replace(/\/$/, '') === '/portfolio') {
    return (
      <>
        {isAdminLoggedIn && <div style={{position:'fixed',top:12,right:16,zIndex:99999,display:'flex',gap:'.6rem',alignItems:'center',padding:'.5rem .8rem',background:'#292b29',color:'#f4eedf',border:'1px solid var(--accent-orange)'}}>
          <span style={{fontSize:'.8rem',fontWeight:700}}>Admin Active</span>
          <button onClick={toggleView} style={{color:'#f4eedf'}}>Dashboard</button>
          <button onClick={logoutAdmin} style={{color:'#e87962'}}>Logout</button>
        </div>}
        <PortfolioPage />
        <LiveChatWidget />
        <AdminAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <Toast />
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {isAdminLoggedIn && (
        <div style={{position:'fixed',top:'12px',right:'16px',zIndex:99999,backgroundColor:'rgba(17,24,20,.95)',backdropFilter:'blur(8px)',border:'1px solid var(--accent-orange)',borderRadius:'30px',padding:'.35rem .85rem',display:'flex',alignItems:'center',gap:'.6rem',boxShadow:'0 4px 15px rgba(0,0,0,.3)',fontSize:'.8rem',color:'#FFFFFF'}}>
          <span style={{fontWeight:700,color:'var(--accent-orange)'}}>Admin Active</span>
          <button
            onClick={toggleView}
            style={{
              backgroundColor: "var(--accent-orange)",
              color: "#FFFFFF",
              padding: ".25rem .65rem",
              borderRadius: "20px",
              fontWeight: 700,
              fontSize: ".75rem",
            }}
          >
            Go to Admin Dashboard
          </button>
          <button
            onClick={logoutAdmin}
            style={{
              backgroundColor: "transparent",
              color: "#EF4444",
              fontWeight: 700,
              fontSize: ".75rem",
            }}
          >
            Logout
          </button>
        </div>
      )}
      <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} onSelectProjectForInquiry={handleSelectProject} />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <ProjectCatalog onSelectProjectForInquiry={handleSelectProject} />
        <WhyChooseUsSection />
        <ContactSection selectedProjectTitle={selectedProject} onClearSelectedProject={() => setSelectedProject('')} />
        <PortfolioSection />
      </main>
      <Footer onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      <LiveChatWidget />
      <AdminAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <Toast />
    </div>
  );
};

export default function App() {
  return <AppProvider><MainAppContent /></AppProvider>;
}
