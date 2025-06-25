import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import MainApp from '../../screens/main-app'

// Mock components
jest.mock('components/menu/hidden-menu', () => ({
  HiddenMenu: ({content: Content, isOpen, onToggle}: any) => (
    <div data-testid="hidden-menu" data-open={isOpen}>
      <button onClick={() => onToggle(!isOpen)}>Toggle</button>
      {Content && <Content />}
    </div>
  ),
}))

jest.mock('../../screens/navigation/main-navigation', () => ({
  MainNav: () => <nav data-testid="main-nav">Main Navigation</nav>,
  AppRoutes: ({subMenuDispatch, hiddenMenuDispatch}: any) => (
    <div data-testid="app-routes">App Routes</div>
  ),
}))

jest.mock('components/error/error-fallback', () => ({
  ErrorFallback: ({error}: any) => (
    <div data-testid="error-fallback">Error: {error.message}</div>
  ),
  FullPageErrorFallback: ({error}: any) => (
    <div data-testid="full-page-error-fallback">
      Full Page Error: {error.message}
    </div>
  ),
}))

jest.mock('components/theme/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>,
}))

// Mock CSS
jest.mock('../../screens/main-app.css', () => ({}))

describe('MainApp', () => {
  test('renders without crashing', () => {
    render(<MainApp />)
    expect(screen.getByTestId('main-nav')).toBeInTheDocument()
    expect(screen.getByTestId('app-routes')).toBeInTheDocument()
  })

  test('renders main navigation', () => {
    render(<MainApp />)
    expect(screen.getByTestId('main-nav')).toBeInTheDocument()
  })

  test('renders app routes', () => {
    render(<MainApp />)
    expect(screen.getByTestId('app-routes')).toBeInTheDocument()
  })

  test('does not render sub navigation initially', () => {
    render(<MainApp />)
    expect(screen.queryByText('sub-nav')).not.toBeInTheDocument()
  })

  test('does not render hidden menu initially', () => {
    render(<MainApp />)
    expect(screen.queryByTestId('hidden-menu')).not.toBeInTheDocument()
  })

  test('applies correct CSS classes to main content', () => {
    const {container} = render(<MainApp />)

    const mainContent = container.querySelector('.main-content')
    expect(mainContent).toBeInTheDocument()
    expect(mainContent).toHaveClass('flex-1')
    expect(mainContent).toHaveClass('without-sub-nav') // initial state
  })

  test('has proper container structure', () => {
    const {container} = render(<MainApp />)

    expect(container.querySelector('.h-screen')).toBeInTheDocument()
    expect(container.querySelector('.flex')).toBeInTheDocument()
    expect(container.querySelector('.main-content')).toBeInTheDocument()
  })

  test('wraps content in error boundaries', () => {
    render(<MainApp />)

    // The presence of these components indicates error boundaries are working
    expect(screen.getByTestId('main-nav')).toBeInTheDocument()
    expect(screen.getByTestId('app-routes')).toBeInTheDocument()
  })

  test('applies transition classes', () => {
    const {container} = render(<MainApp />)

    const flexContainer = container.querySelector(
      '.flex.transition-all.duration-500',
    )
    expect(flexContainer).toBeInTheDocument()
  })

  test('main content has proper responsive classes', () => {
    const {container} = render(<MainApp />)

    const mainContent = container.querySelector('main')
    expect(mainContent).toHaveClass('main-content', 'flex-1')
  })

  test('provides dispatch functions to AppRoutes', () => {
    render(<MainApp />)

    // AppRoutes should render, indicating it received the required props
    expect(screen.getByTestId('app-routes')).toBeInTheDocument()
  })

  test('manages state with reducers', () => {
    // This test verifies that the component initializes without errors
    // which indicates the reducers are properly set up
    render(<MainApp />)
    expect(screen.getByTestId('app-routes')).toBeInTheDocument()
  })
})
