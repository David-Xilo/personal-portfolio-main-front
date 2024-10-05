import * as React from 'react'
import styled from '@emotion/styled/macro'
import * as colors from 'styles/colors'
import {ErrorMessage} from './error'

interface ErrorProps {
  error: Error,
  resetErrorBoundary: () => void,
}

const FullPageErrorContainer = styled.div`
  color: ${colors.danger};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledErrorMessage = styled(ErrorMessage)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FullPageErrorFallback: React.FC<ErrorProps> = ({error}) => {
  return (
    <FullPageErrorContainer role="alert">
      <p>Uh oh... There&apos;s a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </FullPageErrorContainer>
  )
}

const ErrorFallback: React.FC<ErrorProps> = (error) => {
  return <StyledErrorMessage error={error} />
}

export {FullPageErrorFallback, ErrorFallback, ErrorProps}
