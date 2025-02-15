import React, { useState } from 'react'
import './menu.css';

interface HiddenMenuProps {
  content: React.ComponentType<any> | null
  menuHeight: number
}

const HiddenMenu: React.FC<HiddenMenuProps> = ({ content: Content, menuHeight }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        className="hidden-menu-button"
        style={{
          top: `${menuHeight}px`,
          right: isOpen ? '300px' : '0',
        }}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>

      <div className="hidden-menu-container" style={{
        top: `${menuHeight}px`,
        right: isOpen ? '0' : '-300px',
        height: `calc(100vh - ${menuHeight}px)`,
        width: '300px',
      }}>
        <div className="hidden-menu-content">
          {Content && <Content />}
        </div>
      </div>
    </>
  )
}

export { HiddenMenu }