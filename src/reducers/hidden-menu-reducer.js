const SET_HIDDEN_NAV = 'SET_HIDDEN_NAV'
const CLEAR_HIDDEN_NAV = 'CLEAR_HIDDEN_NAV'

const hiddenMenuInitialState = {
  HiddenMenuComponent: null,
  shouldRenderHiddenMenu: false,
}

function hiddenMenuReducer(state, action) {
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
