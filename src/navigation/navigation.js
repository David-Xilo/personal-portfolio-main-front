/** @jsx jsx */
import {jsx} from '@emotion/react'

import * as colors from '../styles/colors'
import {Link as RouterLink, useMatch} from 'react-router-dom'
import styled from '@emotion/styled/macro'

const StyledRouterLink = styled(RouterLink)`
    display: block;
    padding: 8px 15px 8px 10px;
    margin: 5px 0;
    color: ${colors.text};
    border-radius: 2px;
    border-left: 5px solid transparent;
    text-decoration: none;

    &:hover {
        color: ${colors.indigo};
        background: ${colors.gray10};
        text-decoration: none;
    }

    &:focus {
        ${({ match }) => match && `
      color: ${colors.indigo};
      background: ${colors.gray10};
      text-decoration: none;
    `}
    }

    ${({ match }) => match && `
    border-left: 5px solid ${colors.indigo};
    background: ${colors.gray10};
    font-weight: bold;

    &:hover,
    &:focus {
      background: ${colors.gray10};
    }
  `}
`;

function NavLink(props) {
const match = useMatch(props.to)
  return (
    <StyledRouterLink
      match={match}
      {...props}
    />
  );
}

export {NavLink}
