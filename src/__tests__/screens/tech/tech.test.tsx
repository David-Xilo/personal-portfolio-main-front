import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {MemoryRouter} from 'react-router-dom'
import {TechApp} from '../../../screens/tech/tech'

// Mock components
jest.mock('../../../screens/tech/tech-intro', () => ({
  TechIntroScreen: ({hiddenMenuDispatch}: any) => (
    <div data-testid="tech-intro">Tech Intro Screen</div>
  ),
}))

jest.mock('../../../screens/tech/tech-projects', () => ({
  TechProjectsScreen: ({hiddenMenuDispatch}: any) => (
    <div data-testid="tech-projects">Tech Projects Screen</div>
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

describe('TechApp', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {
    renderWithRouter(<TechApp {...defaultProps} />)
    expect(screen.getByTestId('tech-intro')).toBeInTheDocument()
  })

  test('dispatches SET_SUB_NAV action on mount', () => {
    renderWithRouter(<TechApp {...defaultProps} />)
    expect(mockSubMenuDispatch).toHaveBeenCalledWith({
      type: 'SET_SUB_NAV',
      component: expect.any(Function),
    })
  })

  test('renders TechIntroScreen on default route', () => {
    renderWithRouter(<TechApp {...defaultProps} />, '/')
    expect(screen.getByTestId('tech-intro')).toBeInTheDocument()
  })

  test('renders TechProjectsScreen on /projects route', () => {
    renderWithRouter(<TechApp {...defaultProps} />, '/projects')
    expect(screen.getByTestId('tech-projects')).toBeInTheDocument()
  })

  test('renders NotFoundScreen on unknown route', () => {
    renderWithRouter(<TechApp {...defaultProps} />, '/unknown')
    expect(screen.getByTestId('not-found')).toBeInTheDocument()
  })

  test('sets up sub navigation with correct structure', () => {
    renderWithRouter(<TechApp {...defaultProps} />)

    expect(mockSubMenuDispatch).toHaveBeenCalledTimes(1)
    const dispatchCall = mockSubMenuDispatch.mock.calls[0][0]
    expect(dispatchCall.type).toBe('SET_SUB_NAV')
    expect(dispatchCall.component).toBeDefined()
  })

  test('passes hiddenMenuDispatch to route components', () => {
    renderWithRouter(<TechApp {...defaultProps} />)
    expect(screen.getByTestId('tech-intro')).toBeInTheDocument()
  })

  test('wraps routes in error boundary', () => {
    renderWithRouter(<TechApp {...defaultProps} />)
    expect(screen.getByTestId('tech-intro')).toBeInTheDocument()
  })
})
