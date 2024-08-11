import React, { useState } from 'react';

function HiddenMenu({ content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: '20px',
          right: isOpen ? '300px' : '0',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          zIndex: 1001,
        }}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>

      <div style={{
        position: 'fixed',
        right: isOpen ? '0' : '-300px',
        top: 0,
        height: '100vh',
        width: '300px',
        overflowY: 'auto',
        transition: 'right 0.5s ease',
        backgroundColor: '#333',
        zIndex: 1000,
        color: 'white',
      }}>
        <div style={{ padding: '8px 16px' }}>
          {content}
        </div>
      </div>
    </>
  );
}


export {HiddenMenu};