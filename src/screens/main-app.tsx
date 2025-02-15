import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import * as colors from 'styles/colors'
import {useReducer} from 'react'
import {HiddenMenu} from 'components/menu/hidden-menu'
import {
  HiddenMenuAction,
  hiddenMenuInitialState,
  hiddenMenuReducer,
  HiddenMenuState,
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
  const [subMenuState, subMenuDispatch] = useReducer<React.Reducer<SubMenuState, SubMenuAction>>(
    subMenuReducer,
    subMenuInitialState,
  )
  const [hiddenMenuState, hiddenMenuDispatch] = useReducer<React.Reducer<HiddenMenuState, HiddenMenuAction>>(
    hiddenMenuReducer,
    hiddenMenuInitialState,
  )

  const totalHeight = 99

  const subNavStyles = `
    fixed
    top-[99px]
    h-[calc(100vh-99px)]
    border-r-2
    border-r-[${colors.gray10}]
    bg-white
    overflow-y-auto
    p-5
    w-[200px]
  `.trim()

  const mainContentStyles = (hasSubNav: boolean) => `
    relative
    ${hasSubNav ? 'ml-[200px]' : 'ml-0'}
    pt-[99px]
    h-[calc(100vh-99px)]
    overflow-y-auto
  `.trim()

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div className="h-screen">
        <MainNav />

        {subMenuState.shouldRenderSubNav && (
          <div className={subNavStyles}>
            <subMenuState.SubNavComponent />
          </div>
        )}

        {hiddenMenuState.shouldRenderHiddenMenu && (
          <HiddenMenu
            content={hiddenMenuState.HiddenMenuComponent}
            menuHeight={totalHeight}
          />
        )}

        <main className={mainContentStyles(subMenuState.shouldRenderSubNav)}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes
              subMenuDispatch={subMenuDispatch}
              hiddenMenuDispatch={hiddenMenuDispatch}
            />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default MainApp