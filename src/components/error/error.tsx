import * as React from 'react'
import * as colors from 'styles/colors'
import {ErrorProps} from 'components/error/error-fallback'

interface ErrorMessageProps {
  // Change this line - error should be of type Error, not ErrorProps
  error: ErrorProps,
  variant?: keyof typeof errorMessageVariants,
  className?: string,
}

const errorMessageVariants = {
  stacked: 'block',
  inline: 'inline-block',
} as const

const ErrorMessage: React.FC<ErrorMessageProps> = ({
                                                     error,
                                                     variant = 'stacked',
                                                     className = '',
                                                     ...props
                                                   }) => {
  return (
    <div
      role="alert"
      className={`
        text-[${colors.danger}]
        ${errorMessageVariants[variant]}
        ${className}
      `.trim()}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        className={`
          whitespace-break-spaces
          -mb-[5px]
          m-0
          ${errorMessageVariants[variant]}
        `.trim()}
      >
        {error.error.message}
      </pre>
    </div>
  )
}

export {ErrorMessage}