import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {HeartIcon} from '../../../components/icons/heart-icon'

describe('HeartIcon', () => {
  test('renders SVG element', () => {
    const {container} = render(<HeartIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
  })

  test('has correct SVG attributes', () => {
    const {container} = render(<HeartIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('fill', 'none')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
  })

  test('contains path element', () => {
    const {container} = render(<HeartIcon />)
    const path = container.querySelector('path')

    expect(path).toBeInTheDocument()
  })
})
