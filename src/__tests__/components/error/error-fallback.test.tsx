import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  FullPageErrorFallback,
  ErrorFallback,
} from '../../../components/error/error-fallback'

jest.mock('../../../components/error/error', () => ({
  ErrorMessage: ({error, className}: {error: any; className: string}) => (
    <div data-testid="error-message" className={className}>
      Error: {error.error.message}
    </div>
  ),
}))

describe('FullPageErrorFallback', () => {
  const mockError = new Error('Test error message')
  const mockReset = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders error message', () => {
    render(
      <FullPageErrorFallback
        error={mockError}
        resetErrorBoundary={mockReset}
      />,
    )

    expect(
      screen.getByText('Uh oh... There is a problem. Try refreshing the app.'),
    ).toBeInTheDocument()
  })

  test('displays error message in pre element', () => {
    render(
      <FullPageErrorFallback
        error={mockError}
        resetErrorBoundary={mockReset}
      />,
    )

    const preElement = screen.getByText('Test error message')
    expect(preElement.tagName).toBe('PRE')
  })

  test('has role alert for accessibility', () => {
    render(
      <FullPageErrorFallback
        error={mockError}
        resetErrorBoundary={mockReset}
      />,
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  test('has correct CSS class', () => {
    const {container} = render(
      <FullPageErrorFallback
        error={mockError}
        resetErrorBoundary={mockReset}
      />,
    )

    expect(container.firstChild).toHaveClass('fullpage-error-fallback')
  })

  test('renders with different error messages', () => {
    const differentError = new Error('Different error')
    render(
      <FullPageErrorFallback
        error={differentError}
        resetErrorBoundary={mockReset}
      />,
    )

    expect(screen.getByText('Different error')).toBeInTheDocument()
  })
})

describe('ErrorFallback', () => {
  const mockErrorProps = {
    error: new Error('Component error'),
    resetErrorBoundary: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders ErrorMessage component', () => {
    render(<ErrorFallback {...mockErrorProps} />)

    expect(screen.getByTestId('error-message')).toBeInTheDocument()
  })

  test('passes error props to ErrorMessage', () => {
    render(<ErrorFallback {...mockErrorProps} />)

    expect(screen.getByText('Error: Component error')).toBeInTheDocument()
  })

  test('applies correct className to ErrorMessage', () => {
    render(<ErrorFallback {...mockErrorProps} />)

    const errorMessage = screen.getByTestId('error-message')
    expect(errorMessage).toHaveClass('error-fallback')
  })

  test('handles different error types', () => {
    const differentErrorProps = {
      error: new Error('Network error'),
      resetErrorBoundary: jest.fn(),
    }

    render(<ErrorFallback {...differentErrorProps} />)

    expect(screen.getByText('Error: Network error')).toBeInTheDocument()
  })
})
