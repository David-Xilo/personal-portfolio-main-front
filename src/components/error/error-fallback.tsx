import * as React from 'react'
import * as colors from 'styles/colors'
import {ErrorMessage} from './error'

interface ErrorProps {
  error: Error,
  resetErrorBoundary: () => void,
}

const FullPageErrorFallback: React.FC<ErrorProps> = ({error}) => {
  return (
    <div
      role="alert"
      className="text-red-600 h-screen flex flex-col justify-center items-center"
    >
      <p>Uh oh... There&apos;s a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

const ErrorFallback: React.FC<ErrorProps> = (error) => {
  return (
    <ErrorMessage
      error={error}
      className="h-full flex flex-col justify-center items-center"
    />
  )
}

export {FullPageErrorFallback, ErrorFallback, ErrorProps}