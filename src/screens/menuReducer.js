import * as React from 'react'
import {BlogHiddenMenuScreen, BlogNav} from './blog'

function EmptyContent() {
  return (<div></div>)
}

const menuInitialState = {
  SubNavComponent: EmptyContent,
  HiddenMenuComponent: EmptyContent,
  shouldRenderSubNav: false,
  shouldRenderHiddenMenu: false,
};

function menuReducer(state, action) {
  switch (action.type) {
    case 'SET_BLOG_NAV':
      return {
        ...state,
        SubNavComponent: BlogNav,
        HiddenMenuComponent: BlogHiddenMenuScreen,
        shouldRenderSubNav: true,
        shouldRenderHiddenMenu: true,
      };
    case 'CLEAR_NAV':
      return {
        ...state,
        SubNavComponent: EmptyContent,
        HiddenMenuComponent: EmptyContent,
        shouldRenderSubNav: false,
        shouldRenderHiddenMenu: false,
      };
    default:
      return state;
  }
}

export {menuInitialState, menuReducer}
