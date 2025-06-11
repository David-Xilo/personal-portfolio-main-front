import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ContactScreen} from '../../screens/about/contact-screen'
// Mocking the custom hook
jest.mock('../../hooks/contact-rest', () => ({
  useContactGetApi: jest.fn(),
}))

// Import the mock after it's defined
import {useContactGetApi} from '../../hooks/contact-rest'

describe('ContactScreen', () => {
  test('renders contact details when API call is successful', () => {
    // Mock the hook to return a successful response
    ;(useContactGetApi as jest.Mock).mockReturnValue({
      status: 'success',
      message: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
      },
      error: null,
    })

    // Render the component
    render(<ContactScreen />)

    // Assertions
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByText('Github')).toHaveAttribute(
      'href',
      'https://github.com/johndoe',
    )
    expect(screen.getByText('Linkedin')).toHaveAttribute(
      'href',
      'https://linkedin.com/in/johndoe',
    )
  })

  test('renders error message when API call fails', () => {
    // Mock the hook to return an error response
    ;(useContactGetApi as jest.Mock).mockReturnValue({
      status: 'error',
      message: null,
      error: 'Failed to fetch contact details',
    })

    // Render the component
    render(<ContactScreen />)

    // Assertion
    expect(
      screen.getByText('Found error Failed to fetch contact details'),
    ).toBeInTheDocument()
  })
})
