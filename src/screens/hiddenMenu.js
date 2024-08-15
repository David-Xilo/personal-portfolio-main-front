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
          zIndex: 1002,  // Higher z-index to ensure the button is on top
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
          zIndex: 1001,  // Lower z-index so it stays below the button
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
