/** @jsx jsx */
import {jsx} from '@emotion/react'

import {MainNavLink} from './navigation'
import {Route, Routes} from 'react-router-dom'
import {AboutApp} from '../about/about'
import {NotFoundScreen} from '../../components/error/not-found'
import styled from '@emotion/styled/macro'
import * as colors from '../../styles/colors'
import {TechApp} from '../tech/tech'
import {WelcomeScreen} from '../welcome/welcome'
import {GamesApp} from '../games/games'
import {FinanceApp} from '../finance/finance'


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
          <MainNavLink to={"/about"}>About</MainNavLink>
        </StyledMainNavItem>
        <StyledMainNavItem>
          <MainNavLink to={"/tech"}>Technology</MainNavLink>
        </StyledMainNavItem>
        <StyledMainNavItem>
          <MainNavLink to={"/games"}>Games</MainNavLink>
        </StyledMainNavItem>
        <StyledMainNavItem>
          <MainNavLink to={"/finance"}>Finance</MainNavLink>
        </StyledMainNavItem>
      </StyledMainNavList>
    </StyledMainNav>
  );
}

function AppRoutes({ subMenuDispatch, hiddenMenuDispatch }) {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen subMenuDispatch={subMenuDispatch} hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/about/*" element={<AboutApp subMenuDispatch={subMenuDispatch} hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/tech/*" element={<TechApp subMenuDispatch={subMenuDispatch} hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/games/*" element={<GamesApp subMenuDispatch={subMenuDispatch} hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/finance/*" element={<FinanceApp subMenuDispatch={subMenuDispatch} hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export {MainNav, AppRoutes}

