import * as React from 'react'

import { NavLink, ErrorFallback } from './navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from './not-found'
import {ErrorBoundary} from 'react-error-boundary'

function FinanceIntroScreen() {
  return (
    <div>This is the finance Intro screen.</div>
  )
}

function FinanceBlogScreen() {
  return (
    <p>This is the finance Blog screen.</p>
  )
}

function FinanceAnalysisScreen() {
  return (
    <p>This is the finance analysis screen.</p>
  )
}

function FinanceStudiesScreen() {
  return (
    <p>This is the finance studies screen.</p>
  )
}

function FinanceApp() {
  return (
      <div style={{display: 'table'}}>
        <div style={{position: 'relative', width:'10%', display: 'table-cell'}}>
          <FinanceNav />
        </div>
        <div style={{width: '90%', display: 'table-cell'}}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FinanceAppRoutes />
          </ErrorBoundary>
        </div>
      </div>
  )
}

function FinanceNav() {
  return (
    <nav>
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
          <NavLink to="/finance/intro">Introduction</NavLink>
        </li>
        <li>
          <NavLink to="/finance/blogs">Blog posts</NavLink>
        </li>
        <li>
          <NavLink to="/finance/analysis">Analysis</NavLink>
        </li>
        <li>
          <NavLink to="/finance/studies">Studies</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function FinanceAppRoutes() {
  return (
    <Routes>
      <Route path="/intro" element={<FinanceIntroScreen />} />
      <Route path="/blogs" element={<FinanceBlogScreen />} />
      <Route path="/analysis" element={<FinanceAnalysisScreen />} />
      <Route path="/studies" element={<FinanceStudiesScreen />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {FinanceApp}
