import React, { useState } from 'react'

interface HiddenMenuProps {
  content: React.ComponentType<any> | null
  menuHeight: number
}

const HiddenMenu: React.FC<HiddenMenuProps> = ({ content: Content, menuHeight }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const buttonStyles = `
    fixed
    top-[${menuHeight}px]
    ${isOpen ? 'right-[300px]' : 'right-0'}
    bg-neutral-800
    text-white
    border-none
    cursor-pointer
    p-[10px]
    transition-[right]
    duration-500
    ease-in-out
    z-[1002]
  `.trim()

  const containerStyles = `
    fixed
    top-[${menuHeight}px]
    ${isOpen ? 'right-0' : '-right-[300px]'}
    h-[calc(100vh-${menuHeight}px)]
    w-[300px]
    overflow-y-auto
    transition-[right]
    duration-500
    ease-in-out
    bg-white
    border-l-2
    border-l-neutral-800
    text-black
    z-[1001]
  `.trim()

  const contentWrapperStyles = `
    p-[8px_16px]
  `.trim()

  return (
    <>
      <button
        onClick={toggleMenu}
        className={buttonStyles}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>

      <div className={containerStyles}>
        <div className={contentWrapperStyles}>
          {Content && <Content />}
        </div>
      </div>
    </>
  )
}

export { HiddenMenu }