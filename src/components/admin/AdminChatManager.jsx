import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquareIcon, 
  SendIcon, 
  RefreshIcon, 
  UserIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  TrashIcon, 
  EyeIcon, 
  EyeOffIcon, 
  SearchIcon, 
  XIcon, 
  AlertCircleIcon 
} from '../common/Icons';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminChatManager = () => {
  const { showToast } = useApp();
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState('');
  const [activeMessages, setActiveMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreedBudget, setAgreedBudget] = useState('');
  const [agreedTimeline, setAgreedTimeline] = useState('');
  
  // Filtering & Search
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'unseen' | 'seen'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Delete Modal State
  const [threadToDelete, setThreadToDelete] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchThreads();
    const interval = setInterval(fetchThreads, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let messageInterval;
    if (activeThreadId) {
      fetchActiveMessages();
      messageInterval = setInterval(fetchActiveMessages, 3000);
    }
    return () => clearInterval(messageInterval);
  }, [activeThreadId]);

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages]);

  // Auto-mark conversation as seen when opened by Admin
  useEffect(() => {
    if (!activeThreadId) return;
    const current = threads.find(t => t.id === activeThreadId);
    if (current && (current.isSeen === false || (current.unreadCount && current.unreadCount > 0))) {
      const timer = setTimeout(async () => {
        try {
          await api.markChatThreadSeen(activeThreadId, true);
          setThreads(prev => prev.map(t => t.id === activeThreadId ? { ...t, isSeen: true, unreadCount: 0 } : t));
        } catch (e) {
          // silently handle background auto-mark
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [activeThreadId, threads]);

  const fetchThreads = async () => {
    try {
      const data = await api.getChatThreads();
      if (Array.isArray(data)) {
        setThreads(data);
        if (!activeThreadId && data.length > 0) {
          setActiveThreadId(data[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch chat threads:', err);
    }
  };

  const fetchActiveMessages = async () => {
    if (!activeThreadId) return;
    try {
      const data = await api.getChatMessages(activeThreadId);
      if (Array.isArray(data)) {
        setActiveMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch messages for thread:', err);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Toggle Seen / Unseen
  const handleToggleSeen = async (threadId, currentStatus, e) => {
    if (e) e.stopPropagation();
    const newStatus = !currentStatus;
    try {
      await api.markChatThreadSeen(threadId, newStatus);
      setThreads(prev => prev.map(t => 
        t.id === threadId 
          ? { ...t, isSeen: newStatus, unreadCount: newStatus ? 0 : 1 } 
          : t
      ));
      showToast(`Conversation marked as ${newStatus ? 'Seen' : 'Unseen'}.`);
    } catch (err) {
      console.error('Failed to toggle seen status:', err);
      showToast('Failed to update conversation status', 'error');
    }
  };

  // Delete Conversation
  const confirmDeleteThread = async () => {
    if (!threadToDelete) return;
    const idToDelete = threadToDelete.id;
    try {
      setIsLoading(true);
      await api.deleteChatThread(idToDelete);
      const updated = threads.filter(t => t.id !== idToDelete);
      setThreads(updated);
      if (activeThreadId === idToDelete) {
        setActiveThreadId(updated.length > 0 ? updated[0].id : '');
        setActiveMessages([]);
      }
      showToast(`Deleted conversation with ${threadToDelete.clientName}.`);
      setThreadToDelete(null);
    } catch (err) {
      console.error('Failed to delete conversation:', err);
      showToast('Failed to delete conversation', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReply = async (customText = null) => {
    const textToSend = customText || replyText;
    if (!textToSend.trim() || !activeThreadId) return;

    if (!customText) setReplyText('');
    setIsLoading(true);

    try {
      const newMsg = await api.sendChatMessage({
        threadId: activeThreadId,
        sender: 'admin',
        senderName: 'ProtoLabs Engineer',
        text: textToSend
      });

      if (newMsg && newMsg.id) {
        setActiveMessages((prev) => {
          if (prev.some(m => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
        // Outgoing reply marks current thread as seen
        setThreads(prev => prev.map(t => t.id === activeThreadId ? { ...t, isSeen: true, unreadCount: 0 } : t));
      }
      await fetchThreads();
    } catch (err) {
      console.error('Admin reply error:', err);
      showToast('Failed to send admin reply', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAgreement = () => {
    if (!agreedBudget && !agreedTimeline) {
      showToast('Please enter an agreed budget or timeline', 'error');
      return;
    }
    const agreementMsg = `🤝 Admin Official Offer / Agreement:\n• Agreed Budget: ${agreedBudget || 'To be finalized'}\n• Agreed Delivery Timeline: ${agreedTimeline || 'Flexible'}\n\nPlease reply to accept these terms or request minor revisions.`;
    handleSendReply(agreementMsg);
    setAgreedBudget('');
    setAgreedTimeline('');
    showToast('Sent official terms agreement to client chat!');
  };

  // Filtered threads logic
  const filteredThreads = threads.filter(t => {
    const isSeen = t.isSeen !== false && (!t.unreadCount || t.unreadCount === 0);
    if (filterTab === 'unseen' && isSeen) return false;
    if (filterTab === 'seen' && !isSeen) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (t.clientName || '').toLowerCase().includes(q);
      const matchEmail = (t.clientEmail || '').toLowerCase().includes(q);
      const matchMsg = (t.lastMessage || '').toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchMsg) return false;
    }
    return true;
  });

  const unseenCount = threads.filter(t => t.isSeen === false || (t.unreadCount && t.unreadCount > 0)).length;
  const seenCount = threads.length - unseenCount;

  const activeThread = threads.find((t) => t.id === activeThreadId);
  const isActiveThreadSeen = activeThread ? (activeThread.isSeen !== false && (!activeThread.unreadCount || activeThread.unreadCount === 0)) : false;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1.5rem', height: '670px', position: 'relative' }}>
      
      {/* Sidebar: Threads List & Controls */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        {/* Top Header */}
        <div style={{
          padding: '1rem 1.25rem',
          backgroundColor: '#111827',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid var(--accent-orange)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.95rem' }}>
            <MessageSquareIcon size={18} color="var(--accent-orange)" />
            <span>Client Live Chats</span>
            {unseenCount > 0 && (
              <span style={{
                backgroundColor: 'var(--accent-orange)',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '0.1rem 0.45rem',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                {unseenCount}
              </span>
            )}
          </div>
          <button 
            onClick={fetchThreads} 
            title="Refresh Threads"
            style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.2rem' }}
          >
            <RefreshIcon size={16} />
          </button>
        </div>

        {/* Filter Tabs: All, Unseen, Seen */}
        <div style={{
          display: 'flex',
          backgroundColor: '#F3F4F6',
          padding: '0.35rem',
          gap: '0.25rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => setFilterTab('all')}
            style={{
              flex: 1,
              padding: '0.4rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: filterTab === 'all' ? 700 : 500,
              backgroundColor: filterTab === 'all' ? '#FFFFFF' : 'transparent',
              color: filterTab === 'all' ? 'var(--text-dark)' : 'var(--text-muted)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              boxShadow: filterTab === 'all' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s'
            }}
          >
            All ({threads.length})
          </button>
          <button
            onClick={() => setFilterTab('unseen')}
            style={{
              flex: 1,
              padding: '0.4rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: filterTab === 'unseen' ? 700 : 500,
              backgroundColor: filterTab === 'unseen' ? '#FFFFFF' : 'transparent',
              color: filterTab === 'unseen' ? '#D97706' : 'var(--text-muted)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              boxShadow: filterTab === 'unseen' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s'
            }}
          >
            {unseenCount > 0 && (
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#D97706' }}></span>
            )}
            Unseen ({unseenCount})
          </button>
          <button
            onClick={() => setFilterTab('seen')}
            style={{
              flex: 1,
              padding: '0.4rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: filterTab === 'seen' ? 700 : 500,
              backgroundColor: filterTab === 'seen' ? '#FFFFFF' : 'transparent',
              color: filterTab === 'seen' ? '#059669' : 'var(--text-muted)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              boxShadow: filterTab === 'seen' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s'
            }}
          >
            Seen ({seenCount})
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ padding: '0.6rem 0.85rem', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <SearchIcon size={14} color="#9CA3AF" style={{ position: 'absolute', left: '10px' }} />
            <input
              type="text"
              placeholder="Search by client or text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 1.8rem 0.45rem 2rem',
                fontSize: '0.8rem',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                backgroundColor: '#F9FAFB',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0 }}
              >
                <XIcon size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Threads List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredThreads.length === 0 ? (
            <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {searchQuery ? 'No chats match your search.' : filterTab === 'unseen' ? 'No unseen client chats! All caught up.' : 'No conversations found.'}
            </div>
          ) : (
            filteredThreads.map((t) => {
              const isSelected = t.id === activeThreadId;
              const isSeen = t.isSeen !== false && (!t.unreadCount || t.unreadCount === 0);

              return (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'rgba(255, 149, 0, 0.09)' : isSeen ? 'transparent' : '#FFFDF7',
                    borderLeft: isSelected ? '4px solid var(--accent-orange)' : !isSeen ? '4px solid #F59E0B' : '4px solid transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <div style={{
                      fontWeight: isSeen ? 600 : 800,
                      color: isSeen ? 'var(--text-dark)' : '#111827',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}>
                      <span>{t.clientName}</span>
                      {!isSeen && (
                        <span style={{
                          backgroundColor: '#FEF3C7',
                          color: '#B45309',
                          border: '1px solid #FDE68A',
                          borderRadius: '10px',
                          padding: '0.05rem 0.4rem',
                          fontSize: '0.65rem',
                          fontWeight: 700
                        }}>
                          Unseen
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {t.lastActivity ? new Date(t.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {t.clientEmail}
                  </div>

                  <div style={{
                    fontSize: '0.78rem',
                    color: isSeen ? '#4B5563' : '#1F2937',
                    fontWeight: isSeen ? 400 : 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '0.5rem'
                  }}>
                    {t.lastMessage || 'Started inquiry conversation'}
                  </div>

                  {/* Inline Thread Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.2rem', borderTop: '1px dashed rgba(0,0,0,0.06)' }}>
                    {/* Seen/Unseen toggle badge button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleSeen(t.id, isSeen, e)}
                      title={isSeen ? "Click to mark as Unseen" : "Click to mark as Seen"}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.72rem',
                        color: isSeen ? '#059669' : '#D97706',
                        fontWeight: 600
                      }}
                    >
                      {isSeen ? (
                        <>
                          <EyeOffIcon size={13} color="#059669" />
                          <span>Mark Unseen</span>
                        </>
                      ) : (
                        <>
                          <EyeIcon size={13} color="#D97706" />
                          <span>Mark Seen</span>
                        </>
                      )}
                    </button>

                    {/* Delete Thread Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setThreadToDelete(t);
                      }}
                      title="Delete Conversation"
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '0.15rem 0.35rem',
                        cursor: 'pointer',
                        color: '#9CA3AF',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.72rem',
                        transition: 'all 0.15s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#DC2626'; e.currentTarget.style.backgroundColor = '#FEE2E2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <TrashIcon size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Workspace */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        {activeThread ? (
          <>
            {/* Header with status badges and actions */}
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: 'var(--secondary-bg)',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span>{activeThread.clientName}</span>
                  {isActiveThreadSeen ? (
                    <span style={{
                      backgroundColor: '#ECFDF5',
                      color: '#047857',
                      border: '1px solid #A7F3D0',
                      borderRadius: '12px',
                      padding: '0.15rem 0.55rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <CheckCircleIcon size={12} />
                      Seen
                    </span>
                  ) : (
                    <span style={{
                      backgroundColor: '#FEF3C7',
                      color: '#B45309',
                      border: '1px solid #FDE68A',
                      borderRadius: '12px',
                      padding: '0.15rem 0.55rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D97706' }}></span>
                      Unseen
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Email: {activeThread.clientEmail} • Thread ID: <code style={{ fontSize: '0.75rem', backgroundColor: '#E5E7EB', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>{activeThread.id}</code>
                </div>
              </div>

              {/* Action Controls & Propose Terms */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {/* Toggle Seen Button */}
                <button
                  onClick={() => handleToggleSeen(activeThread.id, isActiveThreadSeen)}
                  className="btn btn-secondary"
                  title={isActiveThreadSeen ? "Mark as Unseen" : "Mark as Seen"}
                  style={{
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.775rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: isActiveThreadSeen ? '#4B5563' : '#D97706',
                    borderColor: isActiveThreadSeen ? 'var(--border-color)' : '#F59E0B'
                  }}
                >
                  {isActiveThreadSeen ? (
                    <>
                      <EyeOffIcon size={14} />
                      <span>Mark as Unseen</span>
                    </>
                  ) : (
                    <>
                      <EyeIcon size={14} />
                      <span>Mark as Seen</span>
                    </>
                  )}
                </button>

                {/* Delete Conversation Button */}
                <button
                  onClick={() => setThreadToDelete(activeThread)}
                  className="btn"
                  title="Permanently delete this chat conversation"
                  style={{
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.775rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: '#FEE2E2',
                    color: '#DC2626',
                    border: '1px solid #FCA5A5',
                    cursor: 'pointer'
                  }}
                >
                  <TrashIcon size={14} />
                  <span>Delete Chat</span>
                </button>

                {/* Propose Terms Form Drawer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '0.6rem' }}>
                  <input
                    type="text"
                    placeholder="e.g. ₹4,500"
                    value={agreedBudget}
                    onChange={(e) => setAgreedBudget(e.target.value)}
                    style={{ width: '85px', padding: '0.4rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                  />
                  <input
                    type="text"
                    placeholder="e.g. 5 Days"
                    value={agreedTimeline}
                    onChange={(e) => setAgreedTimeline(e.target.value)}
                    style={{ width: '85px', padding: '0.4rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                  />
                  <button
                    onClick={handleSendAgreement}
                    className="btn btn-primary"
                    style={{ padding: '0.4rem 0.7rem', fontSize: '0.75rem' }}
                  >
                    Propose Terms
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Feed */}
            <div style={{
              flex: 1,
              padding: '1.25rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              backgroundColor: '#F9FAFB'
            }}>
              {activeMessages.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', margin: 'auto' }}>
                  No messages recorded in this conversation yet.
                </div>
              ) : (
                activeMessages.map((msg, i) => {
                  const isAdmin = msg.sender === 'admin';
                  return (
                    <div
                      key={msg.id || i}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isAdmin ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                        {msg.senderName} ({isAdmin ? 'Admin' : 'Client'})
                      </div>
                      <div style={{
                        maxWidth: '70%',
                        padding: '0.85rem 1.15rem',
                        borderRadius: isAdmin ? '16px 16px 0 16px' : '0 16px 16px 16px',
                        backgroundColor: isAdmin ? 'var(--accent-orange)' : '#FFFFFF',
                        color: isAdmin ? '#FFFFFF' : 'var(--text-dark)',
                        border: isAdmin ? 'none' : '1px solid var(--border-color)',
                        fontSize: '0.9rem',
                        lineHeight: 1.5,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: '0.675rem', color: '#9CA3AF', marginTop: '0.2rem' }}>
                        {msg.timestamp ? (isNaN(new Date(msg.timestamp).getTime()) ? msg.timestamp : new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) : ''}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Input Bar */}
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '0.75rem'
            }}>
              <input
                type="text"
                className="form-control"
                placeholder="Reply as ProtoLabs Engineer..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
              />
              <button
                onClick={() => handleSendReply()}
                className="btn btn-primary"
                disabled={!replyText.trim() || isLoading}
                style={{ padding: '0.6rem 1.5rem' }}
              >
                <SendIcon size={16} />
                <span>Send</span>
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            <MessageSquareIcon size={48} color="#D1D5DB" style={{ marginBottom: '1rem' }} />
            <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.25rem' }}>No Conversation Selected</h4>
            <p style={{ fontSize: '0.875rem' }}>Select a client chat from the left panel to review messages, set terms, or delete threads.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {threadToDelete && (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
          <div className="modal-content" style={{ maxWidth: '440px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#DC2626', marginBottom: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <TrashIcon size={20} color="#DC2626" />
              </div>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-dark)' }}>Delete Conversation</h3>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Are you sure you want to permanently delete the conversation with <strong>{threadToDelete.clientName}</strong> ({threadToDelete.clientEmail})?
              All messages belonging to this thread will be permanently deleted from the database.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setThreadToDelete(null)}
                className="btn btn-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteThread}
                disabled={isLoading}
                className="btn"
                style={{
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <TrashIcon size={15} />
                <span>{isLoading ? 'Deleting...' : 'Yes, Delete Conversation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
