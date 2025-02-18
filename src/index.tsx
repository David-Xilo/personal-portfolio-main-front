import * as React from 'react'
import './index.css';
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {FullApp} from './app'

function renderApp() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <Router>
        <FullApp />
      </Router>
    );
  } else {
    console.error('Root element not found');
  }
}

if (process.env.NODE_ENV === 'development') {
  async function clearServiceWorkers() {
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(registration => registration.unregister()));
        console.log('Service workers unregistered');
      } catch (err) {
        console.error('Error unregistering service workers:', err);
      }
    }
  }

  async function enableMocking() {
    console.log('Development mode: enabling MSW');
    const { worker } = await import('./mocks/browser');
    // Force a fresh fetch by appending a timestamp
    return worker.start({
      serviceWorker: { url: `/mockServiceWorker.js?v=${Date.now()}` },
      onUnhandledRequest: 'bypass',
    });
  }

  async function initApp() {
    await clearServiceWorkers();
    await enableMocking();
    renderApp();
  }

  initApp().catch((err) => {
    console.error('Error initializing app:', err);
  });
} else {
  // In production, simply render the app.
  renderApp();
}
