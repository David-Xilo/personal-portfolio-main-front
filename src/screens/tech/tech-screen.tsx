import React from 'react'
import {TechProjects, useTechProjectsGetApi} from '../../hooks/tech-rest'
import {ContentListItem} from 'components/menu/content-list-item'
import './tech.css'
import {RepositoryCarousel} from 'components/repository/repository'


const TechProject: React.FC<{ project: TechProjects }> = ({ project }) => {
  return (
    <div
      className="tech-project"
      onClick={(e) => e.stopPropagation()} // Prevent clicks within tech project from bubbling up
    >
      <div className="tech-project-header">
        <p className="tech-project-count">
          {project.projects.length} {project.projects.length === 1 ? 'repository' : 'repositories'}
        </p>
      </div>

      <RepositoryCarousel repositories={project.projects} />
    </div>
  )
}

// Empty Projects Screen (unchanged)
const TechEmptyProjectsScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No Projects Available
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          There are currently no tech projects to display. Check back later for
          updates or contact us if you're experiencing issues.
        </p>
      </div>
    </div>
  )
}

// Updated Main Screen Component
const TechProjectsItemScreen: React.FC = () => {
  const projectsPath = '/tech/projects'
  // You'll need to update this hook to match the new TechProjectsResponse interface
  const { status, message, error } = useTechProjectsGetApi(projectsPath)

  if (status !== 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-400 mb-2">
            Error Loading Projects
          </h3>
          <p className="text-red-600 dark:text-red-300">
            {error || 'An unexpected error occurred while loading tech projects.'}
          </p>
        </div>
      </div>
    )
  }

  if (!message || message.length === 0) {
    return <TechEmptyProjectsScreen />
  }

  return (
    <div className="space-y-4">
      {message.map((item, index) => (
        <ContentListItem
          key={item.title || index}
          title={item.title}
          description={item.description}
        >
          <TechProject project={item} />
        </ContentListItem>
      ))}
    </div>
  )
}

export {TechProjectsItemScreen}
