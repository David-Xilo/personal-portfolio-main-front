import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {MemoryRouter} from 'react-router-dom'
import {NotFoundScreen} from '../../../components/error/not-found'

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  )
}

describe('NotFoundScreen', () => {
  test('renders not found message', () => {
    renderWithRouter(<NotFoundScreen />)
    
    expect(screen.getByText(/Sorry... nothing here./)).toBeInTheDocument()
  })

  test('renders home link', () => {
    renderWithRouter(<NotFoundScreen />)
    
    const homeLink = screen.getByRole('link', { name: 'Go home' })
    expect(homeLink).toBeInTheDocument()
  })

  test('home link has correct href', () => {
    renderWithRouter(<NotFoundScreen />)
    
    const homeLink = screen.getByRole('link', { name: 'Go home' })
    expect(homeLink).toHaveAttribute('href', '/list')
  })

  test('has correct CSS classes', () => {
    const { container } = renderWithRouter(<NotFoundScreen />)
    
    expect(container.querySelector('.notfound-container')).toBeInTheDocument()
    expect(container.querySelector('.notfound-message')).toBeInTheDocument()
    expect(container.querySelector('.notfound-home-link')).toBeInTheDocument()
  })

  test('renders complete message structure', () => {
    renderWithRouter(<NotFoundScreen />)
    
    const message = screen.getByText(/Sorry... nothing here./)
    const link = screen.getByRole('link', { name: 'Go home' })
    
    expect(message).toBeInTheDocument()
    expect(link).toBeInTheDocument()
    
    expect(message.parentElement).toContainElement(link)
  })

  test('renders without router errors', () => {
    expect(() => renderWithRouter(<NotFoundScreen />)).not.toThrow()
  })

  test('renders correctly when accessed directly', () => {
    renderWithRouter(<NotFoundScreen />, { route: '/non-existent-route' })
    
    expect(screen.getByText(/Sorry... nothing here./)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go home' })).toBeInTheDocument()
  })
})