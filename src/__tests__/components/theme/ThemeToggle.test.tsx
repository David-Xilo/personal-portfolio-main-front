import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ThemeToggle} from '../../../components/theme/ThemeToggle'

jest.mock('../../../components/theme/sun-icon', () => ({
  SunIcon: () => <div data-testid="sun-icon" />,
}))

jest.mock('../../../components/theme/moon-icon', () => ({
  MoonIcon: () => <div data-testid="moon-icon" />,
}))

const mockLocalStorage = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockLocalStorage.clear()
    document.documentElement.classList.remove('dark-theme')
    jest.clearAllMocks()
  })

  test('renders toggle button', () => {
    render(<ThemeToggle />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('starts with light theme by default', () => {
    render(<ThemeToggle />)

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
  })

  test('has correct aria-label for light theme', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  test('toggles to dark theme when clicked', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  test('toggles back to light theme when clicked again', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  test('saves theme to localStorage', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockLocalStorage.getItem('theme')).toBe('dark')
  })

  test('loads saved theme from localStorage', () => {
    mockLocalStorage.setItem('theme', 'dark')

    render(<ThemeToggle />)

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to light mode',
    )
  })

  test('applies dark-theme class to document element', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(document.documentElement.classList.contains('dark-theme')).toBe(true)
  })

  test('removes dark-theme class when switching to light', () => {
    mockLocalStorage.setItem('theme', 'dark')
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(document.documentElement.classList.contains('dark-theme')).toBe(
      false,
    )
  })

  test('applies custom className', () => {
    render(<ThemeToggle className="custom-class" />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  test('has theme-toggle-button class', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('theme-toggle-button')
  })

  test('handles invalid localStorage theme value', () => {
    mockLocalStorage.setItem('theme', 'invalid')

    render(<ThemeToggle />)

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark mode',
    )
  })

  test('works when localStorage is empty', () => {
    render(<ThemeToggle />)

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark mode',
    )
  })

  test('updates localStorage when theme changes', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(mockLocalStorage.getItem('theme')).toBe('dark')

    fireEvent.click(button)
    expect(mockLocalStorage.getItem('theme')).toBe('light')
  })
})
