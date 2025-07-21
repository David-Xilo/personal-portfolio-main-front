import React from 'react'
import {RepositoryCarousel} from './repository'
import {ContentListItem} from 'components/menu/content-list-item'
import {Project, useProjectsGetApi} from '../../api/hooks/projects-rest'
import './project.css'

const ProjectComponent: React.FC<{project: Project}> = ({project}) => {
  return (
    <div className="project-component" onClick={e => e.stopPropagation()}>
      <div className="project-header">
        <p className="project-count">
          {project.repositories.length}{' '}
          {project.repositories.length === 1 ? 'repository' : 'repositories'}
        </p>
      </div>

      <RepositoryCarousel repositories={project.repositories} />
    </div>
  )
}

const EmptyProjectsScreen: React.FC<{projectName?: string}> = ({
  projectName = 'Projects',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No {projectName} Available
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          There are currently no {projectName.toLowerCase()} to display. Check
          back later for updates!
        </p>
      </div>
    </div>
  )
}

const GenericProjectsScreen: React.FC<{
  projectsPath: string
  projectName?: string
}> = ({projectsPath, projectName = 'projects'}) => {
  const {status, message, error} = useProjectsGetApi(projectsPath)

  if (status !== 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-400 mb-2">
            Error Loading {projectName}
          </h3>
          <p className="text-red-600 dark:text-red-300">
            {error ||
              `An unexpected error occurred while loading ${projectName}.`}
          </p>
        </div>
      </div>
    )
  }

  if (!message || message.length === 0) {
    return <EmptyProjectsScreen projectName={projectName} />
  }

  return (
    <div className="space-y-4">
      {message.map((item, index) => (
        <ContentListItem
          key={item.title || index}
          title={item.title}
          description={item.description}
        >
          <ProjectComponent project={item} />
        </ContentListItem>
      ))}
    </div>
  )
}

export {GenericProjectsScreen, ProjectComponent}
