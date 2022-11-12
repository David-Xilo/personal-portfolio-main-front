import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './app'
import {AppProviders} from './context'

createRoot(document.getElementById('root')).render(
  <AppProviders>
    <App />
  </AppProviders>
)
