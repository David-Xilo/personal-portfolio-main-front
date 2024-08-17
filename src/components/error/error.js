/** @jsx jsx */
import {jsx} from '@emotion/react'

import styled from '@emotion/styled/macro'
import * as colors from '../../styles/colors'

const StyledErrorMessageContainer = styled.div`
  role: alert;
  color: ${colors.danger};
  ${({ variant }) => errorMessageVariants[variant]};
`;

const StyledErrorPre = styled.pre`
    white-space: break-spaces;
    margin: 0 0 -5px;
    ${({variant}) => errorMessageVariants[variant]};
`;

const errorMessageVariants = {
  stacked: {display: 'block'},
  inline: {display: 'inline-block'},
}

function ErrorMessage({ error, variant = 'stacked', ...props }) {
  return (
    <StyledErrorMessageContainer variant={variant} {...props}>
      <span>There was an error: </span>
      <StyledErrorPre variant={variant}>{error.message}</StyledErrorPre>
    </StyledErrorMessageContainer>
  );
}

export {ErrorMessage}

