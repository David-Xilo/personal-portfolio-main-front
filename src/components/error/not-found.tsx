import * as React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import * as colors from 'styles/colors'

const NotFoundScreen: React.FC = () => {
  return (
    <div className="h-full grid place-items-center">
      <div className="text-center">
        Sorry... nothing here.{' '}
        <RouterLink
          to="/list"
          className={`
            text-[${colors.black}]
            hover:text-[${colors.black}]
            hover:underline
          `.trim()}
        >
          Go home
        </RouterLink>
      </div>
    </div>
  )
}

export {NotFoundScreen}