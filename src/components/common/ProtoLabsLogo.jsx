import React from 'react';

// ProtoLabs Circuit Node SVG Icon based on exact brand sheet
export const ProtoLabsIcon = ({ size = 36, variant = 'orange', className = '' }) => {
  let circleColor = '#FF9500';
  let nodeColor = '#FF9500';
  let bgColor = 'transparent';

  if (variant === 'dark-bg') {
    circleColor = '#FFFFFF';
    nodeColor = '#FFFFFF';
  } else if (variant === 'solid-orange') {
    circleColor = '#FFFFFF';
    nodeColor = '#FFFFFF';
    bgColor = '#FF9500';
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ borderRadius: variant === 'solid-orange' ? '20%' : '0' }}
    >
      {bgColor !== 'transparent' && (
        <rect width="100" height="100" rx="20" fill={bgColor} />
      )}
      
      {/* Outer ring */}
      <circle cx="50" cy="50" r="42" stroke={circleColor} strokeWidth="6" fill="none" />

      {/* PCB Circuit Traces */}
      {/* Top trace (straight up) */}
      <line x1="50" y1="50" x2="50" y2="22" stroke={circleColor} strokeWidth="5" strokeLinecap="round" />
      
      {/* Top Right trace (with right-angle PCB bend) */}
      <path d="M 50 50 L 65 50 L 65 32 L 75 32" stroke={circleColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Bottom Right trace */}
      <line x1="50" y1="50" x2="72" y2="68" stroke={circleColor} strokeWidth="5" strokeLinecap="round" />
      
      {/* Bottom trace (straight down) */}
      <line x1="50" y1="50" x2="50" y2="78" stroke={circleColor} strokeWidth="5" strokeLinecap="round" />
      
      {/* Bottom Left trace */}
      <line x1="50" y1="50" x2="28" y2="68" stroke={circleColor} strokeWidth="5" strokeLinecap="round" />
      
      {/* Top Left trace (with right-angle PCB bend) */}
      <path d="M 50 50 L 35 50 L 35 32 L 25 32" stroke={circleColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Central Node */}
      <circle cx="50" cy="50" r="10" fill={nodeColor} />

      {/* 6 Peripheral Circuit Nodes */}
      <circle cx="50" cy="22" r="6" fill={nodeColor} />
      <circle cx="75" cy="32" r="6" fill={nodeColor} />
      <circle cx="72" cy="68" r="6" fill={nodeColor} />
      <circle cx="50" cy="78" r="6" fill={nodeColor} />
      <circle cx="28" cy="68" r="6" fill={nodeColor} />
      <circle cx="25" cy="32" r="6" fill={nodeColor} />
    </svg>
  );
};

// Horizontal primary lockup (Icon + ProtoLabs Text + Tagline)
export const ProtoLabsLogoHorizontal = ({ size = 36, theme = 'light', showTagline = true }) => {
  const textColor = theme === 'dark' ? '#FFFFFF' : '#1A1A1A';
  const taglineColor = theme === 'dark' ? '#9CA3AF' : '#555555';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', userSelect: 'none' }}>
      <ProtoLabsIcon size={size} variant={theme === 'dark' ? 'dark-bg' : 'orange'} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1 }}>
        <div style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: `${size * 0.7}px`,
          color: textColor,
          letterSpacing: '-0.5px',
          display: 'flex',
          alignItems: 'baseline'
        }}>
          <span>Proto</span>
          <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>Labs</span>
        </div>
        {showTagline && (
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: `${size * 0.22}px`,
            color: taglineColor,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginTop: '4px'
          }}>
            BUILD • EXPERIMENT • INNOVATE
          </div>
        )}
      </div>
    </div>
  );
};
