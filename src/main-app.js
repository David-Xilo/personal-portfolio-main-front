/** @jsx jsx */
import {jsx} from '@emotion/react'

import {Routes, Route} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {FullPageErrorFallback} from './components/lib'
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

  const topHeight = 5;
  const navHeight = 60;
  const navPadding = 16; // 1em = 16px padding (top)
  const navBorder = 2; // 2px border (bottom)
  const totalHeight = topHeight + navHeight + navPadding + navBorder;

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <MainNav
          navHeight={navHeight}
          topHeight={topHeight}
          navPadding={navPadding}
          navBorder={navBorder}
        />

        <div
          style={{
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {SubNavComponent && (
            <div
              style={{
                width: '200px',
                position: 'sticky',
                top: `${totalHeight}px`,
                height: `calc(100vh - ${totalHeight}px)`,
                borderRight: `2px solid ${colors.gray10}`,
                background: colors.gray10,
                overflowY: 'auto',
                padding: '1em',
              }}
            >
              <SubNavComponent />
            </div>
          )}

          <main
            style={{
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
        </div>

        <HiddenMenu content={menuContent} menuHeight={totalHeight} />
      </div>
    </ErrorBoundary>
  );
}

function MainNav({ topHeight, navHeight, navPadding, navBorder }) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: `${topHeight}px`,
        height: `${navHeight}px`,
        padding: `${navPadding}px`,
        borderBottom: `${navBorder}px solid ${colors.gray10}`,
        backgroundColor: 'cyan',
        border: '1px solid black',
      }}
    >
      <ul
        style={{
          listStyle: 'none',
          padding: '0',
          margin: '0',
          display: 'flex',
          gap: '1em',
        }}
      >
        <li style={{ display: 'inline-flex' }}>
          <NavLink to="">About</NavLink>
        </li>
        <li style={{ display: 'inline-flex' }}>
          <NavLink to="/blog">Blog</NavLink>
        </li>
        <li style={{ display: 'inline-flex' }}>
          <NavLink to="/games">Games</NavLink>
        </li>
        <li style={{ display: 'inline-flex' }}>
          <NavLink to="/finance">Finance</NavLink>
        </li>
        <li style={{ display: 'inline-flex' }}>
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
