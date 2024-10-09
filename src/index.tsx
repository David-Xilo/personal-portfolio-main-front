import * as React from 'react'
import './index.css';
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {FullApp} from './app'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    console.log("not development")
    return
  }

  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {
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
})

