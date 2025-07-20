
interface AppConfig {
  apiUrl: string
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
    '',
  )

  const nodeEnv = process.env.NODE_ENV || 'local'
  const environment = nodeEnv as AppConfig['environment']


  const validatedApiUrl = validateUrl(apiUrl, 'REACT_APP_API_URL')

  if (!['development', 'local', 'test', 'production'].includes(environment)) {
    throw new ConfigError(
      `Invalid environment: ${environment}. Must be 'development', 'local', or 'production'`,
    )
  }

  return {
    apiUrl: validatedApiUrl,
    environment,
    isProduction: environment === 'production',
    isDevelopment: environment === 'development' || environment === 'local',
  }
}

// Create and export the configuration
export const config = createConfig()

