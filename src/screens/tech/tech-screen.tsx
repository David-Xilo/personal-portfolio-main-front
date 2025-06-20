import React from 'react'
import {TechProjects, useTechProjectsGetApi} from '../../hooks/tech-rest'
import {ContentListItem} from 'components/menu/content-list-item'

const TechProject: React.FC<{ project: TechProjects }> = ({ project }) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <a
          href={project.link_to_git}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-md transition-colors duration-200"
          onClick={(e) => e.stopPropagation()} // Prevent expanding when clicking link
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
          View Source
        </a>
      </div>

      {/* Additional project details could go here */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>Click the link above to view the project repository and learn more about the implementation.</p>
      </div>
    </div>
  )
}

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

const TechProjectsItemScreen: React.FC = () => {
  const projectsPath = '/tech/projects'
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
          key={item.link_to_git || index}
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
