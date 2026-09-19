import React, { useState, useEffect, useRef } from 'react';
import { MessageSquareIcon, SendIcon, XIcon, UserIcon, ClockIcon, DollarSignIcon, SparklesIcon } from './Icons';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const LiveChatWidget = () => {
  const { showToast, isAdminLoggedIn } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [threadId, setThreadId] = useState(() => localStorage.getItem('protolabs_chat_thread_id') || '');
  const [clientName, setClientName] = useState(() => localStorage.getItem('protolabs_chat_client_name') || '');
  const [clientEmail, setClientEmail] = useState(() => localStorage.getItem('protolabs_chat_client_email') || '');
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(!threadId);
  const chatBottomRef = useRef(null);

  // Poll messages if active thread exists
  useEffect(() => {
    let interval;
    if (isOpen && threadId) {
      fetchMessages();
      interval = setInterval(fetchMessages, 3000);
    }
    return () => clearInterval(interval);
  }, [isOpen, threadId]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const fetchMessages = async () => {
    if (!threadId) return;
    try {
      const data = await api.getChatMessages(threadId);
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch chat messages:', err);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const startNewThread = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      showToast('Please enter your name and email to start chat', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const newThreadId = 'thr_' + Date.now();
      localStorage.setItem('protolabs_chat_thread_id', newThreadId);
      localStorage.setItem('protolabs_chat_client_name', clientName);
      localStorage.setItem('protolabs_chat_client_email', clientEmail);
      setThreadId(newThreadId);
      setIsInitializing(false);

      // Send initial welcome message
      const initMsg = await api.sendChatMessage({
        threadId: newThreadId,
        clientName,
        clientEmail,
        sender: 'client',
        senderName: clientName,
        text: `Hi Harsh! I'd like to negotiate the budget and project timeline for my engineering project.`
      });

      if (initMsg && initMsg.id) {
        setMessages([initMsg]);
      }
      showToast('Chat connected! Admin Harsh More will reply shortly.');
    } catch (err) {
      console.error('Start chat error:', err);
      showToast('Failed to start chat. Check connection.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (customText = null) => {
    const textToSend = customText || inputMsg;
    if (!textToSend.trim() || !threadId) return;

    if (!customText) setInputMsg('');
    setIsLoading(true);

    try {
      const activeName = clientName || localStorage.getItem('protolabs_chat_client_name') || 'Client';
      const activeEmail = clientEmail || localStorage.getItem('protolabs_chat_client_email') || 'visitor@protolabs.eng';

      const newMsg = await api.sendChatMessage({
        threadId,
        clientName: activeName,
        clientEmail: activeEmail,
        sender: isAdminLoggedIn ? 'admin' : 'client',
        senderName: isAdminLoggedIn ? 'Harsh More (Admin)' : activeName,
        text: textToSend
      });

      if (newMsg && newMsg.id) {
        setMessages((prev) => {
          if (prev.some(m => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
      }
      scrollToBottom();
    } catch (err) {
      console.error('Send message error:', err);
      showToast('Failed to send message', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const sendQuickChip = (text) => {
    handleSendMessage(text);
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999 }}>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: '#111827',
            color: '#FFFFFF',
            padding: '0.85rem 1.25rem',
            borderRadius: '9999px',
            border: '2px solid var(--accent-orange)',
            boxShadow: '0 10px 25px -5px rgba(255, 149, 0, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: 700,
            fontSize: '0.9rem'
          }}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <MessageSquareIcon size={22} color="var(--accent-orange)" />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '10px',
              height: '10px',
              backgroundColor: '#10B981',
              borderRadius: '50%',
              border: '2px solid #111827'
            }} />
          </div>
          <span>Discuss Budget & Timeline Live</span>
        </button>
      )}

      {/* Live Chat Box Window */}
      {isOpen && (
        <div style={{
          width: '380px',
          maxWidth: '92vw',
          height: '540px',
          maxHeight: '80vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#111827',
            color: '#FFFFFF',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '3px solid var(--accent-orange)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#FFFFFF'
              }}>
                HM
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Harsh More</span>
                  <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>Online</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>ProtoLabs Engineering Lead</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Negotiate Banner */}
          <div style={{
            backgroundColor: 'var(--accent-light-orange)',
            padding: '0.65rem 1rem',
            fontSize: '0.8rem',
            color: 'var(--accent-dark-orange)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderBottom: '1px solid var(--accent-soft-orange)',
            fontWeight: 600
          }}>
            <SparklesIcon size={16} style={{ flexShrink: 0 }} />
            <span>Chat live with Admin Harsh More to set custom budget & timeline!</span>
          </div>

          {/* Body */}
          {isInitializing ? (
            <form onSubmit={startNewThread} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1, justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.25rem' }}>Start Negotiation Chat</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Enter your details below to connect directly with Harsh More.</p>
              </div>

              <div>
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Rahul Sharma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g. rahul@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={isLoading}>
                {isLoading ? 'Connecting...' : 'Connect to Live Chat'}
              </button>
            </form>
          ) : (
            <>
              {/* Message List */}
              <div style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                backgroundColor: 'var(--secondary-bg)'
              }}>
                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2rem' }}>
                    Send a message to start negotiating your budget & deadline with Admin.
                  </div>
                ) : (
                  messages.map((msg, i) => {
                    const isAdmin = msg.sender === 'admin';
                    return (
                      <div
                        key={msg.id || i}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: isAdmin ? 'flex-start' : 'flex-end'
                        }}
                      >
                        <div style={{
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                          marginBottom: '0.2rem',
                          padding: '0 0.25rem'
                        }}>
                          {msg.senderName || (isAdmin ? 'Harsh More (Admin)' : 'Client')}
                        </div>
                        <div style={{
                          maxWidth: '82%',
                          padding: '0.75rem 1rem',
                          borderRadius: isAdmin ? '0 16px 16px 16px' : '16px 16px 0 16px',
                          backgroundColor: isAdmin ? '#111827' : 'var(--accent-orange)',
                          color: '#FFFFFF',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                        }}>
                          {msg.text}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#9CA3AF', marginTop: '0.2rem', padding: '0 0.25rem' }}>
                          {msg.timestamp ? (isNaN(new Date(msg.timestamp).getTime()) ? msg.timestamp : new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) : ''}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Chips */}
              <div style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: '#FFFFFF',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                gap: '0.4rem',
                overflowX: 'auto'
              }}>
                <button
                  type="button"
                  onClick={() => sendQuickChip("What is the budget estimate for custom PCB layout?")}
                  style={{
                    whiteSpace: 'nowrap',
                    fontSize: '0.725rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--primary-bg)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-dark)',
                    cursor: 'pointer'
                  }}
                >
                  💰 Budget Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => sendQuickChip("Can we deliver this within 1 week?")}
                  style={{
                    whiteSpace: 'nowrap',
                    fontSize: '0.725rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--primary-bg)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-dark)',
                    cursor: 'pointer'
                  }}
                >
                  ⏱ Urgent Deadline
                </button>
              </div>

              {/* Input Footer */}
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#FFFFFF',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  style={{ borderRadius: '20px', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="btn btn-primary"
                  style={{
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                  disabled={!inputMsg.trim() || isLoading}
                >
                  <SendIcon size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
