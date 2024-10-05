import * as React from 'react'

import {ErrorBoundary} from 'react-error-boundary'
import * as colors from 'styles/colors'
import {useReducer} from 'react'
import {HiddenMenu} from 'components/menu/hidden-menu'
import styled from '@emotion/styled/macro'
import {
  HiddenMenuAction,
  hiddenMenuInitialState,
  hiddenMenuReducer, HiddenMenuState,
} from '../reducers/hidden-menu-reducer'
import {
  ErrorFallback,
  FullPageErrorFallback,
} from 'components/error/error-fallback'
import {
  SubMenuAction,
  subMenuInitialState,
  subMenuReducer, SubMenuState,
} from '../reducers/sub-menu-reducer'
import {AppRoutes, MainNav} from './navigation/main-navigation'

const StyledContainer = styled.div`
  height: 100vh;
`

const StyledSubNavDivContainer = styled.div<{totalHeight: number}>`
  position: fixed;
  top: ${({totalHeight}) => `${totalHeight}px`};
  height: ${({totalHeight}) => `calc(100vh - ${totalHeight}px)`};
  border-right: 2px solid ${colors.gray10};
  background: white;
  overflow-y: auto;
  padding: 20px;
`

const StyledMainContent = styled.main<{hasSubNav: boolean, totalHeight: number}>`
  position: relative;
  margin-left: ${({hasSubNav}) => (hasSubNav ? '200px' : '0')};
  padding-top: ${({totalHeight}) => `${totalHeight}px`};
  height: ${({totalHeight}) => `calc(100vh - ${totalHeight}px)`};
  overflow-y: auto;
`

const MainApp: React.FC = () => {
  const [subMenuState, subMenuDispatch] = useReducer<React.Reducer<SubMenuState, SubMenuAction>>(
    subMenuReducer,
    subMenuInitialState,
  )
  const [hiddenMenuState, hiddenMenuDispatch] = useReducer<React.Reducer<HiddenMenuState, HiddenMenuAction>>(
    hiddenMenuReducer,
    hiddenMenuInitialState,
  )

  const topHeight = 5
  const navHeight = 60
  const navPadding = 16
  const navBorder = 2
  const totalHeight = 99

  return (
    <ErrorBoundary
      FallbackComponent={FullPageErrorFallback}
    >
      <StyledContainer>
        <MainNav
          navHeight={navHeight}
          topHeight={topHeight}
          navPadding={navPadding}
          navBorder={navBorder}
        />

        {subMenuState.shouldRenderSubNav && (
          <StyledSubNavDivContainer totalHeight={totalHeight}>
            <subMenuState.SubNavComponent />
          </StyledSubNavDivContainer>
        )}

        {hiddenMenuState.shouldRenderHiddenMenu && (
          <HiddenMenu
            content={hiddenMenuState.HiddenMenuComponent}
            menuHeight={totalHeight}
          />
        )}

        <StyledMainContent
          hasSubNav={subMenuState.shouldRenderSubNav}
          totalHeight={totalHeight}
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes
              subMenuDispatch={subMenuDispatch}
              hiddenMenuDispatch={hiddenMenuDispatch}
            />
          </ErrorBoundary>
        </StyledMainContent>
      </StyledContainer>
    </ErrorBoundary>
  )
}

export default MainApp
