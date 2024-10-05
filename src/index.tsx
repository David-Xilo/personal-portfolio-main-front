import * as React from 'react'
import './index.css';
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {FullApp} from './app'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <Router>
      <FullApp />
    </Router>,
  );
} else {
  console.error('Root element not found');
}
