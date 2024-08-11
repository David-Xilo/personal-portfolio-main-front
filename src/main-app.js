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

function MainApp() {
  const [menuContent, setMenuContent] = useState(null);
  const [SubNavComponent, setSubNavComponent] = useState(null);
  const navHeight = '60px'; // Define the height of the main navigation

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Main Navigation at the top */}
        <MainNav navHeight={navHeight} />

        <div
          css={{
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Sub Navigation passed from the current domain */}
          {SubNavComponent && (
            <div
              css={{
                width: '200px',
                position: 'sticky',
                top: 0,
                height: '100vh',
                borderRight: `2px solid ${colors.gray10}`,
                background: colors.gray10,
                overflowY: 'auto',
                padding: '1em',
              }}
            >
              <SubNavComponent />
            </div>
          )}

          {/* Main Screen (Center Content) */}
          <main
            css={{
              flex: 1,
              overflowY: 'auto',
              padding: '1em',
            }}
          >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <AppRoutes
                setMenuContent={setMenuContent}
                setSubNavComponent={setSubNavComponent}
              />
            </ErrorBoundary>
          </main>

          {/* Hidden Menu on the right */}
          <HiddenMenu content={menuContent} navHeight={navHeight} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

function MainNav({ navHeight }) {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        height: navHeight, // Use the passed navHeight for consistent styling
        zIndex: 1002,
        padding: '1em 1.5em',
        borderBottom: `2px solid ${colors.gray10}`,
        background: colors.gray10,
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
          margin: '0',
          display: 'flex',
          gap: '1em',
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
  );
}

function AppRoutes({ setMenuContent, setSubNavComponent }) {
  return (
    <Routes>
      <Route path="/" element={<AboutScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route
        path="/blog/*"
        element={
          <BlogApp
            setMenuContent={setMenuContent}
            setSubNavComponent={setSubNavComponent}
          />
        }
      />
      <Route
        path="/games/*"
        element={
          <GamesApp
            setMenuContent={setMenuContent}
            setSubNavComponent={setSubNavComponent}
          />
        }
      />
      <Route
        path="/finance/*"
        element={
          <FinanceApp
            setMenuContent={setMenuContent}
            setSubNavComponent={setSubNavComponent}
          />
        }
      />
      <Route
        path="/tech/*"
        element={
          <TechApp
            setMenuContent={setMenuContent}
            setSubNavComponent={setSubNavComponent}
          />
        }
      />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default MainApp
