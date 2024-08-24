import * as React from 'react'
import {Link} from 'components/lib'
import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hiddenMenuReducer'
import {CLEAR_SUB_NAV} from '../../reducers/subMenuReducer'

function WelcomeScreen({ subMenuDispatch, hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({ type:CLEAR_HIDDEN_NAV });
    subMenuDispatch({ type: CLEAR_SUB_NAV });
  }, [subMenuDispatch, hiddenMenuDispatch]);

  return (<WelcomeContent />)
}

function WelcomeContent() {
  return (<p style={{padding: '10px 10px 10px 50px'}}>
    Hello!
    Welcome to my personal page. Here you can explore some of my personal projects related
    with <Link to={"/tech"}>blog</Link>.
    Have fun!
  </p>);
}

export { WelcomeScreen }
