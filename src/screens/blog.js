import * as React from 'react'

import { NavLink, ErrorFallback } from './navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from './not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {useGetApi} from '../utils/useApi'
import {useEffect} from 'react'


function BlogHiddenMenuScreen() {
  console.log("BlogHiddenMenuScreen")
  const data = useGetApi('finance/intro')

  return (
    <div>{data.message}</div>
  )
}

function BlogAllScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({
      type: 'SET_HIDDEN_NAV',
      component: BlogHiddenMenuScreen,
    });
  }, [hiddenMenuDispatch]);

  console.log("BlogAllScreen");
  const data = useGetApi('finance/intro');

  return (
    <div>
      <p>{data.message}</p>
    </div>
  );
}

function BlogYouScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({
      type: 'SET_HIDDEN_NAV',
      component: BlogHiddenMenuScreen,
    });
  }, [hiddenMenuDispatch]);

  console.log("BlogYourPostsScreen");
  const data = useGetApi('finance/intro');

  return (
    <div>
      <p>{data.message}</p>
    </div>
  );
}

function BlogFavoriteScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({
      type: 'SET_HIDDEN_NAV',
      component: BlogHiddenMenuScreen,
    });
  }, [hiddenMenuDispatch]);

  console.log("BlogYourPostsScreen");
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

function BlogApp({ subMenuDispatch, hiddenMenuDispatch }) {
  useEffect(() => {
    subMenuDispatch({
      type: 'SET_SUB_NAV',
      component: BlogNav,
    });
  }, [subMenuDispatch]);

  return (
    <div style={{ display: 'table' }}>
      <div style={{ width: '90%', display: 'table-cell' }}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BlogAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

function BlogAppRoutes({ hiddenMenuDispatch }) {
  return (
    <Routes>
      <Route path="/" element={<BlogAllScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/you" element={<BlogYouScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/favorite" element={<BlogFavoriteScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export {BlogApp, BlogHiddenMenuScreen}
