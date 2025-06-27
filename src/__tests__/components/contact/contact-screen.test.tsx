import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  ContactScreen,
  ContactItem,
} from '../../../components/contact/contact-screen'
import * as contactRest from '../../../api/hooks/contact-rest'

jest.mock('../../../api/hooks/contact-rest')

const mockContact = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  github: 'https://github.com/johndoe',
  linkedin: 'https://linkedin.com/in/johndoe',
  credly: 'https://credly.com/johndoe',
}

describe('ContactItem', () => {
  test('renders contact information correctly', () => {
    render(<ContactItem contact={mockContact} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Casual Human')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByText('View Profile')).toBeInTheDocument()
    expect(screen.getByText('Connect')).toBeInTheDocument()
    expect(screen.getByText('Certifications')).toBeInTheDocument()
  })

  test('renders warning when contact is null', () => {
    render(<ContactItem contact={null} />)

    expect(
      screen.getByText('Contact information is incomplete'),
    ).toBeInTheDocument()
  })

  test('renders warning when contact is missing required fields', () => {
    const incompleteContact = {
      name: '',
      email: '',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/test',
      credly: 'https://credly.com/test',
    }
    render(<ContactItem contact={incompleteContact} />)

    expect(
      screen.getByText('Contact information is incomplete'),
    ).toBeInTheDocument()
  })

  test('renders compact variant correctly', () => {
    const {container} = render(
      <ContactItem contact={mockContact} variant="compact" />,
    )

    expect(
      container.querySelector('.contact-card--compact'),
    ).toBeInTheDocument()
    expect(
      container.querySelector('.message-warning--compact'),
    ).not.toBeInTheDocument()
  })

  test('renders email link with correct href', () => {
    render(<ContactItem contact={mockContact} />)

    const emailLink = screen.getByRole('link', {name: mockContact.email})
    expect(emailLink).toHaveAttribute('href', `mailto:${mockContact.email}`)
  })

  test('renders GitHub link with correct attributes', () => {
    render(<ContactItem contact={mockContact} />)

    const githubLink = screen.getByRole('link', {name: 'View Profile'})
    expect(githubLink).toHaveAttribute('href', mockContact.github)
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('renders LinkedIn link with correct attributes', () => {
    render(<ContactItem contact={mockContact} />)

    const linkedinLink = screen.getByRole('link', {name: 'Connect'})
    expect(linkedinLink).toHaveAttribute('href', mockContact.linkedin)
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('renders only available contact methods', () => {
    const partialContact = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      linkedin: '',
      github: '',
      credly: '',
    }

    render(<ContactItem contact={partialContact} />)

    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.queryByText('View Profile')).not.toBeInTheDocument()
    expect(screen.queryByText('Connect')).not.toBeInTheDocument()
    expect(screen.queryByText('Certifications')).not.toBeInTheDocument()
  })
})

describe('ContactScreen', () => {
  const mockUseContactGetApi =
    contactRest.useContactGetApi as jest.MockedFunction<
      typeof contactRest.useContactGetApi
    >

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders contact item when data loads successfully', async () => {
    mockUseContactGetApi.mockReturnValue({
      status: 'success',
      message: mockContact,
      error: null,
    })

    render(<ContactScreen />)

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })

  test('renders error message when API call fails', async () => {
    mockUseContactGetApi.mockReturnValue({
      status: 'error',
      message: null,
      error: 'Network error',
    })

    render(<ContactScreen />)

    await waitFor(() => {
      expect(
        screen.getByText('Unable to load contact information: Network error'),
      ).toBeInTheDocument()
    })
  })

  test('renders error message when status is loading', async () => {
    mockUseContactGetApi.mockReturnValue({
      status: 'loading',
      message: null,
      error: 'Loading...',
    })

    render(<ContactScreen />)

    await waitFor(() => {
      expect(
        screen.getByText('Unable to load contact information: Loading...'),
      ).toBeInTheDocument()
    })
  })

  test('passes variant prop to ContactItem', async () => {
    mockUseContactGetApi.mockReturnValue({
      status: 'success',
      message: mockContact,
      error: null,
    })

    const {container} = render(<ContactScreen variant="compact" />)

    await waitFor(() => {
      expect(
        container.querySelector('.contact-card--compact'),
      ).toBeInTheDocument()
    })
  })

  test('applies custom className', () => {
    mockUseContactGetApi.mockReturnValue({
      status: 'error',
      message: null,
      error: 'Test error',
    })

    const {container} = render(<ContactScreen className="custom-class" />)

    expect(
      container.querySelector('.contact-screen-container.custom-class'),
    ).toBeInTheDocument()
  })

  test('passes maxWidth prop correctly', async () => {
    mockUseContactGetApi.mockReturnValue({
      status: 'success',
      message: mockContact,
      error: null,
    })

    const {container} = render(<ContactScreen maxWidth="500px" />)

    await waitFor(() => {
      const contactCard = container.querySelector('.contact-card')
      expect(contactCard).toHaveStyle('max-width: 500px')
    })
  })
})
