import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {FullApp} from './app'

createRoot(document.getElementById('root')).render(
  <Router>
    <FullApp />
  </Router>
    
)
