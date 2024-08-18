import * as React from 'react'

import {SubNavLink} from '../navigation/navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from '../components/error/not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {useGetApi} from '../hooks/useApi'
import {useEffect} from 'react'
import {ErrorFallback} from '../components/error/errorFallback'
import {SET_HIDDEN_NAV} from '../reducers/hiddenMenuReducer'
import {SET_SUB_NAV} from '../reducers/subMenuReducer'


function BlogHiddenMenuScreen() {
  const data = useGetApi('finance/intro')

  return (
    <div>{data.message}</div>
  )
}

function BlogAllScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({ type: SET_HIDDEN_NAV, component: BlogHiddenMenuScreen });
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
    hiddenMenuDispatch({ type: SET_HIDDEN_NAV, component: BlogHiddenMenuScreen });
  }, [hiddenMenuDispatch]);

  const data = useGetApi('finance/intro');

  return (
    <div>
      <p>{data.message}</p>
    </div>
  );
}

function BlogFavoriteScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({ type: SET_HIDDEN_NAV, component: BlogHiddenMenuScreen });
  }, [hiddenMenuDispatch]);

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
        <li><SubNavLink to="/blog">All Posts</SubNavLink></li>
        <li><SubNavLink to="/blog/you">Your Posts</SubNavLink></li>
        <li><SubNavLink to="/blog/favorite">Favorites</SubNavLink></li>
      </ul>
    </nav>
  );
}

function BlogAppRoutes({ hiddenMenuDispatch }) {
  return (
    <Routes>
      <Route path="" element={<BlogAllScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/you" element={<BlogYouScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/favorite" element={<BlogFavoriteScreen hiddenMenuDispatch={hiddenMenuDispatch} />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  );
}


function BlogApp({ subMenuDispatch, hiddenMenuDispatch }) {
  useEffect(() => {
    subMenuDispatch({ type: SET_SUB_NAV, component: BlogNav });
  }, [subMenuDispatch]);

  return (
    <div style={{ display: 'table' }}>
      <div style={{ width: '90%', display: 'table-cell' }}>
        <ErrorBoundary FallbackComponent={ErrorFallback} fallback={< ErrorFallback />} >
          <BlogAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
        </ErrorBoundary>
      </div>
    </div>
  );
}


export {BlogApp, BlogNav, BlogHiddenMenuScreen}
