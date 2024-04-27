import * as React from 'react'

import { NavLink, ErrorFallback } from './navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from './not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {useGetApi} from '../utils/useApi'

function TechIntroScreen() {
  const data = useGetApi('tech/intro')

  return (
    <div>{data.message}</div>
  )
}

function TechBlogScreen() {
  const data = useGetApi('tech/blogs')

  return (
    <p>{data.message}</p>
  )
}

function TechStudiesScreen() {
  const data = useGetApi('tech/studies')

  return (
    <p>{data.message}</p>
  )
}

function TechDownloadScreen() {
  const data = useGetApi('tech/downloads')

  return (
    <p>{data.message}</p>
  )
}

function TechApp() {
  return (
      <div style={{display: 'table'}}>
        <div style={{position: 'relative', width:'10%', display: 'table-cell'}}>
          <TechNav />
        </div>
        <div style={{width: '90%', display: 'table-cell'}}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <TechAppRoutes />
          </ErrorBoundary>
        </div>
      </div>
  )
}

function TechNav() {
  return (
    <nav>
      <ul style={{listStyle: 'none',}}>
        <li>
          <NavLink to="/tech/">Introduction</NavLink>
        </li>
        <li>
          <NavLink to="/tech/blogs">Blog posts</NavLink>
        </li>
        <li>
          <NavLink to="/tech/studies">Studies</NavLink>
        </li>
        <li>
          <NavLink to="/tech/downloads">Downloads</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function TechAppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TechIntroScreen />} />
      <Route path="/blogs" element={<TechBlogScreen />} />
      <Route path="/studies" element={<TechStudiesScreen />} />
      <Route path="/downloads" element={<TechDownloadScreen />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {TechApp}
