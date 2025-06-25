import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ChevronLeftIcon} from '../../../components/icons/chevron-left-icon'

describe('ChevronLeftIcon', () => {
  test('renders SVG element', () => {
    const { container } = render(<ChevronLeftIcon />)
    
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('has correct SVG attributes', () => {
    const { container } = render(<ChevronLeftIcon />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
    expect(svg).toHaveAttribute('width', '20')
    expect(svg).toHaveAttribute('height', '20')
  })

  test('contains polyline element', () => {
    const { container } = render(<ChevronLeftIcon />)
    
    const polyline = container.querySelector('polyline')
    expect(polyline).toBeInTheDocument()
    expect(polyline).toHaveAttribute('points', '15,18 9,12 15,6')
  })

  test('renders without crashing', () => {
    expect(() => render(<ChevronLeftIcon />)).not.toThrow()
  })
})