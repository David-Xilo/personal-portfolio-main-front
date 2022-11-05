import * as React from 'react'
import {Link} from 'components/lib'

function AboutScreen() {
  return (
    <p>
          Hello! 
          Welcome to my personal page. Here you can explore some of my personal projects related with 
          <Link to="/games">games</Link>, <Link to="/finance">finance</Link> or <Link to="/tech">technology</Link>. 
          Have fun!
        </p>
  )
}

export {AboutScreen}
