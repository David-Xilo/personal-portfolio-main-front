import * as React from 'react'

import {SubNavLink} from '../navigation/navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/error/not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {GamesSideProjectsScreen} from './gamesSideProjects'
import {GamesNewsScreen} from './gamesNews'
import {GamesIntroScreen} from './gamesIntro'
import {ErrorFallback} from 'components/error/errorFallback'
import {useEffect} from 'react'
import {SET_SUB_NAV} from '../../reducers/subMenuReducer'
import {
  StyledSubMenuNavigationLi,
  StyledSubMenuNavigationNav,
  StyledSubMenuNavigationUl,
} from '../navigation/navCommons'
import {StyledMenuTableCellDiv, StyledMenuTableDiv} from '../common/menuDisplay'


function GamesApp({ subMenuDispatch, hiddenMenuDispatch }) {
  useEffect(() => {
    subMenuDispatch({ type: SET_SUB_NAV, component: GamesNav });
  }, [subMenuDispatch]);

  return (
      <StyledMenuTableDiv>
        <StyledMenuTableCellDiv>
          <ErrorBoundary FallbackComponent={ErrorFallback} fallback={< ErrorFallback />} >
            <GamesAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
          </ErrorBoundary>
        </StyledMenuTableCellDiv>
      </StyledMenuTableDiv>
  )
}

function GamesNav() {
  return (
    <StyledSubMenuNavigationNav>
      <StyledSubMenuNavigationUl>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/games'}>Introduction</SubNavLink>
        </StyledSubMenuNavigationLi>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/games/news'}>News</SubNavLink>
        </StyledSubMenuNavigationLi>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/games/side-projects'}>Side Projects</SubNavLink>
        </StyledSubMenuNavigationLi>
      </StyledSubMenuNavigationUl>
    </StyledSubMenuNavigationNav>
  )
}

function GamesAppRoutes({ hiddenMenuDispatch }) {
  return (
    <Routes>
      <Route path="/" element={<GamesIntroScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/news" element={<GamesNewsScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/side-projects" element={<GamesSideProjectsScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export { GamesApp }
