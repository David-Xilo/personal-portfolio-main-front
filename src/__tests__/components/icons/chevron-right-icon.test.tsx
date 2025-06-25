import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ChevronRightIcon} from '../../../components/icons/chevron-right-icon'

describe('ChevronRightIcon', () => {
  test('renders SVG element', () => {
    const { container } = render(<ChevronRightIcon />)
    
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('has correct SVG attributes', () => {
    const { container } = render(<ChevronRightIcon />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
    expect(svg).toHaveAttribute('width', '20')
    expect(svg).toHaveAttribute('height', '20')
  })

  test('contains polyline element', () => {
    const { container } = render(<ChevronRightIcon />)
    
    const polyline = container.querySelector('polyline')
    expect(polyline).toBeInTheDocument()
    expect(polyline).toHaveAttribute('points', '9,18 15,12 9,6')
  })

  test('renders without crashing', () => {
    expect(() => render(<ChevronRightIcon />)).not.toThrow()
  })
})