import React from 'react'

import {SubNavLink} from '../navigation/navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/error/not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {useEffect} from 'react'
import {
  MainMenuProps,
  SET_SUB_NAV,
  SubMenuProps,
} from '../../reducers/sub-menu-reducer'
import {FinanceProjectsScreen} from './finance-projects'
import {FinanceIntroScreen} from './finance-intro'
import {ErrorFallback} from 'components/error/error-fallback'
import {
  SubMenuListItem,
  SubMenuNavigation,
  SubMenuList,
} from '../navigation/nav-commons'

const FinanceApp: React.FC<MainMenuProps> = ({
  subMenuDispatch,
  hiddenMenuDispatch,
}) => {
  useEffect(() => {
    subMenuDispatch({type: SET_SUB_NAV, component: FinanceNav})
  }, [subMenuDispatch])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <FinanceAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
    </ErrorBoundary>
  )
}

const FinanceNav: React.FC = () => {
  return (
    <SubMenuNavigation>
      <SubMenuList>
        <SubMenuListItem>
          <SubNavLink to={'/finance'}>Introduction</SubNavLink>
        </SubMenuListItem>
        <SubMenuListItem>
          <SubNavLink to={'/finance/projects'}>Projects</SubNavLink>
        </SubMenuListItem>
      </SubMenuList>
    </SubMenuNavigation>
  )
}

const FinanceAppRoutes: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<FinanceIntroScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
      />
      <Route
        path="/projects"
        element={
          <FinanceProjectsScreen hiddenMenuDispatch={hiddenMenuDispatch} />
        }
      />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {FinanceApp}
