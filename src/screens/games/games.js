import * as React from 'react'

import {SubNavLink} from '../navigation/navigation.js'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/error/not-found.js'
import {ErrorBoundary} from 'react-error-boundary'
import {GamesSideProjectsScreen} from './games-side-projects'
import {GamesNewsScreen} from './games-news.js'
import {GamesIntroScreen} from './games-intro.js'
import {ErrorFallback} from 'components/error/error-fallback.js'
import {useEffect} from 'react'
import {SET_SUB_NAV} from '../../reducers/sub-menu-reducer'
import {
  SubMenuListItem,
  SubMenuNavigation,
  SubMenuList,
} from '../navigation/nav-commons.tsx'
import {
  StyledMenuTableCellDiv,
  StyledMenuTableDiv,
} from 'components/menu/menu-display.ts'

function GamesApp({subMenuDispatch, hiddenMenuDispatch}) {
  useEffect(() => {
    subMenuDispatch({type: SET_SUB_NAV, component: GamesNav})
  }, [subMenuDispatch])

  return (
    <StyledMenuTableDiv>
      <StyledMenuTableCellDiv>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          fallback={<ErrorFallback />}
        >
          <GamesAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
        </ErrorBoundary>
      </StyledMenuTableCellDiv>
    </StyledMenuTableDiv>
  )
}

function GamesNav() {
  return (
    <SubMenuNavigation>
      <SubMenuList>
        <SubMenuListItem>
          <SubNavLink to={'/games'}>Introduction</SubNavLink>
        </SubMenuListItem>
        <SubMenuListItem>
          <SubNavLink to={'/games/news'}>News</SubNavLink>
        </SubMenuListItem>
        <SubMenuListItem>
          <SubNavLink to={'/games/side-projects'}>Side Projects</SubNavLink>
        </SubMenuListItem>
      </SubMenuList>
    </SubMenuNavigation>
  )
}

function GamesAppRoutes({hiddenMenuDispatch}) {
  return (
    <Routes>
      <Route
        path="/"
        element={<GamesIntroScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
      />
      <Route
        path="/news"
        element={<GamesNewsScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
      />
      <Route
        path="/side-projects"
        element={
          <GamesSideProjectsScreen hiddenMenuDispatch={hiddenMenuDispatch} />
        }
      />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {GamesApp}
