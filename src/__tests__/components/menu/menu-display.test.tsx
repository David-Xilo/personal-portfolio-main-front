import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {MenuTable, MenuTableCell} from '../../../components/menu/menu-display'

describe('MenuTable', () => {
  test('renders children content', () => {
    render(
      <MenuTable>
        <div>Test content</div>
      </MenuTable>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('has correct CSS class', () => {
    const { container } = render(
      <MenuTable>
        <div>Content</div>
      </MenuTable>
    )
    
    expect(container.firstChild).toHaveClass('menu-table')
  })

  test('renders multiple children', () => {
    render(
      <MenuTable>
        <div>First child</div>
        <div>Second child</div>
        <span>Third child</span>
      </MenuTable>
    )
    
    expect(screen.getByText('First child')).toBeInTheDocument()
    expect(screen.getByText('Second child')).toBeInTheDocument()
    expect(screen.getByText('Third child')).toBeInTheDocument()
  })
})

describe('MenuTableCell', () => {
  test('renders children content', () => {
    render(
      <MenuTableCell>
        <p>Cell content</p>
      </MenuTableCell>
    )
    
    expect(screen.getByText('Cell content')).toBeInTheDocument()
  })

  test('has correct CSS class', () => {
    const { container } = render(
      <MenuTableCell>
        <div>Cell</div>
      </MenuTableCell>
    )
    
    expect(container.firstChild).toHaveClass('menu-table-cell')
  })

  test('renders complex children', () => {
    render(
      <MenuTableCell>
        <div>
          <h2>Header</h2>
          <p>Description</p>
          <button>Action</button>
        </div>
      </MenuTableCell>
    )
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Header')
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Action')
  })

  test('can be used within MenuTable', () => {
    render(
      <MenuTable>
        <MenuTableCell>
          <span>First cell</span>
        </MenuTableCell>
        <MenuTableCell>
          <span>Second cell</span>
        </MenuTableCell>
      </MenuTable>
    )
    
    expect(screen.getByText('First cell')).toBeInTheDocument()
    expect(screen.getByText('Second cell')).toBeInTheDocument()
  })
})