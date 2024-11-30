import * as React from 'react'

import * as colors from 'styles/colors'
import {Link as RouterLink, useLocation, useMatch} from 'react-router-dom'
import type {PathMatch} from '@remix-run/router'

interface NavLinkProps {
  to: string
  children: React.ReactNode,
}

interface MatchProps {
  match: boolean | PathMatch<any> | null
}

const subNavLinkStyles = (match: boolean | PathMatch<any> | null) => `
  block
  px-[15px]
  py-[8px]
  pl-[10px]
  my-[5px]
  text-[${colors.text}]
  rounded-[2px]
  border-l-[5px]
  border-transparent
  no-underline
  list-none
  hover:text-black
  hover:bg-[${colors.gray10}]
  hover:no-underline
  focus:no-underline
  ${match ? `
    border-l-black
    bg-[${colors.gray10}]
    font-bold
    hover:bg-[${colors.gray10}]
    focus:bg-[${colors.gray10}]
  ` : ''}
`.trim()

const MainNavLink: React.FC<NavLinkProps> = ({to, children}) => {
  const location = useLocation()

  const matchExactly = location.pathname === to
  const matchBeginning =
    !matchExactly &&
    location.pathname.startsWith(`${to}/`) &&
    location.pathname !== `${to}/`
  const match = matchExactly || matchBeginning

  return <RouterLink className={subNavLinkStyles(match)} to={to}>{children}</RouterLink>
}

const SubNavLink: React.FC<NavLinkProps> = ({to, children}) => {
  const matchExactly = location.pathname === to
  const matchBeginning =
    !matchExactly &&
    location.pathname.startsWith(`${to}/`) &&
    location.pathname !== `${to}/`
  const match = matchExactly || matchBeginning

  return <RouterLink className={subNavLinkStyles(match)} to={to}>{children}</RouterLink>
}

export {MainNavLink, SubNavLink}
