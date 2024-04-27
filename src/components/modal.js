/** @jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'
import {CircleButton} from './lib'

import {Modal as BootstrapModal} from 'react-bootstrap'

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn && fn(...args))

const ModalContext = React.createContext()

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

function ModalContents({title, children, ...props}) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <BootstrapModal show={isOpen} onHide={() => setIsOpen(false)}>
    <div css={{display: 'flex', justifyContent: 'flex-end'}}>
        <ModalDismissButton>
          <CircleButton>
            <span>Close</span>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
      {children}
    </BootstrapModal>
  )
}

// function ModalContents({title, children, ...props}) {
//   return (
//     <ModalContentsBase {...props}>
//       <div css={{display: 'flex', justifyContent: 'flex-end'}}>
//         <ModalDismissButton>
//           <CircleButton>
//             <VisuallyHidden>Close</VisuallyHidden>
//             <span aria-hidden>×</span>
//           </CircleButton>
//         </ModalDismissButton>
//       </div>
//       <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
//       {children}
//     </ModalContentsBase>
//   )
// }

// function ModalContentsBase(props) {
//   const [isOpen, setIsOpen] = React.useContext(ModalContext)
//   return (
//     <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
//   )
// }

export {Modal, ModalDismissButton, ModalOpenButton, ModalContents}
