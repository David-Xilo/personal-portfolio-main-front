/** @jsx jsx */
import {jsx} from '@emotion/react'

import {Routes, Route} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {Button, FullPageErrorFallback} from './components/lib'
import * as mq from './styles/media-queries'
import * as colors from './styles/colors'
import {useAuth} from './context/auth-context'
import {AboutScreen} from './screens/about'
import {GamesApp} from './screens/games'
import {FinanceApp} from './screens/finance'
import {TechApp} from './screens/tech'
import {NotFoundScreen} from './screens/not-found'
import { NavLink, ErrorFallback } from './screens/navigation'

function AuthenticatedApp() {
  const {user, logout} = useAuth()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user.username}
        <Button variant="secondary" css={{marginLeft: '10px'}} onClick={logout}>
          Logout
        </Button>
      </div>
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
        <main css={{width: '100%'}}>
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
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
        }}
      >
        <li style={{display: "inline-flex"}}>
          <NavLink to="/about">About</NavLink>
        </li>
        <li style={{display: "inline-flex"}}>
          <NavLink to="/games/intro">Games</NavLink>
        </li>
        <li style={{display: "inline-flex"}}>
          <NavLink to="/finance/intro">Finance</NavLink>
        </li>
        <li style={{display: "inline-flex"}}>
          <NavLink to="/tech/intro">Tech</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/about/*" element={<AboutScreen />} />
      <Route path="/games/*" element={<GamesApp />} />
      <Route path="/finance/*" element={<FinanceApp />} />
      <Route path="/tech/*" element={<TechApp/>} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AuthenticatedApp
