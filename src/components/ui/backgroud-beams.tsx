import React from 'react';

export function BackgroundBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <svg className="absolute inset-0" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff7e5f" />
            <stop offset="100%" stopColor="#feb47b" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" />
        {/* Add additional SVG elements or animations here */}
      </svg>
    </div>
  );
}
