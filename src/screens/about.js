import * as React from 'react'
import {Link} from 'components/lib'
import {useEffect} from 'react'

function AboutScreen({ subMenuDispatch, hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({ type: 'CLEAR_HIDDEN_NAV' });
    subMenuDispatch({ type: 'CLEAR_SUB_NAV' });
  }, [subMenuDispatch, hiddenMenuDispatch]);

  return (<AboutContent />)
}

function AboutContent() {
  return (<p style={{padding: '10px 10px 10px 50px'}}>
    Hello!
    Welcome to my personal page. Here you can explore some of my personal projects related
    with <Link to="/blog">blog</Link>.
    Have fun!
  </p>);
}

export {AboutScreen}