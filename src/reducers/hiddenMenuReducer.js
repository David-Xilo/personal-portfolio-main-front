
const hiddenMenuInitialState = {
  HiddenMenuComponent: null,
  shouldRenderHiddenMenu: false,
};

function hiddenMenuReducer(state, action) {
  switch (action.type) {
    case 'SET_HIDDEN_NAV':
      return {
        ...state,
        HiddenMenuComponent: action.component,
        shouldRenderHiddenMenu: true,
      };
    case 'CLEAR_HIDDEN_NAV':
      return {
        ...state,
        HiddenMenuComponent: null,
        shouldRenderHiddenMenu: false,
      };
    default:
      return state;
  }
}



export {hiddenMenuInitialState, hiddenMenuReducer}
