/** @jsx jsx */
import {jsx} from '@emotion/react'

import {MainNavLink} from './navigation'
import {Route, Routes} from 'react-router-dom'
import {AboutScreen} from '../screens/about'
import {BlogApp} from '../screens/blog'
import {NotFoundScreen} from '../components/error/not-found'
import styled from '@emotion/styled/macro'
import * as colors from '../styles/colors'


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

function MainNav({ topHeight, navHeight, navPadding, navBorder }) {
  return (
    <StyledMainNav topHeight={topHeight}
                   navHeight={navHeight}
                   navPadding={navPadding}
                   navBorder={navBorder}>
      <StyledMainNavList>
        <StyledMainNavItem>
          <MainNavLink to="/">About</MainNavLink>
        </StyledMainNavItem>
        <StyledMainNavItem>
          <MainNavLink to="/blog">Blog</MainNavLink>
        </StyledMainNavItem>
      </StyledMainNavList>
    </StyledMainNav>
  );
}

function AppRoutes({ subMenuDispatch, hiddenMenuDispatch }) {
  return (
    <Routes>
      <Route path="/" element={<AboutScreen subMenuDispatch={subMenuDispatch} hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/blog/*" element={<BlogApp subMenuDispatch={subMenuDispatch} hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export {MainNav, AppRoutes}

