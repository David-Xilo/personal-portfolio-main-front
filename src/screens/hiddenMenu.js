import React, { useState } from 'react';

function HiddenMenu({ content, navHeight }) {
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
          top: navHeight,
          right: isOpen ? '300px' : '0',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          zIndex: 1002, // Ensure the button is above the hidden menu
          transition: 'right 0.5s ease',
        }}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>

      <div
        style={{
          position: 'fixed',
          top: navHeight,
          right: isOpen ? '0' : '-300px',
          height: `calc(100vh - ${navHeight})`,
          width: '300px',
          overflowY: 'auto',
          transition: 'right 0.5s ease',
          backgroundColor: 'white',
          borderLeft: '2px solid #333',
          zIndex: 1001,
          color: 'black',
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