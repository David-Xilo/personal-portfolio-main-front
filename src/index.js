import * as React from 'react'
import './index.css';
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {FullApp} from './app.js'

createRoot(document.getElementById('root')).render(
  <Router>
    <FullApp />
  </Router>,
)
