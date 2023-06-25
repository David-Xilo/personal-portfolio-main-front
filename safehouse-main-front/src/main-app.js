/** @jsx jsx */
import {jsx} from '@emotion/react'

import {Routes, Route, useNavigate} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {FullPageErrorFallback} from './components/lib'
import * as mq from './styles/media-queries'
import * as colors from './styles/colors'
import {AboutScreen} from './screens/about'
import {GamesApp} from './screens/games'
import {FinanceApp} from './screens/finance'
import {TechApp} from './screens/tech'
import {NotFoundScreen} from './screens/not-found'
import { NavLink, ErrorFallback } from './screens/navigation'
import { LoginApp } from './screens/login'

function useMain() {
    const navigate = useNavigate();

    console.log("useMain")
    const renderMainApp = () => {
      navigate('/'); 
    };
  
    return {
      renderMainApp,
    };
  }

function MainApp() {
    console.log("MainApp")
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <LoginApp />
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          width: '100%',
        }}
      >
        <div css={{position: 'relative'}}>
          <Nav />
        </div>
        <main>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}

function Nav() {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `2px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
        background: colors.gray10,
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
          margin: '0',
        }}
      >
        <li css={{display: "inline-flex"}}>
          <NavLink to="">About</NavLink>
        </li>
        <li css={{display: "inline-flex"}}>
          <NavLink to="/games">Games</NavLink>
        </li>
        <li css={{display: "inline-flex"}}>
          <NavLink to="/finance">Finance</NavLink>
        </li>
        <li css={{display: "inline-flex"}}>
          <NavLink to="/tech">Tech</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<AboutScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/games/*" element={<GamesApp />} />
      <Route path="/finance/*" element={<FinanceApp />} />
      <Route path="/tech/*" element={<TechApp/>} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default MainApp

export {useMain}
