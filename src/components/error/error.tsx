import React from 'react'
import { ErrorProps } from './error-fallback'
import './error.css'

interface ErrorMessageProps {
  error: ErrorProps
  variant?: 'stacked' | 'inline'
  className?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  variant = 'stacked',
  className = '',
  ...props
}) => {
  const containerClass = variant === 'inline' ? 'error-message-inline' : 'error-message-stacked'
  const preClass = variant === 'inline' ? 'error-message-pre-inline' : 'error-message-pre-stacked'

  return (
    <div
      role="alert"
      className={`error-message ${containerClass} ${className}`.trim()}
      {...props}
    >
      <span>There was an error: </span>
      <pre className={`error-message-pre ${preClass}`.trim()}>
        {error.error.message}
      </pre>
    </div>
  )
}

export { ErrorMessage }
