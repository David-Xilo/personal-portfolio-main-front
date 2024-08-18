import * as React from 'react'

import { MainNavLink, ErrorFallback } from '../navigation/navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from '../components/error/not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {useGetApi} from '../hooks/useApi'

function TechIntroScreen() {
  const data = useGetApi('tech/intro')

  return (
    <div>{data.message}</div>
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
          <ErrorBoundary FallbackComponent={ErrorFallback} fallback={< ErrorFallback />}>
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
          <MainNavLink to="/tech/">Introduction</MainNavLink>
        </li>
        <li>
          <MainNavLink to="/tech/studies">Studies</MainNavLink>
        </li>
        <li>
          <MainNavLink to="/tech/downloads">Downloads</MainNavLink>
        </li>
      </ul>
    </nav>
  )
}

function TechAppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TechIntroScreen />} />
      <Route path="/studies" element={<TechStudiesScreen />} />
      <Route path="/downloads" element={<TechDownloadScreen />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {TechApp}
