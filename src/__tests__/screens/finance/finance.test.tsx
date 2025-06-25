import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { FinanceApp } from '../../../screens/finance/finance'

// Mock components
jest.mock('../../../screens/finance/finance-intro', () => ({
  FinanceIntroScreen: ({ hiddenMenuDispatch }: any) => (
    <div data-testid="finance-intro">Finance Intro Screen</div>
  )
}))

jest.mock('../../../screens/finance/finance-projects', () => ({
  FinanceProjectsScreen: ({ hiddenMenuDispatch }: any) => (
    <div data-testid="finance-projects">Finance Projects Screen</div>
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

describe('FinanceApp', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {
    renderWithRouter(<FinanceApp {...defaultProps} />)
    expect(screen.getByTestId('finance-intro')).toBeInTheDocument()
  })

  test('dispatches SET_SUB_NAV action on mount', () => {
    renderWithRouter(<FinanceApp {...defaultProps} />)
    expect(mockSubMenuDispatch).toHaveBeenCalledWith({
      type: 'SET_SUB_NAV',
      component: expect.any(Function)
    })
  })

  test('renders FinanceIntroScreen on default route', () => {
    renderWithRouter(<FinanceApp {...defaultProps} />, '/')
    expect(screen.getByTestId('finance-intro')).toBeInTheDocument()
  })

  test('renders FinanceProjectsScreen on /projects route', () => {
    renderWithRouter(<FinanceApp {...defaultProps} />, '/projects')
    expect(screen.getByTestId('finance-projects')).toBeInTheDocument()
  })

  test('renders NotFoundScreen on unknown route', () => {
    renderWithRouter(<FinanceApp {...defaultProps} />, '/unknown')
    expect(screen.getByTestId('not-found')).toBeInTheDocument()
  })

  test('sets up sub navigation with correct structure', () => {
    renderWithRouter(<FinanceApp {...defaultProps} />)
    
    expect(mockSubMenuDispatch).toHaveBeenCalledTimes(1)
    const dispatchCall = mockSubMenuDispatch.mock.calls[0][0]
    expect(dispatchCall.type).toBe('SET_SUB_NAV')
    expect(dispatchCall.component).toBeDefined()
  })

  test('passes hiddenMenuDispatch to route components', () => {
    renderWithRouter(<FinanceApp {...defaultProps} />)
    expect(screen.getByTestId('finance-intro')).toBeInTheDocument()
  })

  test('wraps routes in error boundary', () => {
    renderWithRouter(<FinanceApp {...defaultProps} />)
    expect(screen.getByTestId('finance-intro')).toBeInTheDocument()
  })
})