import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ArrowRightIcon} from '../../../components/icons/arrow-right-icon'

describe('ArrowRightIcon', () => {
  test('renders SVG element', () => {
    const { container } = render(<ArrowRightIcon />)
    const svg = container.querySelector('svg')
    
    expect(svg).toBeInTheDocument()
  })

  test('has correct SVG attributes', () => {
    const { container } = render(<ArrowRightIcon />)
    const svg = container.querySelector('svg')
    
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
  })

  test('has correct CSS class', () => {
    const { container } = render(<ArrowRightIcon />)
    const svg = container.querySelector('svg')
    
    expect(svg).toHaveClass('size-6')
  })

  test('contains path element with correct attributes', () => {
    const { container } = render(<ArrowRightIcon />)
    const path = container.querySelector('path')
    
    expect(path).toBeInTheDocument()
    expect(path).toHaveAttribute('d', 'm8.25 4.5 7.5 7.5-7.5 7.5')
  })
})