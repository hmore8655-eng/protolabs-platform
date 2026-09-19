import React from 'react';
import { CheckCircleIcon, SparklesIcon, XIcon } from './Icons';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  let bgColor = 'var(--accent-orange)';
  if (isError) bgColor = '#EF4444';
  if (isInfo) bgColor = '#3B82F6';

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: bgColor,
      color: '#FFFFFF',
      padding: '0.85rem 1.25rem',
      borderRadius: 'var(--radius-sm)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      zIndex: 2000,
      fontWeight: 500,
      fontSize: '0.925rem',
      animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {isError ? <XIcon size={20} /> : isInfo ? <SparklesIcon size={20} /> : <CheckCircleIcon size={20} />}
      <span>{toast.message}</span>
    </div>
  );
};
