import * as React from 'react'

import { NavLink, ErrorFallback } from './navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from './not-found'
import {ErrorBoundary} from 'react-error-boundary'

function TechIntroScreen() {
  return (
    <div>This is the Tech Intro screen.</div>
  )
}

function TechBlogScreen() {
  return (
    <p>This is the Tech Blog screen.</p>
  )
}

function TechStudiesScreen() {
  return (
    <p>This is the Tech Studies screen.</p>
  )
}

function TechDownloadScreen() {
  return (
    <p>This is the Tech download screen.</p>
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
          <NavLink to="/tech/download">Downloads</NavLink>
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
      <Route path="/download" element={<TechDownloadScreen />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {TechApp}
