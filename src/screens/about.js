import * as React from 'react'
import {Link} from 'components/lib'
import {NavLink} from './navigation'
import {useEffect} from 'react'
import {BlogHiddenMenuScreen} from './blog'

function AboutScreen({ subMenuDispatch, hiddenMenuDispatch }) {
  useEffect(() => {
    subMenuDispatch({ type: 'CLEAR_SUB_NAV' });  // Clear the sub-navigation component
  }, [subMenuDispatch]);

  useEffect(() => {
    hiddenMenuDispatch({ type: 'CLEAR_HIDDEN_NAV' });  // Clear the sub-navigation component
  }, [hiddenMenuDispatch]);

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