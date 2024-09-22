import * as React from 'react'
// import {FullPageSpinner} from 'components/lib'

const MainApp = React.lazy(() => import('./screens/main-app'))

function FullApp() {
  return (
    <>
      <App />
    </>
  )
}

function App() {
  return (
    <MainApp />
    // <React.Suspense fallback={<FullPageSpinner />}>
    // </React.Suspense>
  )
}

export {FullApp}
