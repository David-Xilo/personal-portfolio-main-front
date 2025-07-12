// src/config/index.ts

interface AppConfig {
  apiUrl: string
  appVersion: string
  frontendKey: string
  environment: 'development' | 'local' | 'production'
  isProduction: boolean
  isDevelopment: boolean
}

class ConfigError extends Error {
  constructor(message: string) {
    super(`Configuration Error: ${message}`)
    this.name = 'ConfigError'
  }
}

function getRequiredEnvVar(
  value: string | undefined,
  name: string,
  fallback?: string,
): string {
  const envValue = value || fallback

  if (!envValue) {
    throw new ConfigError(`Required environment variable ${name} is not set`)
  }

  return envValue
}

function validateUrl(url: string, name: string): string {
  try {
    new URL(url)
    return url.replace(/\/$/, '') // Remove trailing slash
  } catch {
    throw new ConfigError(`Invalid URL for ${name}: ${url}`)
  }
}

function createConfig(): AppConfig {
  // These MUST be accessed as complete expressions for webpack DefinePlugin to work
  // NODE_ENV is injected by webpack DefinePlugin based on webpack mode for consistency
  // Get environment variables with validation
  const apiUrl = getRequiredEnvVar(
    process.env.REACT_APP_API_URL,
    'REACT_APP_API_URL',
    process.env.NODE_ENV === 'production' ? 'https://safehouse-backend-942519139037.us-central1.run.app' : 'http://localhost:8080',
  )
  const appVersion = getRequiredEnvVar(
    process.env.REACT_APP_APP_VERSION,
    'REACT_APP_APP_VERSION',
    '1.0.0',
  )
  const frontendKey = getRequiredEnvVar(
    process.env.FRONTEND_KEY,
    'FRONTEND_KEY',
    'safehouse-frontend',
  )

  const nodeEnv = process.env.NODE_ENV || 'local'
  const environment = nodeEnv as AppConfig['environment']

  // Validate URLs
  const validatedApiUrl = validateUrl(apiUrl, 'REACT_APP_API_URL')

  // Validate environment
  if (!['development', 'local', 'test', 'production'].includes(environment)) {
    throw new ConfigError(
      `Invalid environment: ${environment}. Must be 'development', 'local', or 'production'`,
    )
  }

  return {
    apiUrl: validatedApiUrl,
    appVersion,
    frontendKey,
    environment,
    isProduction: environment === 'production',
    isDevelopment: environment === 'development' || environment === 'local',
  }
}

// Create and export the configuration
export const config = createConfig()

