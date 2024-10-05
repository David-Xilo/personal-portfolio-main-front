import * as React from 'react'

import styled from '@emotion/styled/macro'
import * as colors from 'styles/colors'
import {ErrorProps} from 'components/error/error-fallback'

interface ErrorMessageProps {
  error: ErrorProps,
  variant?: keyof typeof errorMessageVariants,

}

const StyledErrorMessageContainer = styled.div<{ variant: keyof typeof errorMessageVariants }>`
    role: alert;
    color: ${colors.danger};
    ${({ variant }) => errorMessageVariants[variant]};
`;

const StyledErrorPre = styled.pre<{ variant: keyof typeof errorMessageVariants }>`
    white-space: break-spaces;
    margin: 0 0 -5px;
    ${({ variant }) => errorMessageVariants[variant]};
`;

const errorMessageVariants = {
  stacked: {display: 'block'},
  inline: {display: 'inline-block'},
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({error, variant = 'stacked', ...props}) => {
  return (
    <StyledErrorMessageContainer variant={variant} {...props}>
      <span>There was an error: </span>
      <StyledErrorPre variant={variant}>{error.message}</StyledErrorPre>
    </StyledErrorMessageContainer>
  )
}

export {ErrorMessage}
