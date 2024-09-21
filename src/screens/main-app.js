/** @jsx jsx */
import {jsx} from '@emotion/react'

import {ErrorBoundary} from 'react-error-boundary'
import * as colors from '../styles/colors'
import {useReducer} from 'react'
import {HiddenMenu} from './common/hiddenMenu'
import styled from '@emotion/styled/macro'
import {hiddenMenuInitialState, hiddenMenuReducer} from '../reducers/hiddenMenuReducer'
import {ErrorFallback, FullPageErrorFallback} from 'components/error/errorFallback'
import {subMenuInitialState, subMenuReducer} from '../reducers/subMenuReducer'
import {AppRoutes, MainNav} from './navigation/mainNavigation'

const StyledContainer = styled.div`
  height: 100vh;
`;

const StyledSubNavDivContainer = styled.div`
  position: fixed;
  top: ${({ totalHeight }) => `${totalHeight}px`};
  height: ${({ totalHeight }) => `calc(100vh - ${totalHeight}px)`};
  border-right: 2px solid ${colors.gray10};
  background: white;
  overflow-y: auto;
  padding: 20px;
`;

const StyledMainContent = styled.main`
  position: relative;
  margin-left: ${({ hasSubNav }) => (hasSubNav ? '200px' : '0')};
  padding-top: ${({ totalHeight }) => `${totalHeight}px`};
  height: ${({ totalHeight }) => `calc(100vh - ${totalHeight}px)`};
  overflow-y: auto;
`;

function MainApp() {
  const [subMenuState, subMenuDispatch] = useReducer(subMenuReducer, subMenuInitialState);
  const [hiddenMenuState, hiddenMenuDispatch] = useReducer(hiddenMenuReducer, hiddenMenuInitialState);

  const topHeight = 5;
  const navHeight = 60;
  const navPadding = 16;
  const navBorder = 2;
  const totalHeight = 99;

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback} fallback={< FullPageErrorFallback />} >
      <StyledContainer>
        <MainNav
          navHeight={navHeight}
          topHeight={topHeight}
          navPadding={navPadding}
          navBorder={navBorder}
        />

        {subMenuState.shouldRenderSubNav && (
          <StyledSubNavDivContainer totalHeight={totalHeight}>
            <subMenuState.SubNavComponent/>
          </StyledSubNavDivContainer>
        )}

        {hiddenMenuState.shouldRenderHiddenMenu && (
          <HiddenMenu content={hiddenMenuState.HiddenMenuComponent} menuHeight={totalHeight} />
        )}

        <StyledMainContent hasSubNav={subMenuState.shouldRenderSubNav} totalHeight={totalHeight}>
          <ErrorBoundary FallbackComponent={ErrorFallback} fallback={< ErrorFallback />}  >
            <AppRoutes subMenuDispatch={subMenuDispatch} hiddenMenuDispatch={hiddenMenuDispatch} />
          </ErrorBoundary>
        </StyledMainContent>
      </StyledContainer>
    </ErrorBoundary>
  );
}

export default MainApp
