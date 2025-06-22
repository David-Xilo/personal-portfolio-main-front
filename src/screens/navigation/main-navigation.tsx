import * as React from 'react'
import {MainNavLink} from './navigation'
import {Route, Routes} from 'react-router-dom'
import {AboutApp} from '../about/about'
import {NotFoundScreen} from 'components/error/not-found'
import './navigation.css'
import {TechApp} from '../tech/tech'
import {WelcomeScreen} from '../welcome/welcome'
import {GamesApp} from '../games/games'
import {FinanceApp} from '../finance/finance'
import {MainMenuProps} from '../../reducers/sub-menu-reducer'
import {HomeIcon} from '../welcome/home-icon'
import {ThemeToggle} from 'components/theme/ThemeToggle'

const MainNav: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <ul className="nav-list">
          <li className="nav-item">
            <MainNavLink to={'/'}>
              <HomeIcon />
            </MainNavLink>
          </li>
          <li className="nav-item nav-item--spaced">
            <MainNavLink to={'/about'}>About</MainNavLink>
          </li>
          <li className="nav-item">
            <MainNavLink to={'/tech'}>Technology</MainNavLink>
          </li>
          <li className="nav-item">
            <MainNavLink to={'/games'}>Games</MainNavLink>
          </li>
          <li className="nav-item">
            <MainNavLink to={'/finance'}>Finance</MainNavLink>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  )
}

const AppRoutes: React.FC<MainMenuProps> = ({
  subMenuDispatch,
  hiddenMenuDispatch,
}) => {
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
