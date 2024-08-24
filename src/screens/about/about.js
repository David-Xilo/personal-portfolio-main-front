import * as React from 'react'

import {useEffect} from 'react'
import {SET_SUB_NAV} from '../../reducers/subMenuReducer'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorFallback} from '../../components/error/errorFallback'
import {SubNavLink} from '../navigation/navigation'
import {Route, Routes} from 'react-router-dom'
import {NotFoundScreen} from '../../components/error/not-found'
import {AboutIntroScreen} from './aboutIntro'
import {AboutContactsScreen} from './aboutContacts'
import {
  StyledSubMenuNavigationLi,
  StyledSubMenuNavigationNav,
  StyledSubMenuNavigationUl,
} from '../navigation/navCommons'
import {StyledMenuTableCellDiv, StyledMenuTableDiv} from '../common/menuDisplay'

function AboutApp({ subMenuDispatch, hiddenMenuDispatch }) {
  useEffect(() => {
    subMenuDispatch({ type: SET_SUB_NAV, component: AboutNav });
  }, [subMenuDispatch]);

  return (
    <StyledMenuTableDiv>
      <StyledMenuTableCellDiv>
        <ErrorBoundary FallbackComponent={ErrorFallback} fallback={< ErrorFallback />}>
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
          <SubNavLink to={"/about"}>Introduction</SubNavLink>
        </StyledSubMenuNavigationLi>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={"/about/contacts"}>Contacts</SubNavLink>
        </StyledSubMenuNavigationLi>
      </StyledSubMenuNavigationUl>
    </StyledSubMenuNavigationNav>
  )
}

function AboutAppRoutes({ hiddenMenuDispatch }) {
  return (
    <Routes>
      <Route path="/" element={<AboutIntroScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/contacts" element={<AboutContactsScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export { AboutApp }
