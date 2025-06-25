import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {RocketIcon} from '../../../components/icons/rocket-icon'

describe('RocketIcon', () => {
  test('renders SVG element', () => {
    const {container} = render(<RocketIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
  })

  test('has correct SVG attributes', () => {
    const {container} = render(<RocketIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
  })

  test('has correct CSS class', () => {
    const {container} = render(<RocketIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveClass('size-6')
  })

  test('contains path element', () => {
    const {container} = render(<RocketIcon />)
    const path = container.querySelector('path')

    expect(path).toBeInTheDocument()
  })
})
