import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ArrowDownIcon} from '../../../components/icons/arrow-down-icon'

describe('ArrowDownIcon', () => {
  test('renders SVG element', () => {
    const { container } = render(<ArrowDownIcon />)
    
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('has correct SVG attributes', () => {
    const { container } = render(<ArrowDownIcon />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
  })

  test('has correct CSS class', () => {
    const { container } = render(<ArrowDownIcon />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('size-6')
  })

  test('contains path element', () => {
    const { container } = render(<ArrowDownIcon />)
    
    const path = container.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path).toHaveAttribute('d', 'm19.5 8.25-7.5 7.5-7.5-7.5')
  })

  test('renders without crashing', () => {
    expect(() => render(<ArrowDownIcon />)).not.toThrow()
  })
})