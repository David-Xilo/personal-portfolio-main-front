import * as React from 'react'

import {SubNavLink} from '../navigation/navigation.js'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/error/not-found.js'
import {ErrorBoundary} from 'react-error-boundary'
import {useEffect} from 'react'
import {MainMenuProps, SET_SUB_NAV, SubMenuProps} from '../../reducers/sub-menu-reducer'
import {FinanceNewsScreen} from './finance-news.js'
import {FinanceGraphsScreen} from './finance-graphs.js'
import {FinanceIntroScreen} from './finance-intro.js'
import {ErrorFallback} from 'components/error/error-fallback.js'
import {
  SubMenuListItem,
  SubMenuNavigation,
  SubMenuList,
} from '../navigation/nav-commons'
import {
  StyledMenuTableCellDiv,
  StyledMenuTableDiv,
} from 'components/menu/menu-display'

const FinanceApp: React.FC<MainMenuProps> = ({subMenuDispatch, hiddenMenuDispatch}) => {
  useEffect(() => {
    subMenuDispatch({type: SET_SUB_NAV, component: FinanceNav})
  }, [subMenuDispatch])

  return (
    <StyledMenuTableDiv>
      <StyledMenuTableCellDiv>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <FinanceAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
        </ErrorBoundary>
      </StyledMenuTableCellDiv>
    </StyledMenuTableDiv>
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
          <SubNavLink to={'/finance/news'}>News</SubNavLink>
        </SubMenuListItem>
        <SubMenuListItem>
          <SubNavLink to={'/finance/graphs'}>Graphs</SubNavLink>
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
