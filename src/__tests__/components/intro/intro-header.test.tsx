import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {IntroHeader} from '../../../components/intro/intro-header'

const MockLeftIcon = () => <div data-testid="left-icon">Left</div>
const MockRightIcon = () => <div data-testid="right-icon">Right</div>

describe('IntroHeader', () => {
  const defaultColorScheme = {
    primary: 'blue',
    secondary: 'purple',
  }

  const defaultProps = {
    title: 'Test Header',
    colorScheme: defaultColorScheme,
  }

  test('renders with basic props', () => {
    render(<IntroHeader {...defaultProps} />)

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
      'Test Header',
    )
  })

  test('renders with left icon', () => {
    render(<IntroHeader {...defaultProps} leftIcon={<MockLeftIcon />} />)

    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  test('renders with right icon', () => {
    render(<IntroHeader {...defaultProps} rightIcon={<MockRightIcon />} />)

    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  test('renders with both icons', () => {
    render(
      <IntroHeader
        {...defaultProps}
        leftIcon={<MockLeftIcon />}
        rightIcon={<MockRightIcon />}
      />,
    )

    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  test('applies correct gradient classes with two colors', () => {
    const {container} = render(<IntroHeader {...defaultProps} />)

    const titleElement = container.querySelector('.intro-header__title')
    const underlineElement = container.querySelector('.intro-header__underline')

    expect(titleElement).toHaveClass('intro-header__title--blue-purple')
    expect(underlineElement).toHaveClass('intro-header__underline--blue-purple')
  })

  test('applies correct gradient classes with three colors', () => {
    const colorScheme = {
      primary: 'red',
      secondary: 'green',
      tertiary: 'blue',
    }

    const {container} = render(
      <IntroHeader {...defaultProps} colorScheme={colorScheme} />,
    )

    const titleElement = container.querySelector('.intro-header__title')
    const underlineElement = container.querySelector('.intro-header__underline')

    expect(titleElement).toHaveClass('intro-header__title--red-green-blue')
    expect(underlineElement).toHaveClass(
      'intro-header__underline--red-green-blue',
    )
  })

  test('applies correct icon gradient classes', () => {
    const colorScheme = {
      primary: 'red',
      secondary: 'green',
      tertiary: 'blue',
    }

    const {container} = render(
      <IntroHeader
        {...defaultProps}
        colorScheme={colorScheme}
        leftIcon={<MockLeftIcon />}
        rightIcon={<MockRightIcon />}
      />,
    )

    const leftIconElement = container.querySelector('.intro-header__icon')
    const rightIconElement = container.querySelectorAll(
      '.intro-header__icon',
    )[1]

    expect(leftIconElement).toHaveClass('intro-header__icon--red-green')
    expect(rightIconElement).toHaveClass('intro-header__icon--blue-red')
  })

  test('has correct CSS structure', () => {
    const {container} = render(<IntroHeader {...defaultProps} />)

    expect(container.querySelector('.intro-header')).toBeInTheDocument()
    expect(
      container.querySelector('.intro-header__content'),
    ).toBeInTheDocument()
    expect(container.querySelector('.intro-header__title')).toBeInTheDocument()
    expect(
      container.querySelector('.intro-header__underline'),
    ).toBeInTheDocument()
  })

  test('does not render icons when not provided', () => {
    render(<IntroHeader {...defaultProps} />)

    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument()
  })

  test('renders icon content within proper containers', () => {
    const {container} = render(
      <IntroHeader {...defaultProps} leftIcon={<MockLeftIcon />} />,
    )

    const iconContainer = container.querySelector('.intro-header__icon')
    const iconContent = container.querySelector('.intro-header__icon-content')

    expect(iconContainer).toBeInTheDocument()
    expect(iconContent).toBeInTheDocument()
    expect(iconContent?.parentElement).toBe(iconContainer)
  })
})
