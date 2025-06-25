import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { WelcomeScreen } from '../../../screens/welcome/welcome'

// Mock components and CSS
jest.mock('components/intro/intro-header', () => ({
  IntroHeader: ({ title, colorScheme }: any) => (
    <div data-testid="intro-header">
      <h1>{title}</h1>
      <span data-testid="color-scheme">{colorScheme.primary}-{colorScheme.secondary}</span>
    </div>
  )
}))

jest.mock('../../../screens/welcome/welcome.css', () => ({}))

const mockSubMenuDispatch = jest.fn()
const mockHiddenMenuDispatch = jest.fn()

const defaultProps = {
  subMenuDispatch: mockSubMenuDispatch,
  hiddenMenuDispatch: mockHiddenMenuDispatch
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  )
}

describe('WelcomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {
    renderWithRouter(<WelcomeScreen {...defaultProps} />)
    expect(screen.getByText('Welcome!')).toBeInTheDocument()
  })

  test('dispatches clear actions on mount', () => {
    renderWithRouter(<WelcomeScreen {...defaultProps} />)
    
    expect(mockHiddenMenuDispatch).toHaveBeenCalledWith({
      type: 'CLEAR_HIDDEN_NAV'
    })
    expect(mockSubMenuDispatch).toHaveBeenCalledWith({
      type: 'CLEAR_SUB_NAV'
    })
  })

  test('renders intro header with correct props', () => {
    renderWithRouter(<WelcomeScreen {...defaultProps} />)
    
    expect(screen.getByText('Welcome!')).toBeInTheDocument()
    expect(screen.getByTestId('color-scheme')).toHaveTextContent('cyan-purple')
  })

  test('renders welcome introduction text', () => {
    renderWithRouter(<WelcomeScreen {...defaultProps} />)
    
    expect(screen.getByText(/Hello! Welcome to my personal page/)).toBeInTheDocument()
    expect(screen.getByText(/I've made this to hold myself accountable/)).toBeInTheDocument()
  })

  test('renders navigation instruction text', () => {
    renderWithRouter(<WelcomeScreen {...defaultProps} />)
    
    expect(screen.getByText(/You can navigate through my interests/)).toBeInTheDocument()
  })

  test('renders all welcome cards', () => {
    renderWithRouter(<WelcomeScreen {...defaultProps} />)
    
    // Check for card titles
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('Gaming')).toBeInTheDocument()
    expect(screen.getByText('Finance')).toBeInTheDocument()
    
    // Check for card descriptions
    expect(screen.getByText('Explore my tech projects and experiments')).toBeInTheDocument()
    expect(screen.getByText('Check out my game development journey')).toBeInTheDocument()
    expect(screen.getByText('Discover financial insights and analysis')).toBeInTheDocument()
  })

  test('renders card icons with proper accessibility', () => {
    renderWithRouter(<WelcomeScreen {...defaultProps} />)
    
    expect(screen.getByLabelText('Technology icon')).toBeInTheDocument()
    expect(screen.getByLabelText('Gaming icon')).toBeInTheDocument()
    expect(screen.getByLabelText('Finance icon')).toBeInTheDocument()
  })

  test('renders cards as links with correct routes', () => {
    renderWithRouter(<WelcomeScreen {...defaultProps} />)
    
    const techLink = screen.getByRole('link', { name: /Technology/ })
    const gamesLink = screen.getByRole('link', { name: /Gaming/ })
    const financeLink = screen.getByRole('link', { name: /Finance/ })
    
    expect(techLink).toHaveAttribute('href', '/tech')
    expect(gamesLink).toHaveAttribute('href', '/games')
    expect(financeLink).toHaveAttribute('href', '/finance')
  })

  test('applies correct CSS classes to cards', () => {
    renderWithRouter(<WelcomeScreen {...defaultProps} />)
    
    const techCard = screen.getByRole('link', { name: /Technology/ })
    const gamesCard = screen.getByRole('link', { name: /Gaming/ })
    const financeCard = screen.getByRole('link', { name: /Finance/ })
    
    expect(techCard).toHaveClass('welcome-card', 'tech-card')
    expect(gamesCard).toHaveClass('welcome-card', 'games-card')
    expect(financeCard).toHaveClass('welcome-card', 'finance-card')
  })

  test('has proper container structure', () => {
    const { container } = renderWithRouter(<WelcomeScreen {...defaultProps} />)
    
    expect(container.querySelector('.welcome-container')).toBeInTheDocument()
    expect(container.querySelector('.welcome-content')).toBeInTheDocument()
    expect(container.querySelector('.welcome-cards')).toBeInTheDocument()
  })

  test('renders correct number of welcome cards', () => {
    renderWithRouter(<WelcomeScreen {...defaultProps} />)
    
    const cards = screen.getAllByRole('link')
    expect(cards).toHaveLength(3)
  })
})