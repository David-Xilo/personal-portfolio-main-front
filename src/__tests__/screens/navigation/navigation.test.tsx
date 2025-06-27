import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {MemoryRouter} from 'react-router-dom'
import {MainNavLink, SubNavLink} from '../../../screens/navigation/navigation'

// Mock CSS
jest.mock('../../../screens/navigation/navigation.css', () => ({}))

const renderWithRouter = (
  component: React.ReactElement,
  initialEntry = '/',
) => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>{component}</MemoryRouter>,
  )
}

describe('MainNavLink', () => {
  test('renders without crashing', () => {
    renderWithRouter(<MainNavLink to="/test">Test Link</MainNavLink>)
    expect(screen.getByRole('link', {name: 'Test Link'})).toBeInTheDocument()
  })

  test('renders children correctly', () => {
    renderWithRouter(<MainNavLink to="/test">Test Content</MainNavLink>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('sets correct href attribute', () => {
    renderWithRouter(<MainNavLink to="/example">Example Link</MainNavLink>)
    const link = screen.getByRole('link', {name: 'Example Link'})
    expect(link).toHaveAttribute('href', '/example')
  })

  test('applies base CSS class', () => {
    renderWithRouter(<MainNavLink to="/test">Test Link</MainNavLink>)
    const link = screen.getByRole('link', {name: 'Test Link'})
    expect(link).toHaveClass('sub-nav-link')
  })

  test('applies active class when route matches', () => {
    renderWithRouter(<MainNavLink to="/test">Test Link</MainNavLink>, '/test')
    const link = screen.getByRole('link', {name: 'Test Link'})
    expect(link).toHaveClass('sub-nav-link', 'sub-nav-link--active')
  })

  test('does not apply active class when route does not match', () => {
    renderWithRouter(<MainNavLink to="/test">Test Link</MainNavLink>, '/other')
    const link = screen.getByRole('link', {name: 'Test Link'})
    expect(link).toHaveClass('sub-nav-link')
    expect(link).not.toHaveClass('sub-nav-link--active')
  })
})

describe('SubNavLink', () => {
  test('renders without crashing', () => {
    renderWithRouter(<SubNavLink to="/test">Test Link</SubNavLink>)
    expect(screen.getByRole('link', {name: 'Test Link'})).toBeInTheDocument()
  })

  test('renders children correctly', () => {
    renderWithRouter(<SubNavLink to="/test">Sub Test Content</SubNavLink>)
    expect(screen.getByText('Sub Test Content')).toBeInTheDocument()
  })

  test('sets correct href attribute', () => {
    renderWithRouter(<SubNavLink to="/example">Example Sub Link</SubNavLink>)
    const link = screen.getByRole('link', {name: 'Example Sub Link'})
    expect(link).toHaveAttribute('href', '/example')
  })

  test('applies base CSS class', () => {
    renderWithRouter(<SubNavLink to="/test">Test Link</SubNavLink>)
    const link = screen.getByRole('link', {name: 'Test Link'})
    expect(link).toHaveClass('sub-nav-link')
  })

  test('applies active class when route matches exactly', () => {
    renderWithRouter(<SubNavLink to="/test">Test Link</SubNavLink>, '/test')
    const link = screen.getByRole('link', {name: 'Test Link'})
    expect(link).toHaveClass('sub-nav-link', 'sub-nav-link--active')
  })

  test('does not apply active class when route does not match', () => {
    renderWithRouter(<SubNavLink to="/test">Test Link</SubNavLink>, '/other')
    const link = screen.getByRole('link', {name: 'Test Link'})
    expect(link).toHaveClass('sub-nav-link')
    expect(link).not.toHaveClass('sub-nav-link--active')
  })

  test('uses end prop for exact matching', () => {
    // SubNavLink should use end prop for exact matching
    // This is verified by the component structure but can't be easily tested without DOM inspection
    renderWithRouter(<SubNavLink to="/test">Test Link</SubNavLink>, '/test/sub')
    const link = screen.getByRole('link', {name: 'Test Link'})
    expect(link).not.toHaveClass('sub-nav-link--active')
  })

  test('handles complex routes', () => {
    renderWithRouter(
      <SubNavLink to="/complex/path">Complex Link</SubNavLink>,
      '/complex/path',
    )
    const link = screen.getByRole('link', {name: 'Complex Link'})
    expect(link).toHaveAttribute('href', '/complex/path')
    expect(link).toHaveClass('sub-nav-link--active')
  })
})

describe('Navigation Links Integration', () => {
  test('both link types can be rendered together', () => {
    renderWithRouter(
      <div>
        <MainNavLink to="/main">Main Link</MainNavLink>
        <SubNavLink to="/sub">Sub Link</SubNavLink>
      </div>,
    )

    expect(screen.getByRole('link', {name: 'Main Link'})).toBeInTheDocument()
    expect(screen.getByRole('link', {name: 'Sub Link'})).toBeInTheDocument()
  })

  test('different link types have same base styling', () => {
    renderWithRouter(
      <div>
        <MainNavLink to="/main">Main Link</MainNavLink>
        <SubNavLink to="/sub">Sub Link</SubNavLink>
      </div>,
    )

    const mainLink = screen.getByRole('link', {name: 'Main Link'})
    const subLink = screen.getByRole('link', {name: 'Sub Link'})

    expect(mainLink).toHaveClass('sub-nav-link')
    expect(subLink).toHaveClass('sub-nav-link')
  })
})
