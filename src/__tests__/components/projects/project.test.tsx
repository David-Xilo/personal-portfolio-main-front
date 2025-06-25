import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  ProjectComponent,
  GenericProjectsScreen,
} from '../../../components/projects/project'
import {Project} from '../../../hooks/projects-rest'

jest.mock('../../../components/projects/repository', () => ({
  RepositoryCarousel: ({repositories}: {repositories: any[]}) => (
    <div data-testid="repository-carousel">
      {repositories.length} repositories
    </div>
  ),
}))

jest.mock('../../../hooks/projects-rest', () => ({
  useProjectsGetApi: jest.fn(),
  Project: {} as any,
}))

import {useProjectsGetApi} from '../../../hooks/projects-rest'

const mockProject: Project = {
  title: 'Test Project',
  description: 'Test project description',
  repositories: [
    {
      title: 'Repo 1',
      description: 'First repository',
      link_to_git: 'https://github.com/test/repo1',
    },
    {
      title: 'Repo 2',
      description: 'Second repository',
      link_to_git: 'https://github.com/test/repo2',
    },
  ],
  genre: 'Web Development',
  link_to_store: 'https://store.example.com',
}

describe('ProjectComponent', () => {
  test('renders project with repository count', () => {
    render(<ProjectComponent project={mockProject} />)

    expect(screen.getAllByText('2 repositories')[0]).toBeInTheDocument()
  })

  test('renders singular form for single repository', () => {
    const singleRepoProject = {
      ...mockProject,
      repositories: [mockProject.repositories[0]],
    }
    render(<ProjectComponent project={singleRepoProject} />)

    expect(screen.getByText('1 repository')).toBeInTheDocument()
  })

  test('renders genre when provided', () => {
    render(<ProjectComponent project={mockProject} />)

    expect(screen.getByText('Genre: Web Development')).toBeInTheDocument()
  })

  test('does not render genre when not provided', () => {
    const projectWithoutGenre = {...mockProject, genre: undefined}
    render(<ProjectComponent project={projectWithoutGenre} />)

    expect(screen.queryByText(/Genre:/)).not.toBeInTheDocument()
  })

  test('renders store link when provided', () => {
    render(<ProjectComponent project={mockProject} />)

    const storeLink = screen.getByRole('link', {name: /View in Store/})
    expect(storeLink).toBeInTheDocument()
    expect(storeLink).toHaveAttribute('href', 'https://store.example.com')
    expect(storeLink).toHaveAttribute('target', '_blank')
    expect(storeLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('does not render store link when not provided', () => {
    const projectWithoutStore = {...mockProject, link_to_store: undefined}
    render(<ProjectComponent project={projectWithoutStore} />)

    expect(screen.queryByText('View in Store')).not.toBeInTheDocument()
  })

  test('renders RepositoryCarousel with repositories', () => {
    render(<ProjectComponent project={mockProject} />)

    expect(screen.getByTestId('repository-carousel')).toBeInTheDocument()
    expect(screen.getAllByText('2 repositories')[0]).toBeInTheDocument()
  })

  test('stops event propagation on click', () => {
    const parentClickHandler = jest.fn()

    render(
      <div onClick={parentClickHandler}>
        <ProjectComponent project={mockProject} />
      </div>,
    )

    const projectComponent = screen
      .getAllByText('2 repositories')[0]
      .closest('.project-component')
    fireEvent.click(projectComponent!)

    expect(parentClickHandler).not.toHaveBeenCalled()
  })

  test('stops event propagation on store link click', () => {
    const parentClickHandler = jest.fn()

    render(
      <div onClick={parentClickHandler}>
        <ProjectComponent project={mockProject} />
      </div>,
    )

    const storeLink = screen.getByRole('link', {name: /View in Store/})
    fireEvent.click(storeLink)

    expect(parentClickHandler).not.toHaveBeenCalled()
  })

  test('has correct CSS classes', () => {
    const {container} = render(<ProjectComponent project={mockProject} />)

    expect(container.querySelector('.project-component')).toBeInTheDocument()
    expect(container.querySelector('.project-header')).toBeInTheDocument()
    expect(container.querySelector('.project-count')).toBeInTheDocument()
    expect(container.querySelector('.project-genre')).toBeInTheDocument()
    expect(container.querySelector('.project-store-link')).toBeInTheDocument()
  })
})

describe('GenericProjectsScreen', () => {
  const mockUseProjectsGetApi = useProjectsGetApi as jest.MockedFunction<
    typeof useProjectsGetApi
  >

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders error state when API fails', () => {
    mockUseProjectsGetApi.mockReturnValue({
      status: 'error',
      message: [],
      error: 'Failed to load projects',
    })

    render(
      <GenericProjectsScreen
        projectsPath="/api/projects"
        projectName="Test Projects"
      />,
    )

    expect(screen.getByText('Error Loading Test Projects')).toBeInTheDocument()
    expect(screen.getByText('Failed to load projects')).toBeInTheDocument()
  })

  test('renders default error message when no specific error', () => {
    mockUseProjectsGetApi.mockReturnValue({
      status: 'error',
      message: [],
      error: null,
    })

    render(
      <GenericProjectsScreen
        projectsPath="/api/projects"
        projectName="Test Projects"
      />,
    )

    expect(
      screen.getByText(
        'An unexpected error occurred while loading Test Projects.',
      ),
    ).toBeInTheDocument()
  })

  test('renders empty state when no projects available', () => {
    mockUseProjectsGetApi.mockReturnValue({
      status: 'success',
      message: [],
      error: null,
    })

    render(
      <GenericProjectsScreen
        projectsPath="/api/projects"
        projectName="Test Projects"
      />,
    )

    expect(screen.getByText('No Test Projects Available')).toBeInTheDocument()
    expect(
      screen.getByText(
        'There are currently no test projects to display. Check back later for updates!',
      ),
    ).toBeInTheDocument()
  })

  test('renders projects when API succeeds', () => {
    mockUseProjectsGetApi.mockReturnValue({
      status: 'success',
      message: [mockProject],
      error: null,
    })

    render(<GenericProjectsScreen projectsPath="/api/projects" />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Test project description')).toBeInTheDocument()
  })

  test('uses default project name when not provided', () => {
    mockUseProjectsGetApi.mockReturnValue({
      status: 'error',
      message: [],
      error: 'Test error',
    })

    render(<GenericProjectsScreen projectsPath="/api/projects" />)

    expect(screen.getByText('Error Loading projects')).toBeInTheDocument()
  })

  test('passes projectsPath to API hook', () => {
    mockUseProjectsGetApi.mockReturnValue({
      status: 'success',
      message: [],
      error: null,
    })

    render(<GenericProjectsScreen projectsPath="/custom/path" />)

    expect(mockUseProjectsGetApi).toHaveBeenCalledWith('/custom/path')
  })

  test('renders multiple projects', () => {
    const projects = [
      mockProject,
      {
        ...mockProject,
        title: 'Second Project',
        description: 'Second project description',
      },
    ]

    mockUseProjectsGetApi.mockReturnValue({
      status: 'success',
      message: projects,
      error: null,
    })

    render(<GenericProjectsScreen projectsPath="/api/projects" />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Second Project')).toBeInTheDocument()
  })
})
