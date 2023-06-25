import * as React from 'react'
import {FullPageSpinner} from './components/lib'

const MainApp = React.lazy(() => import('./main-app'))

function FullApp() {
  return (
    <>
      <App />
    </>
  )
}

function App() {
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <MainApp />
    </React.Suspense>
  )
}

export {FullApp}
