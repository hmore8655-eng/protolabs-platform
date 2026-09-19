import React, { useState } from 'react';
import { CpuIcon, LayersIcon, MailIcon, StarIcon, EyeIcon, SlidersIcon, LockIcon, RefreshIcon, MessageSquareIcon } from '../common/Icons';
import { ProtoLabsIcon } from '../common/ProtoLabsLogo';
import { useApp } from '../../context/AppContext';

import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminProjectsManager } from './AdminProjectsManager';
import { AdminInquiriesManager } from './AdminInquiriesManager';
import { AdminChatManager } from './AdminChatManager';
import { AdminTestimonialsManager } from './AdminTestimonialsManager';
import { AdminPortfolioManager } from './AdminPortfolioManager';
import { AdminServicesManager } from './AdminServicesManager';
import { AdminSettings } from './AdminSettings';

export const AdminLayout = () => {
  const { data, toggleView, logoutAdmin, resetToDemoData } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const pendingInquiriesCount = data.inquiries.filter(i => i.status === 'Pending').length;

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: CpuIcon },
    { id: 'chats', label: 'Live Client Chats', icon: MessageSquareIcon, badge: 'LIVE', badgeColor: 'orange' },
    { id: 'projects', label: 'Projects & Pricing', icon: LayersIcon, badge: data.projects.length },
    { id: 'inquiries', label: 'Inquiries & Quotes', icon: MailIcon, badge: pendingInquiriesCount > 0 ? pendingInquiriesCount : null, badgeColor: 'orange' },
    { id: 'services', label: 'Services & Process', icon: SlidersIcon },
    { id: 'portfolio', label: 'Portfolio Showcase', icon: EyeIcon, badge: data.portfolio.length },
    { id: 'testimonials', label: 'Client Reviews', icon: StarIcon, badge: data.testimonials.length },
    { id: 'settings', label: 'Site Settings & Hero', icon: SlidersIcon },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
      {/* Admin Top Header */}
      <header style={{
        height: '76px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ProtoLabsIcon size={34} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.3px', color: 'var(--text-dark)' }}>
                Proto<span style={{ color: 'var(--accent-orange)' }}>Labs</span>
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                ADMIN CONTROL PANEL
              </span>
            </div>
          </div>

          <span className="badge badge-orange" style={{ fontSize: '0.75rem', marginLeft: '0.5rem' }}>
            FULL CRUD PRICING POWER
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleView}
            className="btn btn-outline"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
          >
            <EyeIcon size={16} />
            <span>Switch to Live Public Site</span>
          </button>

          <button
            onClick={logoutAdmin}
            style={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: 700, padding: '0.5rem' }}
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Admin Content Layout */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{
          width: '270px',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid var(--border-color)',
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', padding: '0 0.75rem 0.5rem 0.75rem', letterSpacing: '0.5px' }}>
              ADMIN CONTROLS
            </div>

            {menuItems.map(item => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    backgroundColor: isActive ? 'var(--accent-light-orange)' : 'transparent',
                    color: isActive ? 'var(--accent-dark-orange)' : 'var(--text-dark)',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <IconComp size={18} color={isActive ? 'var(--accent-dark-orange)' : 'var(--text-muted)'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge !== null && (
                    <span className={`badge ${item.badgeColor === 'orange' ? 'badge-orange' : 'badge-gray'}`} style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div style={{
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <button
              onClick={resetToDemoData}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '0.6rem', fontSize: '0.8rem', color: '#EF4444' }}
            >
              <RefreshIcon size={14} />
              <span>Reset Factory Data</span>
            </button>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'center' }}>
              ProtoLabs Admin Engine v2.5
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '2rem', maxWidth: '1400px' }}>
          {activeTab === 'overview' && <AdminDashboardOverview setActiveTab={setActiveTab} />}
          {activeTab === 'chats' && <AdminChatManager />}
          {activeTab === 'projects' && <AdminProjectsManager />}
          {activeTab === 'inquiries' && <AdminInquiriesManager />}
          {activeTab === 'services' && <AdminServicesManager />}
          {activeTab === 'portfolio' && <AdminPortfolioManager />}
          {activeTab === 'testimonials' && <AdminTestimonialsManager />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};
