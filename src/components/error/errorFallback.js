/** @jsx jsx */
import {jsx} from '@emotion/react'

import styled from '@emotion/styled/macro'
import * as colors from '../../styles/colors'
import {ErrorMessage} from './error'


const FullPageErrorContainer = styled.div`
    color: ${colors.danger};
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledErrorMessage = styled(ErrorMessage)`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


function FullPageErrorFallback({ error }) {
  return (
    <FullPageErrorContainer role="alert">
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </FullPageErrorContainer>
  );
}


function ErrorFallback({ error }) {
  return (
    <StyledErrorMessage error={error} />
  );
}

export {FullPageErrorFallback, ErrorFallback};
