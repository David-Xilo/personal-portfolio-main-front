/** @jsx jsx */
import {jsx} from '@emotion/react'

import styled from '@emotion/styled/macro'
import {Link as RouterLink} from 'react-router-dom'
import * as colors from 'styles/colors.js'

const StyledNotFoundContainer = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`

const StyledNotFoundMessage = styled.div`
  text-align: center; /* Optional: Ensures the text is centered */
`

const Link = styled(RouterLink)({
  color: colors.indigo,
  ':hover': {
    color: colors.indigoDarken10,
    textDecoration: 'underline',
  },
})

function NotFoundScreen() {
  return (
    <StyledNotFoundContainer>
      <StyledNotFoundMessage>
        Sorry... nothing here. <Link to="/list">Go home</Link>
      </StyledNotFoundMessage>
    </StyledNotFoundContainer>
  )
}

export {NotFoundScreen}
