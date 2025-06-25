import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ErrorMessage} from '../../../components/error/error'

describe('ErrorMessage', () => {
  const mockErrorProps = {
    error: new Error('Test error message'),
    resetErrorBoundary: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders error message with default props', () => {
    render(<ErrorMessage error={mockErrorProps} />)
    
    expect(screen.getByText('There was an error:')).toBeInTheDocument()
    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  test('has role alert for accessibility', () => {
    render(<ErrorMessage error={mockErrorProps} />)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  test('applies stacked variant by default', () => {
    const { container } = render(<ErrorMessage error={mockErrorProps} />)
    
    const errorMessage = container.firstChild
    expect(errorMessage).toHaveClass('error-message', 'error-message-stacked')
    
    const preElement = container.querySelector('pre')
    expect(preElement).toHaveClass('error-message-pre', 'error-message-pre-stacked')
  })

  test('applies inline variant when specified', () => {
    const { container } = render(<ErrorMessage error={mockErrorProps} variant="inline" />)
    
    const errorMessage = container.firstChild
    expect(errorMessage).toHaveClass('error-message', 'error-message-inline')
    
    const preElement = container.querySelector('pre')
    expect(preElement).toHaveClass('error-message-pre', 'error-message-pre-inline')
  })

  test('applies custom className', () => {
    const { container } = render(<ErrorMessage error={mockErrorProps} className="custom-error" />)
    
    expect(container.firstChild).toHaveClass('error-message', 'error-message-stacked', 'custom-error')
  })

  test('renders error message in pre element', () => {
    render(<ErrorMessage error={mockErrorProps} />)
    
    const preElement = screen.getByText('Test error message')
    expect(preElement.tagName).toBe('PRE')
  })

  test('handles different error messages', () => {
    const differentErrorProps = {
      error: new Error('Different error'),
      resetErrorBoundary: jest.fn()
    }
    
    render(<ErrorMessage error={differentErrorProps} />)
    
    expect(screen.getByText('Different error')).toBeInTheDocument()
  })

  test('trims className properly when no custom className', () => {
    const { container } = render(<ErrorMessage error={mockErrorProps} />)
    
    const element = container.firstChild as HTMLElement
    expect(element.className).toBe('error-message error-message-stacked')
  })

  test('trims className properly with custom className', () => {
    const { container } = render(<ErrorMessage error={mockErrorProps} className="custom" />)
    
    const element = container.firstChild as HTMLElement
    expect(element.className).toBe('error-message error-message-stacked custom')
  })

  test('passes additional props to container', () => {
    const { container } = render(
      <ErrorMessage 
        error={mockErrorProps} 
        data-testid="custom-error"
        aria-describedby="error-description"
      />
    )
    
    const element = container.firstChild as HTMLElement
    expect(element).toHaveAttribute('data-testid', 'custom-error')
    expect(element).toHaveAttribute('aria-describedby', 'error-description')
  })

  test('handles empty className', () => {
    const { container } = render(<ErrorMessage error={mockErrorProps} className="" />)
    
    const element = container.firstChild as HTMLElement
    expect(element.className).toBe('error-message error-message-stacked')
  })

  test('structure is correct for stacked variant', () => {
    const { container } = render(<ErrorMessage error={mockErrorProps} variant="stacked" />)
    
    expect(container.querySelector('.error-message')).toBeInTheDocument()
    expect(container.querySelector('.error-message-stacked')).toBeInTheDocument()
    expect(container.querySelector('.error-message-pre')).toBeInTheDocument()
    expect(container.querySelector('.error-message-pre-stacked')).toBeInTheDocument()
  })

  test('structure is correct for inline variant', () => {
    const { container } = render(<ErrorMessage error={mockErrorProps} variant="inline" />)
    
    expect(container.querySelector('.error-message')).toBeInTheDocument()
    expect(container.querySelector('.error-message-inline')).toBeInTheDocument()
    expect(container.querySelector('.error-message-pre')).toBeInTheDocument()
    expect(container.querySelector('.error-message-pre-inline')).toBeInTheDocument()
  })
})