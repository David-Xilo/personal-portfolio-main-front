import React from 'react'

import './navigation.css'
import {NavLink} from 'react-router-dom'

interface NavLinkProps {
  to: string
  children: React.ReactNode
}

const MainNavLink: React.FC<NavLinkProps> = ({to, children}) => {
  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        `sub-nav-link ${isActive ? 'sub-nav-link--active' : ''}`
      }
    >
      {children}
    </NavLink>
  )
}

const SubNavLink: React.FC<NavLinkProps> = ({to, children}) => {
  return (
    <NavLink
      to={to}
      end
      className={({isActive}) =>
        `sub-nav-link ${isActive ? 'sub-nav-link--active' : ''}`
      }
    >
      {children}
    </NavLink>
  )
}

export {MainNavLink, SubNavLink}
