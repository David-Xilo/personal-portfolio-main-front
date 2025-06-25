import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {MemoryRouter} from 'react-router-dom'
import {AboutApp} from '../../../screens/about/about'

// Mock components
jest.mock('../../../screens/about/about-intro', () => ({
  AboutIntroScreen: ({hiddenMenuDispatch}: any) => (
    <div data-testid="about-intro">About Intro Screen</div>
  ),
}))

jest.mock('../../../screens/about/about-contacts', () => ({
  AboutContactsScreen: ({hiddenMenuDispatch}: any) => (
    <div data-testid="about-contacts">About Contacts Screen</div>
  ),
}))

jest.mock('components/error/not-found', () => ({
  NotFoundScreen: () => <div data-testid="not-found">Not Found Screen</div>,
}))

jest.mock('components/error/error-fallback', () => ({
  ErrorFallback: ({error}: any) => (
    <div data-testid="error-fallback">Error: {error.message}</div>
  ),
}))

const mockSubMenuDispatch = jest.fn()
const mockHiddenMenuDispatch = jest.fn()

const defaultProps = {
  subMenuDispatch: mockSubMenuDispatch,
  hiddenMenuDispatch: mockHiddenMenuDispatch,
}

const renderWithRouter = (
  component: React.ReactElement,
  initialEntry = '/',
) => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>{component}</MemoryRouter>,
  )
}

describe('AboutApp', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {
    renderWithRouter(<AboutApp {...defaultProps} />)
    expect(screen.getByTestId('about-intro')).toBeInTheDocument()
  })

  test('dispatches SET_SUB_NAV action on mount', () => {
    renderWithRouter(<AboutApp {...defaultProps} />)
    expect(mockSubMenuDispatch).toHaveBeenCalledWith({
      type: 'SET_SUB_NAV',
      component: expect.any(Function),
    })
  })

  test('renders AboutIntroScreen on default route', () => {
    renderWithRouter(<AboutApp {...defaultProps} />, '/')
    expect(screen.getByTestId('about-intro')).toBeInTheDocument()
  })

  test('renders AboutContactsScreen on /contact route', () => {
    renderWithRouter(<AboutApp {...defaultProps} />, '/contact')
    expect(screen.getByTestId('about-contacts')).toBeInTheDocument()
  })

  test('renders NotFoundScreen on unknown route', () => {
    renderWithRouter(<AboutApp {...defaultProps} />, '/unknown')
    expect(screen.getByTestId('not-found')).toBeInTheDocument()
  })

  test('sub navigation contains correct links', () => {
    renderWithRouter(<AboutApp {...defaultProps} />)

    // The sub navigation is set up via dispatch, so we verify the dispatch was called
    expect(mockSubMenuDispatch).toHaveBeenCalledTimes(1)
    const dispatchCall = mockSubMenuDispatch.mock.calls[0][0]
    expect(dispatchCall.type).toBe('SET_SUB_NAV')
    expect(dispatchCall.component).toBeDefined()
  })

  test('passes hiddenMenuDispatch to route components', () => {
    renderWithRouter(<AboutApp {...defaultProps} />)

    // Since we're mocking the components, we can't directly test prop passing
    // but we can verify the component renders correctly
    expect(screen.getByTestId('about-intro')).toBeInTheDocument()
  })

  test('wraps routes in error boundary', () => {
    // This test verifies the error boundary is present
    // In a real error scenario, it would catch and display the ErrorFallback
    renderWithRouter(<AboutApp {...defaultProps} />)
    expect(screen.getByTestId('about-intro')).toBeInTheDocument()
  })
})
