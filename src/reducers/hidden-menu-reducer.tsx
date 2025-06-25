import React from 'react'

const SET_HIDDEN_NAV = 'SET_HIDDEN_NAV'
const CLEAR_HIDDEN_NAV = 'CLEAR_HIDDEN_NAV'
const TOGGLE_HIDDEN_MENU = 'TOGGLE_HIDDEN_MENU'

type HiddenMenuComponentType = React.ComponentType

interface HiddenMenuState {
  HiddenMenuComponent: React.ComponentType<any> | undefined
  shouldRenderHiddenMenu: boolean
  isHiddenMenuExpanded: boolean
}

interface HiddenMenuAction {
  type: string
  component?: HiddenMenuComponentType
  isExpanded: boolean
}

const EmptyComponent: React.FC = () => {
  return <div></div>
}

const hiddenMenuInitialState = {
  HiddenMenuComponent: EmptyComponent,
  shouldRenderHiddenMenu: false,
  isHiddenMenuExpanded: false,
}

function hiddenMenuReducer(state: HiddenMenuState, action: HiddenMenuAction) {
  switch (action.type) {
    case SET_HIDDEN_NAV:
      return {
        ...state,
        HiddenMenuComponent: action.component,
        shouldRenderHiddenMenu: true,
      }
    case CLEAR_HIDDEN_NAV:
      return {
        ...state,
        HiddenMenuComponent: EmptyComponent,
        shouldRenderHiddenMenu: false,
        isHiddenMenuExpanded: false,
      }
    case TOGGLE_HIDDEN_MENU:
      return {
        ...state,
        isHiddenMenuExpanded: action.isExpanded,
      }
    default:
      return state
  }
}

export {
  hiddenMenuInitialState,
  hiddenMenuReducer,
  SET_HIDDEN_NAV,
  CLEAR_HIDDEN_NAV,
  TOGGLE_HIDDEN_MENU,
  HiddenMenuState,
  HiddenMenuAction,
}
