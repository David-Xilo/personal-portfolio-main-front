import * as React from 'react'

import { NavLink, ErrorFallback } from './navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from './not-found'
import {ErrorBoundary} from 'react-error-boundary'


function GamesIntroScreen() {
  return (
    <div>This is the game Intro screen.</div>
  )
}

function GamesBlogScreen() {
  return (
    <p>This is the game Blog screen.</p>
  )
}

function GamesDownloadScreen() {
  return (
    <p>This is the game Download screen.</p>
  )
}

function GamesApp() {
  return (
      <div style={{display: 'table'}}>
        <div style={{position: 'relative', width:'10%', display: 'table-cell'}}>
          <GamesNav />
        </div>
        <div style={{width: '90%', display: 'table-cell'}}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
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
          <NavLink to="/games/blogs">Blog posts</NavLink>
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
      <Route path="/blogs" element={<GamesBlogScreen />} />
      <Route path="/downloads" element={<GamesDownloadScreen />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {GamesApp}
