import React from 'react'
import {TechProjects, useTechProjectsGetApi} from '../../hooks/tech-rest'
import {ContentListItem} from 'components/menu/content-list-item'

const TechProject: React.FC<{project: TechProjects}> = ({project}) => {
  return (
    <div>
      <a href={project.link_to_git}>Project Git Link</a>
    </div>
  )
}

const TechEmptyProjectsScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Projects Available
        </h2>
        <p className="text-gray-500">
          There are currently no tech projects to display. Check back later for
          updates!
        </p>
      </div>
    </div>
  )
}

const TechProjectsItemScreen: React.FC = () => {
  const projectsPath = '/tech/projects'
  const {status, message, error} = useTechProjectsGetApi(projectsPath)
  if (status !== 'success') {
    return <div>Found error {error}</div>
  }

  if (!message || message.length === 0) {
    return <TechEmptyProjectsScreen />
  }

  return (
    <div>
      {message.map(item => (
        <ContentListItem title={item.title} description={item.description}>
          <TechProject project={item} />
        </ContentListItem>
      ))}
    </div>
  )
}

export {TechProjectsItemScreen}
