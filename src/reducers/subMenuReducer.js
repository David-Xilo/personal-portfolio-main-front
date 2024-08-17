
const subMenuInitialState = {
  SubNavComponent: null,
  shouldRenderSubNav: false,
};


function subMenuReducer(state, action) {
  switch (action.type) {
    case 'SET_SUB_NAV':
      return {
        ...state,
        SubNavComponent: action.component,
        shouldRenderSubNav: true,
      };
    case 'CLEAR_SUB_NAV':
      return {
        ...state,
        SubNavComponent: null,
        shouldRenderSubNav: false,
      };
    default:
      return state;
  }
}


export {subMenuInitialState, subMenuReducer}


