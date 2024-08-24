import * as React from 'react'

import {SubNavLink} from '../navigation/navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from '../../components/error/not-found'
import {useEffect} from 'react'
import {SET_SUB_NAV} from '../../reducers/subMenuReducer'
import {TechIntroScreen} from './techIntro'
import {TechNewsScreen} from './techNews'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorFallback} from '../../components/error/errorFallback'
import {
  StyledSubMenuNavigationLi,
  StyledSubMenuNavigationNav,
  StyledSubMenuNavigationUl,
} from '../navigation/navCommons'
import {StyledMenuTableCellDiv, StyledMenuTableDiv} from '../common/menuDisplay'


function TechApp({ subMenuDispatch, hiddenMenuDispatch }) {
  useEffect(() => {
    subMenuDispatch({ type: SET_SUB_NAV, component: TechNav });
  }, [subMenuDispatch]);

  return (
      <StyledMenuTableDiv>
        <StyledMenuTableCellDiv>
          <ErrorBoundary FallbackComponent={ErrorFallback} fallback={< ErrorFallback />}>
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
          <SubNavLink to={"/tech"}>Introduction</SubNavLink>
        </StyledSubMenuNavigationLi>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={"/tech/news"}>News</SubNavLink>
        </StyledSubMenuNavigationLi>
      </StyledSubMenuNavigationUl>
    </StyledSubMenuNavigationNav>
  )
}

function TechAppRoutes({ hiddenMenuDispatch }) {
  return (
    <Routes>
      <Route path="/" element={<TechIntroScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/news" element={<TechNewsScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export { TechApp }
