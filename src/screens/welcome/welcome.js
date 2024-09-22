import * as React from 'react'
import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hiddenMenuReducer'
import {CLEAR_SUB_NAV} from '../../reducers/subMenuReducer'

function WelcomeScreen({subMenuDispatch, hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
    subMenuDispatch({type: CLEAR_SUB_NAV})
  }, [subMenuDispatch, hiddenMenuDispatch])

  return <WelcomeContent />
}
// <Link to={"/tech"}>blog</Link>

function WelcomeContent() {
  return (
    <p style={{padding: '10px 10px 10px 50px'}}>
      Hello! Welcome to my personal page. Have fun!
    </p>
  )
}

export {WelcomeScreen}
