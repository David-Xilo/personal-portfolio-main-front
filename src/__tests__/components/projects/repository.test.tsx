import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import {RepositoryCarousel, RepositoryInfo} from '../../../components/projects/repository'

jest.mock('../../../components/icons/arrow-left-icon', () => ({
  ArrowLeftIcon: () => <div data-testid="arrow-left" />
}))

jest.mock('../../../components/icons/arrow-right-icon', () => ({
  ArrowRightIcon: () => <div data-testid="arrow-right" />
}))

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  value: 1000,
})

const mockRepositories: RepositoryInfo[] = [
  {
    title: 'First Repo',
    description: 'First repository description',
    link_to_git: 'https://github.com/test/repo1'
  },
  {
    title: 'Second Repo',
    description: 'Second repository description',
    link_to_git: 'https://github.com/test/repo2'
  },
  {
    title: 'Third Repo',
    description: 'Third repository description', 
    link_to_git: 'https://github.com/test/repo3'
  },
  {
    title: 'Fourth Repo',
    description: 'Fourth repository description',
    link_to_git: 'https://github.com/test/repo4'
  }
]

describe('RepositoryCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders empty state when no repositories', () => {
    render(<RepositoryCarousel repositories={[]} />)
    
    expect(screen.getByText('No repositories available for this project.')).toBeInTheDocument()
  })

  test('renders repository cards', () => {
    render(<RepositoryCarousel repositories={mockRepositories} />)
    
    expect(screen.getByText('First Repo')).toBeInTheDocument()
    expect(screen.getByText('Second Repo')).toBeInTheDocument()
    expect(screen.getByText('Third Repo')).toBeInTheDocument()
    expect(screen.getByText('Fourth Repo')).toBeInTheDocument()
  })

  test('renders repository descriptions and links', () => {
    render(<RepositoryCarousel repositories={mockRepositories.slice(0, 1)} />)
    
    expect(screen.getByText('First repository description')).toBeInTheDocument()
    
    const gitLink = screen.getByRole('link', { name: /View Source/ })
    expect(gitLink).toHaveAttribute('href', 'https://github.com/test/repo1')
    expect(gitLink).toHaveAttribute('target', '_blank')
    expect(gitLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('shows navigation arrows when needed', () => {
    render(<RepositoryCarousel repositories={mockRepositories} />)
    
    const rightArrow = screen.queryByLabelText('Next repositories')
    expect(rightArrow).toBeInTheDocument()
  })

  test('does not show left arrow initially', () => {
    render(<RepositoryCarousel repositories={mockRepositories} />)
    
    const leftArrow = screen.queryByLabelText('Previous repositories')
    expect(leftArrow).not.toBeInTheDocument()
  })

  test('navigates right when right arrow clicked', () => {
    render(<RepositoryCarousel repositories={mockRepositories} />)
    
    const rightArrow = screen.getByLabelText('Next repositories')
    fireEvent.click(rightArrow)
    
    const leftArrow = screen.getByLabelText('Previous repositories')
    expect(leftArrow).toBeInTheDocument()
  })

  test('navigates left when left arrow clicked', () => {
    render(<RepositoryCarousel repositories={mockRepositories} />)
    
    const rightArrow = screen.getByLabelText('Next repositories')
    fireEvent.click(rightArrow)
    
    const leftArrow = screen.getByLabelText('Previous repositories')
    fireEvent.click(leftArrow)
    
    expect(screen.queryByLabelText('Previous repositories')).not.toBeInTheDocument()
  })

  test('handles keyboard navigation', () => {
    render(<RepositoryCarousel repositories={mockRepositories} />)
    
    const carousel = screen.getByText('First Repo').closest('.repository-carousel')
    fireEvent.keyDown(carousel!, { key: 'ArrowRight' })
    
    expect(screen.getByLabelText('Previous repositories')).toBeInTheDocument()
  })

  test('ignores keyboard navigation when no arrows available', () => {
    render(<RepositoryCarousel repositories={mockRepositories} />)
    
    const carousel = screen.getByText('First Repo').closest('.repository-carousel')
    fireEvent.keyDown(carousel!, { key: 'ArrowLeft' })
    
    expect(screen.queryByLabelText('Previous repositories')).not.toBeInTheDocument()
  })

  test('renders indicators for multiple pages', () => {
    render(<RepositoryCarousel repositories={mockRepositories} />)
    
    const indicators = screen.getAllByRole('button', { name: /Go to page/ })
    expect(indicators.length).toBeGreaterThan(0)
  })

  test('navigates to specific page when indicator clicked', () => {
    render(<RepositoryCarousel repositories={mockRepositories} />)
    
    const indicators = screen.getAllByRole('button', { name: /Go to page/ })
    if (indicators.length > 1) {
      fireEvent.click(indicators[1])
      expect(screen.getByLabelText('Previous repositories')).toBeInTheDocument()
    }
  })

  test('stops event propagation on carousel click', () => {
    const parentClickHandler = jest.fn()
    
    render(
      <div onClick={parentClickHandler}>
        <RepositoryCarousel repositories={mockRepositories.slice(0, 1)} />
      </div>
    )
    
    const carousel = screen.getByText('First Repo').closest('.repository-carousel')
    fireEvent.click(carousel!)
    
    expect(parentClickHandler).not.toHaveBeenCalled()
  })

  test('stops event propagation on repository card click', () => {
    const parentClickHandler = jest.fn()
    
    render(
      <div onClick={parentClickHandler}>
        <RepositoryCarousel repositories={mockRepositories.slice(0, 1)} />
      </div>
    )
    
    const repositoryCard = screen.getByText('First Repo').closest('.repository-card')
    fireEvent.click(repositoryCard!)
    
    expect(parentClickHandler).not.toHaveBeenCalled()
  })

  test('stops event propagation on git link click', () => {
    const parentClickHandler = jest.fn()
    
    render(
      <div onClick={parentClickHandler}>
        <RepositoryCarousel repositories={mockRepositories.slice(0, 1)} />
      </div>
    )
    
    const gitLink = screen.getByRole('link', { name: /View Source/ })
    fireEvent.click(gitLink)
    
    expect(parentClickHandler).not.toHaveBeenCalled()
  })

  test('has correct CSS classes and structure', () => {
    const { container } = render(<RepositoryCarousel repositories={mockRepositories.slice(0, 1)} />)
    
    expect(container.querySelector('.repository-carousel')).toBeInTheDocument()
    expect(container.querySelector('.repository-carousel-container')).toBeInTheDocument()
    expect(container.querySelector('.repository-carousel-track')).toBeInTheDocument()
    expect(container.querySelector('.repository-carousel-items')).toBeInTheDocument()
    expect(container.querySelector('.repository-card')).toBeInTheDocument()
    expect(container.querySelector('.repository-card-content')).toBeInTheDocument()
    expect(container.querySelector('.repository-card-title')).toBeInTheDocument()
    expect(container.querySelector('.repository-card-description')).toBeInTheDocument()
    expect(container.querySelector('.repository-card-actions')).toBeInTheDocument()
  })

  test('applies transform styles for navigation', () => {
    const { container } = render(<RepositoryCarousel repositories={mockRepositories} />)
    
    const items = container.querySelector('.repository-carousel-items')
    expect(items).toHaveStyle({ transform: 'translateX(-0%)' })
  })

  test('is focusable with tabIndex', () => {
    render(<RepositoryCarousel repositories={mockRepositories} />)
    
    const carousel = screen.getByText('First Repo').closest('.repository-carousel')
    expect(carousel).toHaveAttribute('tabIndex', '0')
  })
})