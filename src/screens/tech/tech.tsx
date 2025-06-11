import * as React from 'react'

import {SubNavLink} from '../navigation/navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/error/not-found'
import {useEffect} from 'react'
import {
  MainMenuProps,
  SET_SUB_NAV,
  SubMenuProps,
} from '../../reducers/sub-menu-reducer'
import {TechIntroScreen} from './tech-intro'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorFallback} from 'components/error/error-fallback'
import {
  SubMenuListItem,
  SubMenuNavigation,
  SubMenuList,
} from '../navigation/nav-commons'
import {TechProjectsScreen} from './tech-projects'

const TechApp: React.FC<MainMenuProps> = ({
  subMenuDispatch,
  hiddenMenuDispatch,
}) => {
  useEffect(() => {
    subMenuDispatch({type: SET_SUB_NAV, component: TechNav})
  }, [subMenuDispatch])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TechAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
    </ErrorBoundary>
  )
}

const TechNav: React.FC = () => {
  return (
    <SubMenuNavigation>
      <SubMenuList>
        <SubMenuListItem>
          <SubNavLink to={'/tech'}>Introduction</SubNavLink>
        </SubMenuListItem>
        <SubMenuListItem>
          <SubNavLink to={'/tech/projects'}>Projects</SubNavLink>
        </SubMenuListItem>
      </SubMenuList>
    </SubMenuNavigation>
  )
}

const TechAppRoutes: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<TechIntroScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
      />
      <Route
        path="/projects"
        element={<TechProjectsScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
      />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {TechApp}
