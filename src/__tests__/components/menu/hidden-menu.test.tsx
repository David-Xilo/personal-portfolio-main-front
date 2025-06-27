import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import {HiddenMenu} from '../../../components/menu/hidden-menu'

jest.mock('../../../components/icons/arrow-left-icon', () => ({
  ArrowLeftIcon: () => <div data-testid="arrow-left" />,
}))

jest.mock('../../../components/icons/arrow-right-icon', () => ({
  ArrowRightIcon: () => <div data-testid="arrow-right" />,
}))

const MockContent = () => <div data-testid="menu-content">Menu Content</div>

describe('HiddenMenu', () => {
  const defaultProps = {
    content: MockContent,
    isOpen: false,
    onToggle: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders toggle button', () => {
    render(<HiddenMenu {...defaultProps} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('shows correct icon when closed', () => {
    render(<HiddenMenu {...defaultProps} />)

    expect(screen.getByTestId('arrow-left')).toBeInTheDocument()
    expect(screen.queryByTestId('arrow-right')).not.toBeInTheDocument()
  })

  test('shows correct icon when open', () => {
    render(<HiddenMenu {...defaultProps} isOpen={true} />)

    expect(screen.getByTestId('arrow-right')).toBeInTheDocument()
    expect(screen.queryByTestId('arrow-left')).not.toBeInTheDocument()
  })

  test('has correct aria-label when closed', () => {
    render(<HiddenMenu {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Open menu')
  })

  test('has correct aria-label when open', () => {
    render(<HiddenMenu {...defaultProps} isOpen={true} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Close menu')
  })

  test('has correct aria-expanded attribute', () => {
    const {rerender} = render(<HiddenMenu {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')

    rerender(<HiddenMenu {...defaultProps} isOpen={true} />)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  test('calls onToggle when button is clicked', () => {
    const onToggle = jest.fn()
    render(<HiddenMenu {...defaultProps} onToggle={onToggle} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(onToggle).toHaveBeenCalledWith(true)
  })

  test('calls onToggle with opposite state', () => {
    const onToggle = jest.fn()
    render(<HiddenMenu {...defaultProps} isOpen={true} onToggle={onToggle} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(onToggle).toHaveBeenCalledWith(false)
  })

  test('renders content when provided', () => {
    render(<HiddenMenu {...defaultProps} />)

    expect(screen.getByTestId('menu-content')).toBeInTheDocument()
  })

  test('does not render content when not provided', () => {
    render(<HiddenMenu {...defaultProps} content={undefined} />)

    expect(screen.queryByTestId('menu-content')).not.toBeInTheDocument()
  })

  test('has correct aria-hidden on container when closed', () => {
    const {container} = render(<HiddenMenu {...defaultProps} />)

    const menuContainer = container.querySelector('.hidden-menu-container')
    expect(menuContainer).toHaveAttribute('aria-hidden', 'true')
  })

  test('has correct aria-hidden on container when open', () => {
    const {container} = render(<HiddenMenu {...defaultProps} isOpen={true} />)

    const menuContainer = container.querySelector('.hidden-menu-container')
    expect(menuContainer).toHaveAttribute('aria-hidden', 'false')
  })

  test('applies correct CSS classes', () => {
    const {container} = render(<HiddenMenu {...defaultProps} />)

    expect(container.querySelector('.hidden-menu-button')).toBeInTheDocument()
    expect(
      container.querySelector('.hidden-menu-container'),
    ).toBeInTheDocument()
    expect(container.querySelector('.hidden-menu-content')).toBeInTheDocument()
  })

  test('applies inline styles for positioning', () => {
    const {container} = render(<HiddenMenu {...defaultProps} />)

    const button = container.querySelector('.hidden-menu-button')
    const menuContainer = container.querySelector('.hidden-menu-container')

    expect(button).toHaveStyle({right: '0'})
    expect(menuContainer).toHaveStyle({
      right: 'calc(-1 * var(--hidden-menu-width))',
    })
  })

  test('applies different inline styles when open', () => {
    const {container} = render(<HiddenMenu {...defaultProps} isOpen={true} />)

    const button = container.querySelector('.hidden-menu-button')
    const menuContainer = container.querySelector('.hidden-menu-container')

    expect(button).toHaveStyle({right: 'var(--hidden-menu-width)'})
    expect(menuContainer).toHaveStyle({right: '0'})
  })
})
