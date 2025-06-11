import * as React from 'react'
import {ReactNode} from 'react'

// Define the type for components that accept children
interface SubMenuProps {
  children: ReactNode
}

const SubMenuNavigation: React.FC<SubMenuProps> = ({children}) => (
  <nav className="sub-menu-nav">{children}</nav>
)

const SubMenuList: React.FC<SubMenuProps> = ({children}) => (
  <ul className="sub-menu-ul">{children}</ul>
)

const SubMenuListItem: React.FC<SubMenuProps> = ({children}) => (
  <li>{children}</li>
)

export {SubMenuNavigation, SubMenuList, SubMenuListItem}
