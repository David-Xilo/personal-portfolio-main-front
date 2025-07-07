import React from 'react'
import './index.css'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {FullApp} from './app'

function renderApp() {
  const rootElement = document.getElementById('root')
  if (rootElement) {
    createRoot(rootElement).render(
      <Router>
        <FullApp />
      </Router>,
    )
  } else {
    console.error('Root element not found')
  }
}

if (process.env.NODE_ENV === 'production') {
  console.log("prod")
  renderApp()
} else if (process.env.NODE_ENV === 'development') {
  console.log("dev")
  async function clearServiceWorkers() {
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations()
        const unregisterPromises = registrations.map(registration =>
          registration.unregister(),
        )
        await Promise.all(unregisterPromises)
        console.log('✅ Service workers unregistered')
      } catch (err) {
        console.error('❌ Error unregistering service workers:', err)
      }
    }
  }

  async function enableMocking() {
    try {
      console.log('🔧 Development mode: enabling MSW')

      // Dynamic import ensures MSW is only loaded in development
      const {worker} = await import('./mocks/browser')

      await worker.start({
        serviceWorker: {url: `/mockServiceWorker.js?v=${Date.now()}`},
        onUnhandledRequest: 'bypass',
        quiet: false, // Set to true to reduce MSW console logs
      })

      console.log('✅ MSW started successfully')
      return true
    } catch (error) {
      console.warn('⚠️ Failed to start MSW:', error)
      console.log('📡 Continuing without mocks - will use real API')
      return false
    }
  }

  async function initDevelopmentApp() {
    try {
      await clearServiceWorkers()
      const mswStarted = await enableMocking()

      if (mswStarted) {
        console.log('🎭 Development app starting with mocks')
      } else {
        console.log('🌐 Development app starting without mocks')
      }

      renderApp()
    } catch (err) {
      console.error('❌ Error initializing development app:', err)
      console.log('🔄 Falling back to basic app rendering')
      renderApp()
    }
  }

  initDevelopmentApp()
} else {
  renderApp()
}
