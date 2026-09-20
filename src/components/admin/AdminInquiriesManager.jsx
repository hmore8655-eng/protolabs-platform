import React, { useState } from 'react';
import { MailIcon, SearchIcon, FilterIcon, DownloadIcon, TrashIcon, SendIcon, XIcon, CheckCircleIcon, SparklesIcon } from '../common/Icons';
import { useApp } from '../../context/AppContext';

export const AdminInquiriesManager = () => {
  const { data, updateInquiryStatus, deleteInquiry, showToast } = useApp();
  const { inquiries, settings } = data;

  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInquiry, setActiveInquiry] = useState(null);

  // Proposal modal state
  const [quotePrice, setQuotePrice] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const filteredInquiries = inquiries.filter(inq => {
    if (filterStatus !== 'All' && inq.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.selectedProject.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (inquiry) => {
    setActiveInquiry(inquiry);
    setQuotePrice(inquiry.quotedPrice || '');
    setInternalNotes(inquiry.notes || '');
    setReplyMessage(
      `Hello ${inquiry.name},\n\nThank you for reaching out regarding "${inquiry.selectedProject}".\n\n` +
      `We have reviewed your project requirements:\n"${inquiry.description || 'Standard catalog package.'}"\n\n` +
      `Our technical quote for this deliverable is ${inquiry.quotedPrice || '₹4,999'}.\nEstimated completion timeframe: ${inquiry.timeline}.\n\n` +
      `Payment details:\n${settings.paymentDetails}\n\nPlease let us know if you'd like to proceed with milestone confirmation.`
    );
  };

  const handleSendQuoteResponse = () => {
    if (!activeInquiry) return;
    updateInquiryStatus(activeInquiry.id, 'Quoted', internalNotes, quotePrice);
    showToast(`Proposal email sent to ${activeInquiry.email}! Inquiry marked as Quoted.`);
    setActiveInquiry(null);
  };

  const handleExportInquiriesCSV = () => {
    const headers = ['ID', 'Client Name', 'Email', 'Phone', 'Project Type', 'Selected Project', 'Timeline', 'Budget', 'Status', 'Quoted Price', 'Created Date'];
    const rows = inquiries.map(i => [
      i.id,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone || ''}"`,
      `"${i.projectType}"`,
      `"${i.selectedProject.replace(/"/g, '""')}"`,
      `"${i.timeline}"`,
      `"${i.budget}"`,
      i.status,
      `"${i.quotedPrice || ''}"`,
      i.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `entc_inquiries_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: '#FFFFFF',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--text-dark)' }}>Client Inquiries & Quote Proposals</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Review incoming lead submissions, change milestone status, compose manual quotes, or export reports.
          </p>
        </div>

        <button onClick={handleExportInquiriesCSV} className="btn btn-outline" style={{ padding: '0.65rem 1rem', fontSize: '0.875rem' }}>
          <DownloadIcon size={16} />
          <span>Export Inquiries CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--secondary-bg)',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['All', 'Pending', 'Quoted', 'Completed', 'Archived'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: 600,
                backgroundColor: filterStatus === status ? 'var(--accent-orange)' : '#FFFFFF',
                color: filterStatus === status ? '#FFFFFF' : 'var(--text-dark)',
                border: filterStatus === status ? '1px solid var(--accent-orange)' : '1px solid var(--border-color)'
              }}
            >
              {status} {status !== 'All' && `(${inquiries.filter(i => i.status === status).length})`}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <input
            type="text"
            placeholder="Search by name, email, project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.4rem', padding: '0.45rem 0.75rem 0.45rem 2.4rem', fontSize: '0.85rem' }}
          />
          <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
            <SearchIcon size={16} />
          </div>
        </div>
      </div>

      {/* Table of Inquiries */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {filteredInquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No inquiry leads match this filter.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--secondary-bg)', color: 'var(--text-muted)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Client Details</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Requested Scope</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Timeline & Budget</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Submitted</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map(inq => (
                  <tr key={inq.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{inq.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inq.email}</div>
                      {inq.phone && <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{inq.phone}</div>}
                    </td>

                    <td style={{ padding: '0.85rem 1rem', maxWidth: '280px' }}>
                      <span className="badge badge-orange" style={{ marginBottom: '0.2rem' }}>{inq.projectType}</span>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{inq.selectedProject}</div>
                      {inq.description && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {inq.description}
                        </div>
                      )}
                    </td>

                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem' }}>
                      <div>{inq.timeline}</div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-dark-orange)' }}>{inq.budget}</div>
                      {inq.quotedPrice && (
                        <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>Quoted: {inq.quotedPrice}</div>
                      )}
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
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

                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {inq.createdAt}
                    </td>

                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleOpenDetail(inq)}
                          className="btn btn-primary"
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                        >
                          <MailIcon size={14} />
                          <span>Quote Reply</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Remove inquiry from ${inq.name}?`)) {
                              deleteInquiry(inq.id);
                            }
                          }}
                          style={{ padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2' }}
                          title="Delete Lead"
                        >
                          <TrashIcon size={14} color="#EF4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quote Composer & Detail Modal */}
      {activeInquiry && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '2rem', maxWidth: '680px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--accent-light-orange)',
                  color: 'var(--accent-dark-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MailIcon size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>Quote Composer & Proposal</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Inquiry ID: {activeInquiry.id}</div>
                </div>
              </div>
              <button onClick={() => setActiveInquiry(null)} style={{ color: 'var(--text-light)' }}>
                <XIcon size={20} />
              </button>
            </div>

            {/* Client summary box */}
            <div style={{
              backgroundColor: 'var(--secondary-bg)',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div><strong>Client:</strong> {activeInquiry.name} ({activeInquiry.email})</div>
                <div><strong>Phone:</strong> {activeInquiry.phone || 'N/A'}</div>
                <div><strong>Project:</strong> {activeInquiry.selectedProject}</div>
                <div><strong>Budget / Timeline:</strong> {activeInquiry.budget} | {activeInquiry.timeline}</div>
              </div>
              {activeInquiry.description && (
                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <strong>Client Specs:</strong> "{activeInquiry.description}"
                </div>
              )}
            </div>

            {/* Quote Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Quoted Milestone Price (₹ INR)</label>
                <input
                  type="text"
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(e.target.value)}
                  className="form-input"
                  placeholder="e.g. ₹4,999 or ₹12,500"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Internal Admin Notes</label>
                <input
                  type="text"
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  className="form-input"
                  placeholder="e.g. KiCAD Gerber files reviewed."
                />
              </div>
            </div>

            {/* Email Composer Textarea */}
            <div className="form-group">
              <label className="form-label">Custom Quote Proposal Email Body</label>
              <textarea
                rows="6"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="form-textarea"
                style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button type="button" onClick={() => setActiveInquiry(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button type="button" onClick={handleSendQuoteResponse} className="btn btn-primary" style={{ gap: '0.5rem' }}>
                <SendIcon size={16} />
                <span>Mark Quoted & Send Response</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
