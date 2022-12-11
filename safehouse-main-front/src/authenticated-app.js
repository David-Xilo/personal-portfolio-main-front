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

function AuthenticatedHeader() {
  const {user, logout} = useAuth()
  return (
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
  )
}

function AuthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <AuthenticatedHeader />
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
          <NavLink to="/" disableOutline={true}>About</NavLink>
        </li>
        <li css={{display: "inline-flex"}}>
          <NavLink to="/games" disableOutline={true}>Games</NavLink>
        </li>
        <li css={{display: "inline-flex"}}>
          <NavLink to="/finance" disableOutline={true}>Finance</NavLink>
        </li>
        <li css={{display: "inline-flex"}}>
          <NavLink to="/tech" disableOutline={true}>Tech</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AboutScreen />} />
      <Route path="/games/*" element={<GamesApp />} />
      <Route path="/finance/*" element={<FinanceApp />} />
      <Route path="/tech/*" element={<TechApp/>} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AuthenticatedApp
