import * as React from 'react'

import {SubNavLink} from '../navigation/navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/error/not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {GamesSideProjectsScreen} from './games-side-projects'
import {GamesNewsScreen} from './games-news'
import {GamesIntroScreen} from './games-intro'
import {ErrorFallback} from 'components/error/error-fallback'
import {useEffect} from 'react'
import {MainMenuProps, SET_SUB_NAV, SubMenuProps} from '../../reducers/sub-menu-reducer'
import {
  SubMenuListItem,
  SubMenuNavigation,
  SubMenuList,
} from '../navigation/nav-commons'
import {
  StyledMenuTableCellDiv,
  StyledMenuTableDiv,
} from 'components/menu/menu-display'

const GamesApp: React.FC<MainMenuProps> = ({subMenuDispatch, hiddenMenuDispatch}) => {
  useEffect(() => {
    subMenuDispatch({type: SET_SUB_NAV, component: GamesNav})
  }, [subMenuDispatch])

  return (
    <StyledMenuTableDiv>
      <StyledMenuTableCellDiv>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <GamesAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
        </ErrorBoundary>
      </StyledMenuTableCellDiv>
    </StyledMenuTableDiv>
  )
}

const GamesNav: React.FC = () => {
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

const GamesAppRoutes: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
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
