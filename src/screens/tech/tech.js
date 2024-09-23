import * as React from 'react'

import {SubNavLink} from '../navigation/navigation.js'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/error/not-found.js'
import {useEffect} from 'react'
import {SET_SUB_NAV} from '../../reducers/sub-menu-reducer.js'
import {TechIntroScreen} from './tech-intro.js'
import {TechNewsScreen} from './tech-news.js'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorFallback} from 'components/error/error-fallback.js'
import {
  StyledSubMenuNavigationLi,
  StyledSubMenuNavigationNav,
  StyledSubMenuNavigationUl,
} from '../navigation/nav-commons.js'
import {
  StyledMenuTableCellDiv,
  StyledMenuTableDiv,
} from 'components/menu/menu-display.ts'
import {TechProjectsScreen} from './tech-projects.js'

function TechApp({subMenuDispatch, hiddenMenuDispatch}) {
  useEffect(() => {
    subMenuDispatch({type: SET_SUB_NAV, component: TechNav})
  }, [subMenuDispatch])

  return (
    <StyledMenuTableDiv>
      <StyledMenuTableCellDiv>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          fallback={<ErrorFallback />}
        >
          <TechAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
        </ErrorBoundary>
      </StyledMenuTableCellDiv>
    </StyledMenuTableDiv>
  )
}

function TechNav() {
  return (
    <StyledSubMenuNavigationNav>
      <StyledSubMenuNavigationUl>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/tech'}>Introduction</SubNavLink>
        </StyledSubMenuNavigationLi>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/tech/news'}>News</SubNavLink>
        </StyledSubMenuNavigationLi>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/tech/projects'}>Projects</SubNavLink>
        </StyledSubMenuNavigationLi>
      </StyledSubMenuNavigationUl>
    </StyledSubMenuNavigationNav>
  )
}

function TechAppRoutes({hiddenMenuDispatch}) {
  return (
    <Routes>
      <Route
        path="/"
        element={<TechIntroScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
      />
      <Route
        path="/news"
        element={<TechNewsScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
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
