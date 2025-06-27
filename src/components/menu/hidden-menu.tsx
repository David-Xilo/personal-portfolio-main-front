import React from 'react'
import './menu.css'
import {ArrowLeftIcon} from 'components/icons/arrow-left-icon'
import {ArrowRightIcon} from 'components/icons/arrow-right-icon'

interface HiddenMenuProps {
  content: React.ComponentType<any> | undefined
  isOpen: boolean
  onToggle: (isOpen: boolean) => void
}

const HiddenMenu: React.FC<HiddenMenuProps> = ({
  content: Content,
  isOpen,
  onToggle,
}) => {
  const toggleMenu = () => {
    onToggle(!isOpen)
  }

  const buttonStyle = {
    right: isOpen ? 'var(--hidden-menu-width)' : '0',
  }

  const containerStyle = {
    right: isOpen ? '0' : 'calc(-1 * var(--hidden-menu-width))',
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        className="hidden-menu-button"
        style={buttonStyle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </button>

      <div
        className="hidden-menu-container"
        style={containerStyle}
        aria-hidden={!isOpen}
      >
        <div className="hidden-menu-content">{Content && <Content />}</div>
      </div>
    </>
  )
}

export {HiddenMenu}
