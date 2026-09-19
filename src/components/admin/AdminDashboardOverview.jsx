import React from 'react';
import { LayersIcon, MailIcon, ClockIcon, StarIcon, PlusIcon, RefreshIcon, EyeIcon, ArrowRightIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

export const AdminDashboardOverview = ({ setActiveTab }) => {
  const { data, updateInquiryStatus, resetToDemoData, toggleView } = useApp();
  const { projects, inquiries, portfolio, testimonials } = data;

  const pendingInquiries = inquiries.filter(i => i.status === 'Pending').length;
  const quotedInquiries = inquiries.filter(i => i.status === 'Quoted').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* Metric 1 */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Inquiries</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '0.2rem' }}>
              {inquiries.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-dark-orange)', marginTop: '0.25rem', fontWeight: 600 }}>
              {pendingInquiries} Pending Proposals
            </div>
          </div>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--accent-light-orange)',
            color: 'var(--accent-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MailIcon size={24} />
          </div>
        </div>

        {/* Metric 2 */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Listed Projects</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '0.2rem' }}>
              {projects.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '0.25rem', fontWeight: 600 }}>
              {projects.filter(p => p.published).length} Published Live
            </div>
          </div>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#DCFCE7',
            color: '#15803D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <LayersIcon size={24} />
          </div>
        </div>

        {/* Metric 3 */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Quotes</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '0.2rem' }}>
              {quotedInquiries}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#3B82F6', marginTop: '0.25rem', fontWeight: 600 }}>
              Sent to Clients
            </div>
          </div>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#E0F2FE',
            color: '#0369A1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ClockIcon size={24} />
          </div>
        </div>

        {/* Metric 4 */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Portfolio & Reviews</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '0.2rem' }}>
              {portfolio.length} / {testimonials.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Showcase Items & Stars
            </div>
          </div>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#FEF3C7',
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <StarIcon size={24} />
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-dark)' }}>
          Quick Admin Actions
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button onClick={() => setActiveTab('projects')} className="btn btn-primary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}>
            <PlusIcon size={16} />
            <span>Add New Project</span>
          </button>

          <button onClick={() => setActiveTab('inquiries')} className="btn btn-secondary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}>
            <MailIcon size={16} />
            <span>View Inquiries ({pendingInquiries})</span>
          </button>

          <button onClick={() => setActiveTab('settings')} className="btn btn-secondary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}>
            <span>Edit Hero & Settings</span>
          </button>

          <button onClick={toggleView} className="btn btn-outline" style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}>
            <EyeIcon size={16} />
            <span>Preview Public Site</span>
          </button>

          <button onClick={resetToDemoData} className="btn btn-secondary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem', color: '#EF4444' }}>
            <RefreshIcon size={16} />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Recent Inquiries Feed Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)' }}>Recent Inquiry Leads</h3>
          <button onClick={() => setActiveTab('inquiries')} style={{ fontSize: '0.875rem', color: 'var(--accent-orange)', fontWeight: 600 }}>
            View All ({inquiries.length}) →
          </button>
        </div>

        {inquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No inquiry submissions found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Client Name</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Project / Scope</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Timeline & Budget</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Submitted</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Quick Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map(inq => (
                  <tr key={inq.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                      <div>{inq.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>{inq.email}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className="badge badge-orange" style={{ marginBottom: '0.2rem' }}>{inq.projectType}</span>
                      <div style={{ fontSize: '0.85rem' }}>{inq.selectedProject}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <div>{inq.timeline}</div>
                      <div style={{ fontWeight: 600, color: 'var(--accent-dark-orange)' }}>{inq.budget}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className={`badge ${
                        inq.status === 'Pending' ? 'badge-orange' :
                        inq.status === 'Quoted' ? 'badge-blue' :
                        inq.status === 'Completed' ? 'badge-green' : 'badge-gray'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {inq.createdAt}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                        className="form-select"
                        style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
