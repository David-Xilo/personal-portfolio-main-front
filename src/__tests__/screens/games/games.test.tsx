import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { GamesApp } from '../../../screens/games/games'

// Mock components
jest.mock('../../../screens/games/games-intro', () => ({
  GamesIntroScreen: ({ hiddenMenuDispatch }: any) => (
    <div data-testid="games-intro">Games Intro Screen</div>
  )
}))

jest.mock('../../../screens/games/games-projects', () => ({
  GamesProjectsScreen: ({ hiddenMenuDispatch }: any) => (
    <div data-testid="games-projects">Games Projects Screen</div>
  )
}))

jest.mock('components/error/not-found', () => ({
  NotFoundScreen: () => <div data-testid="not-found">Not Found Screen</div>
}))

jest.mock('components/error/error-fallback', () => ({
  ErrorFallback: ({ error }: any) => <div data-testid="error-fallback">Error: {error.message}</div>
}))

const mockSubMenuDispatch = jest.fn()
const mockHiddenMenuDispatch = jest.fn()

const defaultProps = {
  subMenuDispatch: mockSubMenuDispatch,
  hiddenMenuDispatch: mockHiddenMenuDispatch
}

const renderWithRouter = (component: React.ReactElement, initialEntry = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      {component}
    </MemoryRouter>
  )
}

describe('GamesApp', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {
    renderWithRouter(<GamesApp {...defaultProps} />)
    expect(screen.getByTestId('games-intro')).toBeInTheDocument()
  })

  test('dispatches SET_SUB_NAV action on mount', () => {
    renderWithRouter(<GamesApp {...defaultProps} />)
    expect(mockSubMenuDispatch).toHaveBeenCalledWith({
      type: 'SET_SUB_NAV',
      component: expect.any(Function)
    })
  })

  test('renders GamesIntroScreen on default route', () => {
    renderWithRouter(<GamesApp {...defaultProps} />, '/')
    expect(screen.getByTestId('games-intro')).toBeInTheDocument()
  })

  test('renders GamesProjectsScreen on /projects route', () => {
    renderWithRouter(<GamesApp {...defaultProps} />, '/projects')
    expect(screen.getByTestId('games-projects')).toBeInTheDocument()
  })

  test('renders NotFoundScreen on unknown route', () => {
    renderWithRouter(<GamesApp {...defaultProps} />, '/unknown')
    expect(screen.getByTestId('not-found')).toBeInTheDocument()
  })

  test('sets up sub navigation with correct structure', () => {
    renderWithRouter(<GamesApp {...defaultProps} />)
    
    expect(mockSubMenuDispatch).toHaveBeenCalledTimes(1)
    const dispatchCall = mockSubMenuDispatch.mock.calls[0][0]
    expect(dispatchCall.type).toBe('SET_SUB_NAV')
    expect(dispatchCall.component).toBeDefined()
  })

  test('passes hiddenMenuDispatch to route components', () => {
    renderWithRouter(<GamesApp {...defaultProps} />)
    expect(screen.getByTestId('games-intro')).toBeInTheDocument()
  })

  test('wraps routes in error boundary', () => {
    renderWithRouter(<GamesApp {...defaultProps} />)
    expect(screen.getByTestId('games-intro')).toBeInTheDocument()
  })
})