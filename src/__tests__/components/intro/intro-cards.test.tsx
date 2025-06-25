import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {IntroductionCard} from '../../../components/intro/intro-cards'

const MockIcon = () => <div data-testid="mock-icon">Icon</div>

describe('IntroductionCard', () => {
  const defaultProps = {
    color: 'purple' as const,
    title: 'Test Title',
    icon: <MockIcon />,
    children: <p>Test description</p>
  }

  test('renders with all props', () => {
    render(<IntroductionCard {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  test('applies correct color class', () => {
    const { container } = render(<IntroductionCard {...defaultProps} color="pink" />)
    
    expect(container.firstChild).toHaveClass('intro-card--pink')
  })

  test('renders without icon when not provided', () => {
    render(<IntroductionCard {...defaultProps} icon={null} />)
    
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  test('renders children content correctly', () => {
    const customChildren = (
      <div>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </div>
    )
    
    render(<IntroductionCard {...defaultProps}>{customChildren}</IntroductionCard>)
    
    expect(screen.getByText('First paragraph')).toBeInTheDocument()
    expect(screen.getByText('Second paragraph')).toBeInTheDocument()
  })

  test('has correct CSS classes structure', () => {
    const { container } = render(<IntroductionCard {...defaultProps} />)
    
    expect(container.firstChild).toHaveClass('intro-card', 'intro-card--purple')
    expect(container.querySelector('.intro-card__icon-container')).toBeInTheDocument()
    expect(container.querySelector('.intro-card__icon')).toBeInTheDocument()
    expect(container.querySelector('.intro-card__title')).toBeInTheDocument()
    expect(container.querySelector('.intro-card__description')).toBeInTheDocument()
  })

  test('renders title in h3 element', () => {
    render(<IntroductionCard {...defaultProps} title="Special Title" />)
    
    const titleElement = screen.getByRole('heading', { level: 3 })
    expect(titleElement).toHaveTextContent('Special Title')
  })

  test('supports all color options', () => {
    const colors = ['purple', 'pink', 'cyan', 'violet', 'emerald', 'teal', 'blue', 'green'] as const
    
    colors.forEach(color => {
      const { container, unmount } = render(<IntroductionCard {...defaultProps} color={color} />)
      expect(container.firstChild).toHaveClass(`intro-card--${color}`)
      unmount()
    })
  })
})