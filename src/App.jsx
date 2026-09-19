import React, { useState } from 'react';
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

const MainAppContent = () => {
  const { isAdminView, isAdminLoggedIn } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

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
