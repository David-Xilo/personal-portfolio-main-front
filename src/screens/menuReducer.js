import * as React from 'react'
import {Link} from '../components/lib'

function EmptyContent() {
  return <AboutContent />
}

function AboutContent() {
  return (<p style={{padding: '10px 10px 10px 50px'}}>
    Hello!
    Welcome to my personal page. Here you can explore some of my personal projects related
    with <Link to="/blog">blog</Link>.
    Have fun!
  </p>);
}

const subMenuInitialState = {
  SubNavComponent: EmptyContent,
  shouldRenderSubNav: false,
};

const hiddenMenuInitialState = {
  SubNavComponent: EmptyContent,
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
        subMenuInitialState
      };
    default:
      return state;
  }
}

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
        hiddenMenuInitialState
      };
    default:
      return state;
  }
}

export {subMenuInitialState, hiddenMenuInitialState, subMenuReducer, hiddenMenuReducer}
