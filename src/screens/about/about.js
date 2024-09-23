import * as React from 'react'

import {useEffect} from 'react'
import {SET_SUB_NAV} from '../../reducers/sub-menu-reducer.js'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorFallback} from 'components/error/error-fallback.js'
import {SubNavLink} from '../navigation/navigation.js'
import {Route, Routes} from 'react-router-dom'
import {NotFoundScreen} from 'components/error/not-found.js'
import {AboutIntroScreen} from './about-intro.js'
import {AboutContactsScreen} from './about-contacts.js'
import {
  StyledSubMenuNavigationLi,
  StyledSubMenuNavigationNav,
  StyledSubMenuNavigationUl,
} from '../navigation/nav-commons.js'
import {
  StyledMenuTableCellDiv,
  StyledMenuTableDiv,
} from 'components/menu/menu-display.ts'

function AboutApp({subMenuDispatch, hiddenMenuDispatch}) {
  useEffect(() => {
    subMenuDispatch({type: SET_SUB_NAV, component: AboutNav})
  }, [subMenuDispatch])

  return (
    <StyledMenuTableDiv>
      <StyledMenuTableCellDiv>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          fallback={<ErrorFallback />}
        >
          <AboutAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
        </ErrorBoundary>
      </StyledMenuTableCellDiv>
    </StyledMenuTableDiv>
  )
}

function AboutNav() {
  return (
    <StyledSubMenuNavigationNav>
      <StyledSubMenuNavigationUl>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/about'}>Introduction</SubNavLink>
        </StyledSubMenuNavigationLi>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/about/contacts'}>Contacts</SubNavLink>
        </StyledSubMenuNavigationLi>
      </StyledSubMenuNavigationUl>
    </StyledSubMenuNavigationNav>
  )
}

function AboutAppRoutes({hiddenMenuDispatch}) {
  return (
    <Routes>
      <Route
        path="/"
        element={<AboutIntroScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
      />
      <Route
        path="/contacts"
        element={
          <AboutContactsScreen hiddenMenuDispatch={hiddenMenuDispatch} />
        }
      />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {AboutApp}
