import React, { useState, useEffect, useRef } from 'react';
import { MessageSquareIcon, SendIcon, RefreshIcon, UserIcon, ClockIcon, DollarSignIcon, CheckCircleIcon } from '../common/Icons';
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
      }
      await fetchThreads(); // update threads list preview
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

  const activeThread = threads.find((t) => t.id === activeThreadId);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', height: '650px' }}>
      {/* Sidebar Threads List */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1.25rem',
          backgroundColor: '#111827',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid var(--accent-orange)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700 }}>
            <MessageSquareIcon size={18} color="var(--accent-orange)" />
            <span>Client Live Chats</span>
          </div>
          <button onClick={fetchThreads} style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>
            <RefreshIcon size={16} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {threads.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              No active client chats yet. Incoming inquiries will appear here!
            </div>
          ) : (
            threads.map((t) => {
              const isSelected = t.id === activeThreadId;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'rgba(255, 149, 0, 0.08)' : 'transparent',
                    borderLeft: isSelected ? '4px solid var(--accent-orange)' : '4px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                      {t.clientName}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {t.lastActivity ? new Date(t.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {t.clientEmail}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-dark)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {t.lastMessage}
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
        overflow: 'hidden'
      }}>
        {activeThread ? (
          <>
            {/* Header */}
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: 'var(--secondary-bg)',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)' }}>
                  Chatting with: {activeThread.clientName}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Email: {activeThread.clientEmail} • Thread ID: {activeThread.id}
                </div>
              </div>

              {/* Quick Agreement Drawer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="e.g. ₹4,500"
                  value={agreedBudget}
                  onChange={(e) => setAgreedBudget(e.target.value)}
                  style={{ width: '90px', padding: '0.35rem 0.6rem', fontSize: '0.775rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
                <input
                  type="text"
                  placeholder="e.g. 5 Days"
                  value={agreedTimeline}
                  onChange={(e) => setAgreedTimeline(e.target.value)}
                  style={{ width: '90px', padding: '0.35rem 0.6rem', fontSize: '0.775rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
                <button
                  onClick={handleSendAgreement}
                  className="btn btn-primary"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.775rem' }}
                >
                  Propose Terms
                </button>
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
              {activeMessages.map((msg, i) => {
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
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
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
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
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
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Select a client conversation on the left to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};
