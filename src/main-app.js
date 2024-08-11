/** @jsx jsx */
import {jsx} from '@emotion/react'

import {Routes, Route} from 'react-router-dom'
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
import {BlogApp} from './screens/blog'
import {useState} from 'react'
import {HiddenMenu} from './screens/hiddenMenu'

function MainNav() {
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
        <li css={{display: 'inline-flex'}}>
          <NavLink to="">About</NavLink>
        </li>
        <li css={{display: 'inline-flex'}}>
          <NavLink to="/blog">Blog</NavLink>
        </li>
        <li css={{display: 'inline-flex'}}>
          <NavLink to="/games">Games</NavLink>
        </li>
        <li css={{display: 'inline-flex'}}>
          <NavLink to="/finance">Finance</NavLink>
        </li>
        <li css={{display: 'inline-flex'}}>
          <NavLink to="/tech">Tech</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function MainApp() {
  const [menuContent, setMenuContent] = useState(null);

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          width: '100%',
        }}
      >
        <div css={{position: 'relative'}}>
          <MainNav />
        </div>
        <main>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes setMenuContent={setMenuContent} />
          </ErrorBoundary>
        </main>
        <HiddenMenu content={menuContent} />
      </div>
    </ErrorBoundary>
  );
}

function AppRoutes({ setMenuContent }) {
  return (
    <Routes>
      <Route path="" element={<AboutScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/blog/*" element={<BlogApp setMenuContent={setMenuContent} />} />
      <Route path="/games/*" element={<GamesApp setMenuContent={setMenuContent} />} />
      <Route path="/finance/*" element={<FinanceApp setMenuContent={setMenuContent} />} />
      <Route path="/tech/*" element={<TechApp setMenuContent={setMenuContent} />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default MainApp
