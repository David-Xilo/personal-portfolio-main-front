import * as React from 'react'

const MainApp = React.lazy(() => import('./screens/main-app'))

function FullApp() {
  return (
    <>
      <App />
    </>
  )
}

const App: React.FC = () => {
  return <MainApp />
}

export {FullApp}
