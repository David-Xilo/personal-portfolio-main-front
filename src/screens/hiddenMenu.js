import React, { useState } from 'react';

function HiddenMenu({ content, navHeight }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to toggle the hidden menu */}
      <button
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: navHeight, // Keep the button just below the nav bar as you had it
          right: isOpen ? '300px' : '0', // Position the button to the left of the menu
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          zIndex: 1002, // Ensure the button is above the hidden menu
          transition: 'right 0.5s ease', // Smooth transition for button movement
        }}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>

      {/* Hidden menu positioned below the navigation bar */}
      <div
        style={{
          position: 'fixed',
          top: navHeight,
          right: isOpen ? '0' : '-300px', // Toggle between showing and hiding the menu
          height: `calc(100vh - ${navHeight})`, // Adjust the height based on the nav bar
          width: '300px',
          overflowY: 'auto',
          transition: 'right 0.5s ease', // Smooth transition for menu appearance
          backgroundColor: 'white', // Keep the background color as white
          borderLeft: '2px solid #333', // Add a border to the left side of the hidden menu
          zIndex: 1001, // Make sure it's below the button but above other content
          color: 'black', // Keep the text color as black
        }}
      >
        <div style={{ padding: '8px 16px' }}>{content}</div>
      </div>
    </>
  );
}


export {HiddenMenu};