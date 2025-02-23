import React from 'react'
import {TechProjects, useTechProjectsGetApi} from '../../hooks/tech-rest'
import {ContentListItem} from 'components/menu/content-list-item'


const TechProject: React.FC<{ project: TechProjects }> = ({project}) => {
  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <a href={project.link_to_git}>Git</a>
    </div>
  )
}

const TechProjectsItemScreen: React.FC = () => {
  const projectsPath = '/tech/projects'
  const {status, message, error} = useTechProjectsGetApi(projectsPath)
  if (status !== 'success') {
    return <div>Found error {error}</div>
  }

  // return (
  //   <div>
  //     {message.map(item => (
  //       <TechProject project={item} key={item.link_to_git} />
  //     ))}
  //   </div>
  // )

  return (
    <div>
      {message.map(item => (
        <ContentListItem title={item.title} description={item.description}>
          some more content
        </ContentListItem>
      ))}
    </div>
  )
}


export {TechProjectsItemScreen}

