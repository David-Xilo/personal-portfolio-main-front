interface AppConfig {
  apiUrl: string
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
  // These will be replaced by webpack DefinePlugin at build time
  // TypeScript doesn't know about these, so we need to declare them
  const API_URL = process.env.API_URL as string
  const ENVIRONMENT = process.env.ENVIRONMENT as string
  const NODE_ENV = process.env.NODE_ENV as string

  // Get environment variables with validation
  const apiUrl = getRequiredEnvVar(API_URL, 'API_URL', 'http://localhost:4000')
  const environment = getRequiredEnvVar(
    ENVIRONMENT,
    'ENVIRONMENT',
    NODE_ENV || 'development',
  ) as AppConfig['environment']

  // Validate URLs
  const validatedApiUrl = validateUrl(apiUrl, 'API_URL')

  // Validate environment
  if (!['development', 'staging', 'production'].includes(environment)) {
    throw new ConfigError(
      `Invalid environment: ${environment}. Must be 'development', 'staging', or 'production'`,
    )
  }

  return {
    apiUrl: validatedApiUrl,
    environment,
    isProduction: environment === 'production',
    isDevelopment: environment === 'development',
  }
}

// Create and export the configuration
export const config = createConfig()

// Log configuration in development (but hide sensitive data in production)
if (config.isDevelopment) {
  console.log('🔧 App Configuration:', {
    apiUrl: config.apiUrl,
    environment: config.environment,
  })
}
