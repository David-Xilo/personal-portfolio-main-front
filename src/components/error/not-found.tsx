import * as React from 'react'
import {Link as RouterLink} from 'react-router-dom'

const NotFoundScreen: React.FC = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-message">
        Sorry... nothing here.{' '}
        <RouterLink to="/list" className="notfound-home-link">
          Go home
        </RouterLink>
      </div>
    </div>
  )
}

export {NotFoundScreen}
