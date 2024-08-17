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
import {useReducer} from 'react'
import {HiddenMenu} from './screens/hiddenMenu'
import styled from '@emotion/styled/macro'
import {menuInitialState, menuReducer} from './screens/menuReducer'

const StyledContainer = styled.div`
  height: 100vh;
`;

const StyledSubNavDivContainer = styled.div`
  position: fixed;
  top: ${({ totalHeight }) => `${totalHeight}px`};
  height: ${({ totalHeight }) => `calc(100vh - ${totalHeight}px)`};
  border-right: 2px solid ${colors.gray10};
  background: ${colors.gray10};
  overflow-y: auto;
  padding: 20px;
`;

const StyledMainContent = styled.main`
  position: relative;
  margin-left: ${({ hasSubNav }) => (hasSubNav ? '200px' : '0')};
  padding-top: ${({ totalHeight }) => `${totalHeight}px`};
  height: ${({ totalHeight }) => `calc(100vh - ${totalHeight}px)`};
  overflow-y: auto;
`;

const StyledMainNav = styled.nav`
    position: fixed;
    top: ${({topHeight}) => `${topHeight}px`};
    height: ${({navHeight}) => `${navHeight}px`};
    padding: ${({navPadding}) => `${navPadding}px 30px`};
    border-bottom: ${({navBorder}) => `${navBorder}px solid ${colors.gray10}`};
    background-color: cyan;
    border: 1px solid black;
    width: 100%;
    z-index: 1000;
`;

const StyledMainNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1em;
`;

const StyledMainNavItem = styled.li`
  display: inline-flex;
`;

function MainApp() {
  const [menuState, menuDispatch] = useReducer(menuReducer, menuInitialState);

  const topHeight = 5;
  const navHeight = 60;
  const navPadding = 16;
  const navBorder = 2;
  const totalHeight = 99;

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback} fallback={< FullPageErrorFallback />} >
      <StyledContainer>
        <MainNav
          navHeight={navHeight}
          topHeight={topHeight}
          navPadding={navPadding}
          navBorder={navBorder}
        />

        <div>
          {menuState.shouldRenderSubNav && (
            <StyledSubNavDivContainer totalHeight={totalHeight}>
              <menuState.SubNavComponent />
            </StyledSubNavDivContainer>
           )}
        </div>

        <div>
          {menuState.shouldRenderHiddenMenu && (
            <HiddenMenu content={menuState.HiddenMenuComponent} menuHeight={totalHeight} />
          )}
        </div>

        <StyledMainContent hasSubNav={menuState.shouldRenderSubNav} totalHeight={totalHeight}>
          <ErrorBoundary FallbackComponent={ErrorFallback} fallback={< ErrorFallback />}  >
            <AppRoutes
              menuDispatch={menuDispatch}
            />
          </ErrorBoundary>
        </StyledMainContent>
      </StyledContainer>
    </ErrorBoundary>
  );
}

function MainNav({ topHeight, navHeight, navPadding, navBorder }) {
  return (
    <StyledMainNav topHeight={topHeight}
               navHeight={navHeight}
               navPadding={navPadding}
               navBorder={navBorder}>
      <StyledMainNavList>
        <StyledMainNavItem>
          <NavLink to="/">About</NavLink>
        </StyledMainNavItem>
        <StyledMainNavItem>
          <NavLink to="/blog">Blog</NavLink>
        </StyledMainNavItem>
      </StyledMainNavList>
    </StyledMainNav>
  );
}

function AppRoutes({ menuDispatch }) {
  return (
    <Routes>
      <Route path="/" element={<AboutScreen menuDispatch={menuDispatch} />} />
      <Route path="/blog/*" element={<BlogApp menuDispatch={menuDispatch} />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default MainApp
