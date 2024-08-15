/** @jsx jsx */
import {jsx} from '@emotion/react'

import {Routes, Route} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {FullPageErrorFallback} from './components/lib'
import * as colors from './styles/colors'
import {AboutScreen} from './screens/about'
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
  const navPadding = 16;
  const navBorder = 2;
  const totalHeight = 99;

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div style={{ height: '100vh' }}>
        <MainNav
          navHeight={navHeight}
          topHeight={topHeight}
          navPadding={navPadding}
          navBorder={navBorder}
        />

        {SubNavComponent && (
          <div
            style={{
              position: 'fixed',
              top: `${totalHeight}px`,
              height: `calc(100vh - ${totalHeight}px)`,
              borderRight: `2px solid ${colors.gray10}`,
              background: colors.gray10,
              overflowY: 'auto',
              padding: '20px',
            }}
          >
            <SubNavComponent />
          </div>
        )}

        <HiddenMenu content={menuContent} menuHeight={totalHeight} />

        <main
          style={{
            position: 'relative',
            marginLeft: SubNavComponent ? '200px' : '0',
            paddingTop: `${totalHeight}px`,
            height: `calc(100vh - ${totalHeight}px)`,
            overflowY: 'auto',
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
    </ErrorBoundary>
  );
}

function MainNav({ topHeight, navHeight, navPadding, navBorder }) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: `${topHeight}px`,
        height: `${navHeight}px`,
        padding: `${navPadding}px 30px`,
        borderBottom: `${navBorder}px solid ${colors.gray10}`,
        backgroundColor: 'cyan',
        border: '1px solid black',
        width: '100%',
        // zIndex: 1001,
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
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default MainApp
