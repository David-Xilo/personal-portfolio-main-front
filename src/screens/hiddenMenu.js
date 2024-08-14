import React, { useState } from 'react';

function HiddenMenu({ content, menuHeight }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: `${menuHeight}px`,
          right: isOpen ? '300px' : '0',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          transition: 'right 0.5s ease',
          zIndex: 1000, // Ensure it's above the main content
        }}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>

      <div
        style={{
          position: 'fixed',
          top: `${menuHeight}px`,
          right: isOpen ? '0' : '-300px',
          height: `calc(100vh - ${menuHeight}px)`,
          width: '300px',
          overflowY: 'auto',
          transition: 'right 0.5s ease',
          backgroundColor: 'white',
          borderLeft: '2px solid #333',
          color: 'black',
          zIndex: 1000, // Ensure it's above the main content
        }}
      >
        <div style={{ padding: '8px 16px' }}>
          {content}
        </div>
      </div>
    </>
  );
}


export {HiddenMenu};