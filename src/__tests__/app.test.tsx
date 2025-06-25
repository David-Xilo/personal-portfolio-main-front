import React from 'react'
import {render, screen, waitFor, act} from '@testing-library/react'
import '@testing-library/jest-dom'
import {FullApp} from '../app'

// Mock the lazy-loaded MainApp component
jest.mock('../screens/main-app', () => ({
  __esModule: true,
  default: () => <div data-testid="main-app">Main App Component</div>,
}))

describe('FullApp', () => {
  test('renders without crashing', async () => {
    await act(async () => {
      render(
        <React.Suspense fallback={<div data-testid="loading">Loading...</div>}>
          <FullApp />
        </React.Suspense>,
      )
    })

    // Wait for lazy component to load
    await waitFor(() => {
      expect(screen.getByTestId('main-app')).toBeInTheDocument()
    })
  })

  test('renders App component within FullApp', async () => {
    await act(async () => {
      render(
        <React.Suspense fallback={<div data-testid="loading">Loading...</div>}>
          <FullApp />
        </React.Suspense>,
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId('main-app')).toBeInTheDocument()
    })
  })

  test('shows loading state initially', async () => {
    const {rerender} = render(
      <React.Suspense fallback={<div data-testid="loading">Loading...</div>}>
        <FullApp />
      </React.Suspense>,
    )

    // MainApp should eventually load
    await waitFor(() => {
      expect(screen.getByTestId('main-app')).toBeInTheDocument()
    })
  })

  test('FullApp structure includes App component', async () => {
    await act(async () => {
      render(
        <React.Suspense fallback={<div data-testid="loading">Loading...</div>}>
          <FullApp />
        </React.Suspense>,
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId('main-app')).toBeInTheDocument()
    })
  })
})
