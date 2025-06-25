import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ContentListItem} from '../../../components/menu/content-list-item'

jest.mock('../../../components/icons/arrow-up-icon', () => ({
  ArrowUpIcon: () => <div data-testid="arrow-up" />
}))

jest.mock('../../../components/icons/arrow-down-icon', () => ({
  ArrowDownIcon: () => <div data-testid="arrow-down" />
}))

describe('ContentListItem', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test description'
  }

  test('renders title and description', () => {
    render(<ContentListItem {...defaultProps} />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title')
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  test('starts in collapsed state', () => {
    render(<ContentListItem {...defaultProps} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-label', 'Expand Test Title')
    expect(screen.getByTestId('arrow-down')).toBeInTheDocument()
  })

  test('expands when clicked', () => {
    render(<ContentListItem {...defaultProps} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveAttribute('aria-label', 'Collapse Test Title')
    expect(screen.getByTestId('arrow-up')).toBeInTheDocument()
    expect(button).toHaveClass('expanded')
  })

  test('toggles between expanded and collapsed states', () => {
    render(<ContentListItem {...defaultProps} />)
    
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  test('handles keyboard navigation with Enter key', () => {
    render(<ContentListItem {...defaultProps} />)
    
    const button = screen.getByRole('button')
    fireEvent.keyDown(button, { key: 'Enter' })
    
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  test('handles keyboard navigation with Space key', () => {
    render(<ContentListItem {...defaultProps} />)
    
    const button = screen.getByRole('button')
    fireEvent.keyDown(button, { key: ' ' })
    
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  test('ignores other keyboard keys', () => {
    render(<ContentListItem {...defaultProps} />)
    
    const button = screen.getByRole('button')
    fireEvent.keyDown(button, { key: 'Tab' })
    
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  test('renders children when expanded', () => {
    const children = <div data-testid="child-content">Child content</div>
    
    render(
      <ContentListItem {...defaultProps}>
        {children}
      </ContentListItem>
    )
    
    expect(screen.queryByTestId('child-content')).not.toBeInTheDocument()
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })

  test('does not render children when collapsed', () => {
    const children = <div data-testid="child-content">Child content</div>
    
    render(
      <ContentListItem {...defaultProps}>
        {children}
      </ContentListItem>
    )
    
    expect(screen.queryByTestId('child-content')).not.toBeInTheDocument()
  })

  test('handles component without children', () => {
    render(<ContentListItem {...defaultProps} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  test('has correct accessibility attributes', () => {
    render(<ContentListItem {...defaultProps} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('tabIndex', '0')
    expect(button).toHaveAttribute('role', 'button')
    expect(button).toHaveAttribute('aria-expanded')
    expect(button).toHaveAttribute('aria-label')
  })

  test('has correct CSS classes', () => {
    const { container } = render(<ContentListItem {...defaultProps} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('content-list-item')
    
    expect(container.querySelector('.content-list-item-arrow')).toBeInTheDocument()
    expect(container.querySelector('.content-list-item-content')).toBeInTheDocument()
    expect(container.querySelector('.content-list-item-title')).toBeInTheDocument()
    expect(container.querySelector('.content-list-item-description')).toBeInTheDocument()
  })
})