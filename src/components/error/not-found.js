/** @jsx jsx */
import {jsx} from '@emotion/react'

import {Link} from 'components/lib'
import styled from '@emotion/styled/macro'


const StyledNotFoundContainer = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const StyledNotFoundMessage = styled.div`
  text-align: center;  /* Optional: Ensures the text is centered */
`;

function NotFoundScreen() {
  return (
    <StyledNotFoundContainer>
      <StyledNotFoundMessage>
        Sorry... nothing here. <Link to="/list">Go home</Link>
      </StyledNotFoundMessage>
    </StyledNotFoundContainer>
  );
}

export {NotFoundScreen}
