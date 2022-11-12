/** @jsx jsx */
import {jsx} from '@emotion/react'

import * as colors from '../styles/colors'
import {Link as RouterLink, useMatch} from 'react-router-dom'
import {ErrorMessage} from '../components/lib'


function NavLink(props) {
const match = useMatch(props.to)
return (
    <RouterLink
    css={[
        {
        display: 'block',
        padding: '8px 15px 8px 10px',
        margin: '5px 0',
        // width: '100%',
        // height: '100%',
        color: colors.text,
        borderRadius: '2px',
        borderLeft: '5px solid transparent',
        ':hover,:focus': {
            color: colors.indigo,
            textDecoration: 'none',
            background: colors.gray10,
        },
        },
        match
        ? {
            borderLeft: `5px solid ${colors.indigo}`,
            background: colors.gray10,
            ':hover,:focus': {
                background: colors.gray10,
            },
            }
        : null,
    ]}
    {...props}
    />
)
}

function ErrorFallback({error}) {
return (
    <ErrorMessage
    error={error}
    css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }}
    />
)
}


export {NavLink, ErrorFallback}
