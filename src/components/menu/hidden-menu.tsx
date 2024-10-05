import React, {useState} from 'react'
import styled from 'styled-components'

interface HiddenMenuStyledComponentProps {
  menuHeight: number,
  isOpen: boolean,
}

const StylizedHiddenMenuButton = styled.button<HiddenMenuStyledComponentProps>`
  position: fixed;
  top: ${({menuHeight}) => `${menuHeight}px`};
  right: ${({isOpen}) => (isOpen ? '300px' : '0')};
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: right 0.5s ease;
  z-index: 1002;
`

const StylizedHiddenMenuContainer = styled.div<HiddenMenuStyledComponentProps>`
  position: fixed;
  top: ${({menuHeight}) => `${menuHeight}px`};
  right: ${({isOpen}) => (isOpen ? '0' : '-300px')};
  height: ${({menuHeight}) => `calc(100vh - ${menuHeight}px)`};
  width: 300px;
  overflow-y: auto;
  transition: right 0.5s ease;
  background-color: white;
  border-left: 2px solid #333;
  color: black;
  z-index: 1001;
`

const StylizedHiddenMenuContentWrapper = styled.div`
  padding: 8px 16px;
`

const HiddenMenu: React.FC<{ content: React.ComponentType<any> | null, menuHeight: number }> = ({content: Content, menuHeight}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <StylizedHiddenMenuButton
        onClick={toggleMenu}
        isOpen={isOpen}
        menuHeight={menuHeight}
      >
        {isOpen ? 'Close' : 'Open'}
      </StylizedHiddenMenuButton>

      <StylizedHiddenMenuContainer isOpen={isOpen} menuHeight={menuHeight}>
        <StylizedHiddenMenuContentWrapper>
          {Content && <Content />}
        </StylizedHiddenMenuContentWrapper>
      </StylizedHiddenMenuContainer>
    </>
  )
}

export {HiddenMenu}
