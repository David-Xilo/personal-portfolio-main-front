import * as React from 'react'

import { NavLink, ErrorFallback } from '../components/navigation/navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from '../components/error/not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {useGetApi} from '../utils/useApi'


function GamesIntroScreen() {
  const data = useGetApi('games/intro')

  return (
    <div>{data.message}</div>
  )
}

function GamesDownloadScreen() {
  const data = useGetApi('games/downloads')

  return (
    <p>{data.message}</p>
  )
}

function GamesApp() {
  return (
      <div style={{display: 'table'}}>
        <div style={{position: 'relative', width:'10%', display: 'table-cell'}}>
          <GamesNav />
        </div>
        <div style={{width: '90%', display: 'table-cell'}}>
          <ErrorBoundary FallbackComponent={ErrorFallback} fallback={< ErrorFallback />} >
            <GamesAppRoutes />
          </ErrorBoundary>
        </div>
      </div>
  )
}


function GamesNav() {
  return (
    <nav>
      <ul style={{listStyle: 'none',}}>
        <li>
          <NavLink to="/games/">Introduction</NavLink>
        </li>
        <li>
          <NavLink to="/games/downloads">Downloads</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function GamesAppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GamesIntroScreen />} />
      <Route path="/downloads" element={<GamesDownloadScreen />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {GamesApp}
