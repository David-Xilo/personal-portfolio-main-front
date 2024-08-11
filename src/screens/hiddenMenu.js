import React, { useState } from 'react';

function HiddenMenu({ content, navHeight }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Button to toggle the hidden menu */}
      <button
        onClick={toggleMenu}
        css={{
          position: 'fixed',
          top: `calc(${navHeight} + 10px)`, // Position the button just below the nav bar
          right: isOpen ? '300px' : '0',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          zIndex: 1002, // Ensure the button is above the hidden menu
        }}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>

      {/* Hidden menu positioned below the navigation bar */}
      <div
        css={{
          position: 'fixed',
          top: navHeight, // Start the hidden menu just below the main nav bar
          right: isOpen ? '0' : '-300px',
          height: `calc(100vh - ${navHeight})`, // Adjust the height based on the nav bar
          width: '300px',
          overflowY: 'auto',
          transition: 'right 0.5s ease',
          backgroundColor: '#333',
          zIndex: 1001, // Make sure it's below the button but above other content
          color: 'white',
        }}
      >
        <div css={{ padding: '8px 16px' }}>{content}</div>
      </div>
    </>
  );
}


export {HiddenMenu};