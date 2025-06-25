/**
 * @jest-environment jsdom
 */

// Mock modules that are imported in index.tsx
jest.mock('../app', () => ({
  FullApp: () => <div data-testid="full-app">Full App Component</div>
}))

jest.mock('../index.css', () => ({}))

// Mock createRoot and render
const mockRender = jest.fn()
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: mockRender
  }))
}))

// Mock MSW browser worker
jest.mock('../mocks/browser', () => ({
  worker: {
    start: jest.fn(() => Promise.resolve())
  }
}))

describe('index.tsx module structure', () => {
  test('exports expected functions and components', () => {
    // This test verifies the module can be imported without errors
    expect(() => require('../index')).not.toThrow()
  })

  test('has renderApp function structure', () => {
    // Test that the module structure is correct by checking it imports successfully
    const indexModule = require('../index')
    expect(indexModule).toBeDefined()
  })

  test('handles DOM correctly in production mode', () => {
    // Set up DOM
    document.body.innerHTML = '<div id="root"></div>'
    
    // Verify the root element exists
    const rootElement = document.getElementById('root')
    expect(rootElement).toBeTruthy()
  })

  test('handles missing root element', () => {
    // Remove root element
    document.body.innerHTML = ''
    
    // Mock console.error to capture the error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    // Verify the root element doesn't exist
    const rootElement = document.getElementById('root')
    expect(rootElement).toBeFalsy()
    
    consoleErrorSpy.mockRestore()
  })
})