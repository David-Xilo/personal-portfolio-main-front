import React from 'react'
import {
  hiddenMenuReducer,
  hiddenMenuInitialState,
  SET_HIDDEN_NAV,
  CLEAR_HIDDEN_NAV,
  TOGGLE_HIDDEN_MENU,
  HiddenMenuState,
  HiddenMenuAction
} from '../../reducers/hidden-menu-reducer'

// Test component
const TestComponent: React.FC = () => <div>Test Component</div>

describe('hiddenMenuReducer', () => {
  test('has correct initial state', () => {
    expect(hiddenMenuInitialState.shouldRenderHiddenMenu).toBe(false)
    expect(hiddenMenuInitialState.isHiddenMenuExpanded).toBe(false)
    expect(hiddenMenuInitialState.HiddenMenuComponent).toBeDefined()
  })

  test('SET_HIDDEN_NAV action sets hidden navigation', () => {
    const action: HiddenMenuAction = {
      type: SET_HIDDEN_NAV,
      component: TestComponent,
      isExpanded: false
    }

    const newState = hiddenMenuReducer(hiddenMenuInitialState, action)

    expect(newState.HiddenMenuComponent).toBe(TestComponent)
    expect(newState.shouldRenderHiddenMenu).toBe(true)
    expect(newState.isHiddenMenuExpanded).toBe(false)
  })

  test('CLEAR_HIDDEN_NAV action clears hidden navigation', () => {
    const initialStateWithComponent: HiddenMenuState = {
      HiddenMenuComponent: TestComponent,
      shouldRenderHiddenMenu: true,
      isHiddenMenuExpanded: true
    }

    const action: HiddenMenuAction = {
      type: CLEAR_HIDDEN_NAV,
      isExpanded: false
    }

    const newState = hiddenMenuReducer(initialStateWithComponent, action)

    expect(newState.shouldRenderHiddenMenu).toBe(false)
    expect(newState.isHiddenMenuExpanded).toBe(false)
    expect(newState.HiddenMenuComponent).not.toBe(TestComponent)
  })

  test('TOGGLE_HIDDEN_MENU action toggles menu expansion state', () => {
    const action: HiddenMenuAction = {
      type: TOGGLE_HIDDEN_MENU,
      isExpanded: true
    }

    const newState = hiddenMenuReducer(hiddenMenuInitialState, action)

    expect(newState.isHiddenMenuExpanded).toBe(true)
    expect(newState.shouldRenderHiddenMenu).toBe(false) // unchanged
    expect(newState.HiddenMenuComponent).toBe(hiddenMenuInitialState.HiddenMenuComponent) // unchanged
  })

  test('TOGGLE_HIDDEN_MENU action can collapse menu', () => {
    const expandedState: HiddenMenuState = {
      ...hiddenMenuInitialState,
      isHiddenMenuExpanded: true
    }

    const action: HiddenMenuAction = {
      type: TOGGLE_HIDDEN_MENU,
      isExpanded: false
    }

    const newState = hiddenMenuReducer(expandedState, action)

    expect(newState.isHiddenMenuExpanded).toBe(false)
  })

  test('unknown action returns unchanged state', () => {
    const unknownAction: HiddenMenuAction = {
      type: 'UNKNOWN_ACTION',
      isExpanded: false
    }

    const newState = hiddenMenuReducer(hiddenMenuInitialState, unknownAction)

    expect(newState).toEqual(hiddenMenuInitialState)
  })

  test('maintains state immutability', () => {
    const action: HiddenMenuAction = {
      type: SET_HIDDEN_NAV,
      component: TestComponent,
      isExpanded: false
    }

    const newState = hiddenMenuReducer(hiddenMenuInitialState, action)

    expect(newState).not.toBe(hiddenMenuInitialState)
    expect(hiddenMenuInitialState.shouldRenderHiddenMenu).toBe(false) // original state unchanged
  })

  test('SET_HIDDEN_NAV preserves isHiddenMenuExpanded state', () => {
    const expandedState: HiddenMenuState = {
      ...hiddenMenuInitialState,
      isHiddenMenuExpanded: true
    }

    const action: HiddenMenuAction = {
      type: SET_HIDDEN_NAV,
      component: TestComponent,
      isExpanded: false
    }

    const newState = hiddenMenuReducer(expandedState, action)

    expect(newState.isHiddenMenuExpanded).toBe(true) // preserved from previous state
    expect(newState.shouldRenderHiddenMenu).toBe(true)
    expect(newState.HiddenMenuComponent).toBe(TestComponent)
  })

  test('action constants are exported correctly', () => {
    expect(SET_HIDDEN_NAV).toBe('SET_HIDDEN_NAV')
    expect(CLEAR_HIDDEN_NAV).toBe('CLEAR_HIDDEN_NAV')
    expect(TOGGLE_HIDDEN_MENU).toBe('TOGGLE_HIDDEN_MENU')
  })
})