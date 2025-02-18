import * as React from 'react'
import {ErrorMessage} from './error'

interface ErrorProps {
  error: Error,
  resetErrorBoundary: () => void,
}

const FullPageErrorFallback: React.FC<ErrorProps> = ({error}) => {
  return (
    <div role="alert" className="fullpage-error-fallback">
      <p>Uh oh... There&apos;s a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

const ErrorFallback: React.FC<ErrorProps> = (error) => {
  return (
    <ErrorMessage error={error} className="error-fallback" />
  )
}

export {FullPageErrorFallback, ErrorFallback, ErrorProps}