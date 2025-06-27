import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import './main-app.css'
import {useReducer} from 'react'
import {HiddenMenu} from 'components/menu/hidden-menu'
import {
  HiddenMenuAction,
  hiddenMenuInitialState,
  hiddenMenuReducer,
  HiddenMenuState,
  TOGGLE_HIDDEN_MENU,
} from '../reducers/hidden-menu-reducer'
import {
  ErrorFallback,
  FullPageErrorFallback,
} from 'components/error/error-fallback'
import {
  SubMenuAction,
  subMenuInitialState,
  subMenuReducer,
  SubMenuState,
} from '../reducers/sub-menu-reducer'
import {AppRoutes, MainNav} from './navigation/main-navigation'

const MainApp: React.FC = () => {
  const [subMenuState, subMenuDispatch] = useReducer<
    React.Reducer<SubMenuState, SubMenuAction>
  >(subMenuReducer, subMenuInitialState)
  const [hiddenMenuState, hiddenMenuDispatch] = useReducer<
    React.Reducer<HiddenMenuState, HiddenMenuAction>
  >(hiddenMenuReducer, hiddenMenuInitialState)

  const toggleHiddenMenu = (isOpen: boolean) => {
    hiddenMenuDispatch({
      type: TOGGLE_HIDDEN_MENU,
      isExpanded: isOpen,
    })
  }

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div className="h-screen">
        <MainNav />

        {subMenuState.shouldRenderSubNav && (
          <div className="sub-nav">
            <subMenuState.SubNavComponent />
          </div>
        )}

        <div className="flex transition-all duration-500">
          {hiddenMenuState.shouldRenderHiddenMenu && (
            <HiddenMenu
              content={hiddenMenuState.HiddenMenuComponent}
              isOpen={hiddenMenuState.isHiddenMenuExpanded}
              onToggle={toggleHiddenMenu}
            />
          )}

          <main
            className={`main-content flex-1 
          ${subMenuState.shouldRenderSubNav ? 'with-sub-nav' : 'without-sub-nav'}
          ${hiddenMenuState.isHiddenMenuExpanded ? 'hidden-menu-open' : ''}`}
          >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <AppRoutes
                subMenuDispatch={subMenuDispatch}
                hiddenMenuDispatch={hiddenMenuDispatch}
              />
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default MainApp
