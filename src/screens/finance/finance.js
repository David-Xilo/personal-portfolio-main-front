import * as React from 'react'

import {SubNavLink} from '../navigation/navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/error/not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {useEffect} from 'react'
import {SET_SUB_NAV} from '../../reducers/sub-menu-reducer.js'
import {FinanceNewsScreen} from './finance-news.js'
import {FinanceGraphsScreen} from './finance-graphs.js'
import {FinanceIntroScreen} from './finance-intro.js'
import {ErrorFallback} from 'components/error/error-fallback.js'
import {
  StyledSubMenuNavigationLi,
  StyledSubMenuNavigationNav,
  StyledSubMenuNavigationUl,
} from '../navigation/nav-commons.js'
import {
  StyledMenuTableCellDiv,
  StyledMenuTableDiv,
} from 'components/menu/menu-display.js'

function FinanceApp({subMenuDispatch, hiddenMenuDispatch}) {
  useEffect(() => {
    subMenuDispatch({type: SET_SUB_NAV, component: FinanceNav})
  }, [subMenuDispatch])

  return (
    <StyledMenuTableDiv>
      <StyledMenuTableCellDiv>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          fallback={<ErrorFallback />}
        >
          <FinanceAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
        </ErrorBoundary>
      </StyledMenuTableCellDiv>
    </StyledMenuTableDiv>
  )
}

function FinanceNav() {
  return (
    <StyledSubMenuNavigationNav>
      <StyledSubMenuNavigationUl>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/finance'}>Introduction</SubNavLink>
        </StyledSubMenuNavigationLi>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/finance/news'}>News</SubNavLink>
        </StyledSubMenuNavigationLi>
        <StyledSubMenuNavigationLi>
          <SubNavLink to={'/finance/graphs'}>Graphs</SubNavLink>
        </StyledSubMenuNavigationLi>
      </StyledSubMenuNavigationUl>
    </StyledSubMenuNavigationNav>
  )
}

function FinanceAppRoutes({hiddenMenuDispatch}) {
  return (
    <Routes>
      <Route
        path="/"
        element={<FinanceIntroScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
      />
      <Route
        path="/news"
        element={<FinanceNewsScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
      />
      <Route
        path="/graphs"
        element={
          <FinanceGraphsScreen hiddenMenuDispatch={hiddenMenuDispatch} />
        }
      />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {FinanceApp}
