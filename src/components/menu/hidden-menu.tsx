import React, { useState } from 'react'
import './menu.css';

interface HiddenMenuProps {
  content: React.ComponentType<any> | null
}

const HiddenMenu: React.FC<HiddenMenuProps> = ({ content: Content }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        className="hidden-menu-button"
        style={{right: isOpen ? '300px' : '0',}}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>

      <div
        className="hidden-menu-container"
        style={{right: isOpen ? '0' : '-300px',}}
      >
        <div className="hidden-menu-content">
          {Content && <Content />}
        </div>
      </div>
    </>
  )
}

export { HiddenMenu }