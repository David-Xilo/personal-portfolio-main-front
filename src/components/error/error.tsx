import * as React from 'react'
import {ErrorProps} from 'components/error/error-fallback'
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
  const containerVariantClass =
    variant === 'inline' ? 'error-message-inline' : 'error-message-stacked'
  const preVariantClass =
    variant === 'inline'
      ? 'error-message-pre-inline'
      : 'error-message-pre-stacked'

  return (
    <div
      role="alert"
      className={`error-message ${containerVariantClass} ${className}`.trim()}
      {...props}
    >
      <span>There was an error: </span>
      <pre className={`error-message-pre ${preVariantClass}`.trim()}>
        {error.error.message}
      </pre>
    </div>
  )
}

export {ErrorMessage}
