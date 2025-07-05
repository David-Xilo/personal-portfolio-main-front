// src/config/index.ts

interface AppConfig {
  apiUrl: string
  appVersion: string
  environment: 'development' | 'staging' | 'production'
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
  // Get environment variables with validation
  const apiUrl = getRequiredEnvVar(
    process.env.REACT_APP_API_URL,
    'REACT_APP_API_URL',
    process.env.NODE_ENV === 'production' ? 'https://api.your-domain.com' : 'http://localhost:4000',
  )
  const appVersion = getRequiredEnvVar(
    process.env.REACT_APP_APP_VERSION,
    'REACT_APP_APP_VERSION',
    '1.0.0',
  )

  // For NODE_ENV, we need to access it directly as webpack replaces this
  const nodeEnv = process.env.NODE_ENV || 'development'
  const environment = nodeEnv as AppConfig['environment']

  // Validate URLs
  const validatedApiUrl = validateUrl(apiUrl, 'REACT_APP_API_URL')

  // Validate environment
  if (!['development', 'staging', 'production'].includes(environment)) {
    throw new ConfigError(
      `Invalid environment: ${environment}. Must be 'development', 'staging', or 'production'`,
    )
  }

  return {
    apiUrl: validatedApiUrl,
    appVersion,
    environment,
    isProduction: environment === 'production',
    isDevelopment: environment === 'development',
  }
}

// Create and export the configuration
export const config = createConfig()

// Log configuration in development (no sensitive data to hide)
if (config.isDevelopment) {
  console.log('🔧 App Configuration:', {
    apiUrl: config.apiUrl,
    appVersion: config.appVersion,
    environment: config.environment,
  })
}
