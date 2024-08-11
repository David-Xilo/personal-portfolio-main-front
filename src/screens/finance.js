import * as React from 'react'

import { NavLink, ErrorFallback } from './navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from './not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {useGetApi} from '../utils/useApi'

function FinanceIntroScreen() {
  console.log("FinanceIntroScreen")
  const data = useGetApi('finance/intro')

  return (
    <div>{data.message}</div>
  )
}

function FinanceAnalysisScreen() {
  const data = useGetApi('finance/analysis')

  return (
    <p>{data.message}</p>
  )
}

function FinanceStudiesScreen() {
  const data = useGetApi('finance/studies')

  return (
    <p>{data.message}</p>
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
      <ul style={{listStyle: 'none',}}>
        <li>
          <NavLink to="/finance/">Introduction</NavLink>
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
      <Route path="/" element={<FinanceIntroScreen />} />
      <Route path="/analysis" element={<FinanceAnalysisScreen />} />
      <Route path="/studies" element={<FinanceStudiesScreen />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {FinanceApp}
