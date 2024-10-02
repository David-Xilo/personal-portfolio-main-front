import * as React from 'react'

const SET_HIDDEN_NAV = 'SET_HIDDEN_NAV'
const CLEAR_HIDDEN_NAV = 'CLEAR_HIDDEN_NAV'

type HiddenMenuComponentType = React.ComponentType | null

interface HiddenMenuState {
  HiddenMenuComponent: React.ComponentType<any> | null,
  shouldRenderHiddenMenu: false,
}

interface HiddenMenuAction {
  type: string,
  component: HiddenMenuComponentType,
}

const hiddenMenuInitialState = {
  HiddenMenuComponent: null,
  shouldRenderHiddenMenu: false,
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
        HiddenMenuComponent: null,
        shouldRenderHiddenMenu: false,
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
}
