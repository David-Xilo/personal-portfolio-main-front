import React from 'react'

const SET_SUB_NAV = 'SET_SUB_NAV'
const CLEAR_SUB_NAV = 'CLEAR_SUB_NAV'

type SubMenuComponentType = React.ComponentType

interface MainMenuProps {
  subMenuDispatch: React.Dispatch<any>
  hiddenMenuDispatch: React.Dispatch<any>
}

interface SubMenuProps {
  hiddenMenuDispatch: React.Dispatch<any>
}

interface SubMenuState {
  SubNavComponent: React.ComponentType<any>
  shouldRenderSubNav: boolean
}

interface SubMenuAction {
  type: string
  component: SubMenuComponentType
}

const EmptyComponent: React.FC = () => {
  return <div></div>
}

const subMenuInitialState = {
  SubNavComponent: EmptyComponent,
  shouldRenderSubNav: false,
}

function subMenuReducer(state: SubMenuState, action: SubMenuAction) {
  switch (action.type) {
    case SET_SUB_NAV:
      return {
        ...state,
        SubNavComponent: action.component,
        shouldRenderSubNav: true,
      }
    case CLEAR_SUB_NAV:
      return {
        ...state,
        SubNavComponent: EmptyComponent,
        shouldRenderSubNav: false,
      }
    default:
      return state
  }
}

export {
  subMenuInitialState,
  subMenuReducer,
  SET_SUB_NAV,
  CLEAR_SUB_NAV,
  SubMenuProps,
  MainMenuProps,
  SubMenuState,
  SubMenuAction,
}
