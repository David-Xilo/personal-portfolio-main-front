import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {UserGroupIcon} from '../../../components/icons/user-group-icon'

describe('UserGroupIcon', () => {
  test('renders SVG element', () => {
    const { container } = render(<UserGroupIcon />)
    const svg = container.querySelector('svg')
    
    expect(svg).toBeInTheDocument()
  })

  test('has correct SVG attributes', () => {
    const { container } = render(<UserGroupIcon />)
    const svg = container.querySelector('svg')
    
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
  })

  test('has correct CSS class', () => {
    const { container } = render(<UserGroupIcon />)
    const svg = container.querySelector('svg')
    
    expect(svg).toHaveClass('size-6')
  })

  test('contains path element', () => {
    const { container } = render(<UserGroupIcon />)
    const path = container.querySelector('path')
    
    expect(path).toBeInTheDocument()
  })
})