import React from 'react'
import {
  subMenuReducer,
  subMenuInitialState,
  SET_SUB_NAV,
  CLEAR_SUB_NAV,
  SubMenuState,
  SubMenuAction,
} from '../../reducers/sub-menu-reducer'

// Test component
const TestSubComponent: React.FC = () => <div>Test Sub Component</div>

describe('subMenuReducer', () => {
  test('has correct initial state', () => {
    expect(subMenuInitialState.shouldRenderSubNav).toBe(false)
    expect(subMenuInitialState.SubNavComponent).toBeDefined()
  })

  test('SET_SUB_NAV action sets sub navigation', () => {
    const action: SubMenuAction = {
      type: SET_SUB_NAV,
      component: TestSubComponent,
    }

    const newState = subMenuReducer(subMenuInitialState, action)

    expect(newState.SubNavComponent).toBe(TestSubComponent)
    expect(newState.shouldRenderSubNav).toBe(true)
  })

  test('CLEAR_SUB_NAV action clears sub navigation', () => {
    const initialStateWithComponent: SubMenuState = {
      SubNavComponent: TestSubComponent,
      shouldRenderSubNav: true,
    }

    const action: SubMenuAction = {
      type: CLEAR_SUB_NAV,
      component: TestSubComponent, // component is required but not used in CLEAR action
    }

    const newState = subMenuReducer(initialStateWithComponent, action)

    expect(newState.shouldRenderSubNav).toBe(false)
    expect(newState.SubNavComponent).not.toBe(TestSubComponent)
  })

  test('unknown action returns unchanged state', () => {
    const unknownAction: SubMenuAction = {
      type: 'UNKNOWN_ACTION',
      component: TestSubComponent,
    }

    const newState = subMenuReducer(subMenuInitialState, unknownAction)

    expect(newState).toEqual(subMenuInitialState)
  })

  test('maintains state immutability', () => {
    const action: SubMenuAction = {
      type: SET_SUB_NAV,
      component: TestSubComponent,
    }

    const newState = subMenuReducer(subMenuInitialState, action)

    expect(newState).not.toBe(subMenuInitialState)
    expect(subMenuInitialState.shouldRenderSubNav).toBe(false) // original state unchanged
  })

  test('SET_SUB_NAV action with different components', () => {
    const AnotherComponent: React.FC = () => <div>Another Component</div>

    const action1: SubMenuAction = {
      type: SET_SUB_NAV,
      component: TestSubComponent,
    }

    const state1 = subMenuReducer(subMenuInitialState, action1)
    expect(state1.SubNavComponent).toBe(TestSubComponent)

    const action2: SubMenuAction = {
      type: SET_SUB_NAV,
      component: AnotherComponent,
    }

    const state2 = subMenuReducer(state1, action2)
    expect(state2.SubNavComponent).toBe(AnotherComponent)
    expect(state2.shouldRenderSubNav).toBe(true)
  })

  test('CLEAR_SUB_NAV resets to empty component', () => {
    const stateWithComponent: SubMenuState = {
      SubNavComponent: TestSubComponent,
      shouldRenderSubNav: true,
    }

    const action: SubMenuAction = {
      type: CLEAR_SUB_NAV,
      component: TestSubComponent,
    }

    const newState = subMenuReducer(stateWithComponent, action)

    expect(newState.shouldRenderSubNav).toBe(false)
    expect(newState.SubNavComponent).toBe(subMenuInitialState.SubNavComponent)
  })

  test('action constants are exported correctly', () => {
    expect(SET_SUB_NAV).toBe('SET_SUB_NAV')
    expect(CLEAR_SUB_NAV).toBe('CLEAR_SUB_NAV')
  })

  test('reducer handles multiple sequential actions', () => {
    const Component1: React.FC = () => <div>Component 1</div>
    const Component2: React.FC = () => <div>Component 2</div>

    // Set first component
    const action1: SubMenuAction = {
      type: SET_SUB_NAV,
      component: Component1,
    }
    const state1 = subMenuReducer(subMenuInitialState, action1)
    expect(state1.SubNavComponent).toBe(Component1)
    expect(state1.shouldRenderSubNav).toBe(true)

    // Replace with second component
    const action2: SubMenuAction = {
      type: SET_SUB_NAV,
      component: Component2,
    }
    const state2 = subMenuReducer(state1, action2)
    expect(state2.SubNavComponent).toBe(Component2)
    expect(state2.shouldRenderSubNav).toBe(true)

    // Clear navigation
    const action3: SubMenuAction = {
      type: CLEAR_SUB_NAV,
      component: Component2,
    }
    const state3 = subMenuReducer(state2, action3)
    expect(state3.shouldRenderSubNav).toBe(false)
    expect(state3.SubNavComponent).not.toBe(Component2)
  })
})
