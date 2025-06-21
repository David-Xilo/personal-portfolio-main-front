import React, {useState} from 'react'
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

  return (
    <>
      <button
        onClick={toggleMenu}
        className="hidden-menu-button"
        style={{right: isOpen ? 'var(--hidden-menu-width)' : '0'}}
      >
        {isOpen ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </button>

      <div
        className="hidden-menu-container"
        style={{right: isOpen ? '0' : 'calc(-1 * var(--hidden-menu-width))'}}
      >
        <div className="hidden-menu-content">{Content && <Content />}</div>
      </div>
    </>
  )
}

export {HiddenMenu}
