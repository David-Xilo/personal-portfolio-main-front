import * as React from 'react'
import {MainNavLink} from './navigation'
import {Route, Routes} from 'react-router-dom'
import {AboutApp} from '../about/about'
import {NotFoundScreen} from 'components/error/not-found'
import * as colors from '../../styles/colors'
import {TechApp} from '../tech/tech'
import {WelcomeScreen} from '../welcome/welcome'
import {GamesApp} from '../games/games'
import {FinanceApp} from '../finance/finance'
import {MainMenuProps} from '../../reducers/sub-menu-reducer'

interface MainNavigationProps {
  topHeight: number,
  navHeight: number,
  navPadding: number,
  navBorder: number,
}

const MainNav: React.FC<MainNavigationProps> = ({
                                                  topHeight,
                                                  navHeight,
                                                  navPadding,
                                                  navBorder
                                                }) => {
  const navStyles = `
    fixed
    top-[${topHeight}px]
    h-[${navHeight}px]
    px-[30px]
    py-[${navPadding}px]
    border-b-[${navBorder}px]
    border-b-[${colors.gray10}]
    bg-cyan-500
    border
    border-black
    w-full
    z-[1000]
  `.trim()

  const navListStyles = `
    list-none
    p-0
    m-0
    flex
    gap-4
  `.trim()

  const navItemStyles = `
    inline-flex
  `.trim()

  return (
    <nav className={navStyles}>
      <ul className={navListStyles}>
        <li className={navItemStyles}>
          <MainNavLink to={'/about'}>About</MainNavLink>
        </li>
        <li className={navItemStyles}>
          <MainNavLink to={'/tech'}>Technology</MainNavLink>
        </li>
        <li className={navItemStyles}>
          <MainNavLink to={'/games'}>Games</MainNavLink>
        </li>
        <li className={navItemStyles}>
          <MainNavLink to={'/finance'}>Finance</MainNavLink>
        </li>
      </ul>
    </nav>
  )
}

const AppRoutes: React.FC<MainMenuProps> = ({subMenuDispatch, hiddenMenuDispatch}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WelcomeScreen
            subMenuDispatch={subMenuDispatch}
            hiddenMenuDispatch={hiddenMenuDispatch}
          />
        }
      />
      <Route
        path="/about/*"
        element={
          <AboutApp
            subMenuDispatch={subMenuDispatch}
            hiddenMenuDispatch={hiddenMenuDispatch}
          />
        }
      />
      <Route
        path="/tech/*"
        element={
          <TechApp
            subMenuDispatch={subMenuDispatch}
            hiddenMenuDispatch={hiddenMenuDispatch}
          />
        }
      />
      <Route
        path="/games/*"
        element={
          <GamesApp
            subMenuDispatch={subMenuDispatch}
            hiddenMenuDispatch={hiddenMenuDispatch}
          />
        }
      />
      <Route
        path="/finance/*"
        element={
          <FinanceApp
            subMenuDispatch={subMenuDispatch}
            hiddenMenuDispatch={hiddenMenuDispatch}
          />
        }
      />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {MainNav, AppRoutes}