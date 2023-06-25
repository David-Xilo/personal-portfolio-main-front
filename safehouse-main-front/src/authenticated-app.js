/** @jsx jsx */
import {jsx} from '@emotion/react'

import {Button} from './components/lib'
import {useAuth} from './context/auth-context'

function AuthenticatedHeader() {
  const {user, logout} = useAuth()
  return (
    <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user.username}
        <Button variant="secondary" css={{marginLeft: '10px'}} onClick={logout}>
          Logout
        </Button>
      </div>
  )
}

export default AuthenticatedHeader
