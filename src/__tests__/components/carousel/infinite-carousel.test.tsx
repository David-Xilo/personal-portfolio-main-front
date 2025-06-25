import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import {InfiniteCarousel} from '../../../components/carousel/infinite-carousel'

const mockItems = ['Item 1', 'Item 2', 'Item 3']
const renderTestItem = (item: string, index: number) => (
  <div data-testid={`carousel-item-${index}`}>{item}</div>
)

jest.mock('../../../components/icons/chevron-left-icon', () => ({
  ChevronLeftIcon: () => <div data-testid="chevron-left" />,
}))

jest.mock('../../../components/icons/chevron-right-icon', () => ({
  ChevronRightIcon: () => <div data-testid="chevron-right" />,
}))

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  value: 300,
})

describe('InfiniteCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders empty state when no items provided', () => {
    render(<InfiniteCarousel items={[]} renderItem={renderTestItem} />)
    expect(screen.getByText('No items to display')).toBeInTheDocument()
  })

  test('renders single item without navigation when only one item', () => {
    render(
      <InfiniteCarousel items={['Single Item']} renderItem={renderTestItem} />,
    )
    expect(screen.getByText('Single Item')).toBeInTheDocument()
    expect(screen.queryByLabelText('Previous item')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next item')).not.toBeInTheDocument()
  })

  test('renders multiple items with navigation arrows', () => {
    render(<InfiniteCarousel items={mockItems} renderItem={renderTestItem} />)

    expect(screen.getByLabelText('Previous item')).toBeInTheDocument()
    expect(screen.getByLabelText('Next item')).toBeInTheDocument()
    expect(screen.getByTestId('chevron-left')).toBeInTheDocument()
    expect(screen.getByTestId('chevron-right')).toBeInTheDocument()
  })

  test('hides arrows when showArrows is false', () => {
    render(
      <InfiniteCarousel
        items={mockItems}
        renderItem={renderTestItem}
        showArrows={false}
      />,
    )

    expect(screen.queryByLabelText('Previous item')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next item')).not.toBeInTheDocument()
  })

  test('renders indicators for multiple items', () => {
    render(<InfiniteCarousel items={mockItems} renderItem={renderTestItem} />)

    const indicators = screen.getAllByRole('button', {name: /Go to slide/})
    expect(indicators).toHaveLength(3)
  })

  test('hides indicators when showIndicators is false', () => {
    render(
      <InfiniteCarousel
        items={mockItems}
        renderItem={renderTestItem}
        showIndicators={false}
      />,
    )

    expect(
      screen.queryByRole('button', {name: /Go to slide/}),
    ).not.toBeInTheDocument()
  })

  test('navigates to next item when next button is clicked', () => {
    render(<InfiniteCarousel items={mockItems} renderItem={renderTestItem} />)

    const nextButton = screen.getByLabelText('Next item')
    fireEvent.click(nextButton)

    const indicators = screen.getAllByRole('button', {name: /Go to slide/})
    expect(indicators[1]).toHaveClass('active')
  })

  test('navigates to previous item when previous button is clicked', () => {
    render(<InfiniteCarousel items={mockItems} renderItem={renderTestItem} />)

    const prevButton = screen.getByLabelText('Previous item')
    fireEvent.click(prevButton)

    const indicators = screen.getAllByRole('button', {name: /Go to slide/})
    expect(indicators[2]).toHaveClass('active')
  })

  test('navigates to specific slide when indicator is clicked', () => {
    render(<InfiniteCarousel items={mockItems} renderItem={renderTestItem} />)

    const indicators = screen.getAllByRole('button', {name: /Go to slide/})
    fireEvent.click(indicators[1])

    expect(indicators[1]).toHaveClass('active')
  })

  test('handles keyboard navigation', () => {
    render(<InfiniteCarousel items={mockItems} renderItem={renderTestItem} />)

    const carousel = screen.getByText('Item 1').closest('.infinite-carousel')
    fireEvent.keyDown(carousel!, {key: 'ArrowRight'})

    const indicators = screen.getAllByRole('button', {name: /Go to slide/})
    expect(indicators[1]).toHaveClass('active')
  })

  test('applies custom className', () => {
    const {container} = render(
      <InfiniteCarousel
        items={mockItems}
        renderItem={renderTestItem}
        className="custom-class"
      />,
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  test('applies size prop correctly', () => {
    const {container} = render(
      <InfiniteCarousel
        items={mockItems}
        renderItem={renderTestItem}
        size="large"
      />,
    )

    expect(container.firstChild).toHaveClass('infinite-carousel-large')
  })

  test('auto advance functionality', async () => {
    jest.useFakeTimers()

    render(
      <InfiniteCarousel
        items={mockItems}
        renderItem={renderTestItem}
        autoAdvance={true}
        autoAdvanceInterval={1000}
      />,
    )

    const indicators = screen.getAllByRole('button', {name: /Go to slide/})
    expect(indicators[0]).toHaveClass('active')

    jest.advanceTimersByTime(1000)

    await waitFor(() => {
      expect(indicators[1]).toHaveClass('active')
    })

    jest.useRealTimers()
  })
})
