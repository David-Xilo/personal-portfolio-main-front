import * as React from 'react'

import { NavLink } from '../navigation/navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from '../components/error/not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {useGetApi} from '../hooks/useApi'
import {useEffect} from 'react'
import {ErrorFallback} from '../components/error/errorFallback'


function BlogHiddenMenuScreen() {
  const data = useGetApi('finance/intro')

  return (
    <div>{data.message}</div>
  )
}

function BlogAllScreen({ menuDispatch }) {
  useEffect(() => {
    menuDispatch({ type: 'SET_BLOG_NAV' });
  }, [menuDispatch]);

  console.log("BlogAllScreen");
  const data = useGetApi('finance/intro');

  return (
    <div>
      <p>{data.message}</p>
    </div>
  );
}

function BlogYouScreen({ menuDispatch }) {
  useEffect(() => {
    menuDispatch({ type: 'SET_BLOG_NAV' });
  }, [menuDispatch]);

  const data = useGetApi('finance/intro');

  return (
    <div>
      <p>{data.message}</p>
    </div>
  );
}

function BlogFavoriteScreen({ menuDispatch }) {
  useEffect(() => {
    menuDispatch({ type: 'SET_BLOG_NAV' });
  }, [menuDispatch]);

  const data = useGetApi('finance/intro');

  return (
    <div>
      <p>{data.message}</p>
    </div>
  );
}


function BlogNav() {
  return (
    <nav>
      <ul style={{ listStyle: 'none' }}>
        <li><NavLink to="/blog/">All Posts</NavLink></li>
        <li><NavLink to="/blog/you">Your Posts</NavLink></li>
        <li><NavLink to="/blog/favorite">Favorites</NavLink></li>
      </ul>
    </nav>
  );
}

function BlogAppRoutes({ menuDispatch }) {
  return (
    <Routes>
      <Route path="/" element={<BlogAllScreen menuDispatch={menuDispatch} />} />
      <Route path="/you" element={<BlogYouScreen menuDispatch={menuDispatch} />} />
      <Route path="/favorite" element={<BlogFavoriteScreen menuDispatch={menuDispatch} />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  );
}


function BlogApp({ menuDispatch }) {

  return (
    <div style={{ display: 'table' }}>
      <div style={{ width: '90%', display: 'table-cell' }}>
        <ErrorBoundary FallbackComponent={ErrorFallback} fallback={< ErrorFallback />} >
          <BlogAppRoutes menuDispatch={menuDispatch} />
        </ErrorBoundary>
      </div>
    </div>
  );
}


export {BlogApp, BlogNav, BlogHiddenMenuScreen}
