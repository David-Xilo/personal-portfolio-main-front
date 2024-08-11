import * as React from 'react'

import { NavLink, ErrorFallback } from './navigation'
import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from './not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {useGetApi} from '../utils/useApi'


function BlogHiddenMenuScreen() {
  console.log("BlogHiddenMenuScreen")
  const data = useGetApi('finance/intro')

  return (
    <div>{data.message}</div>
  )
}

function BlogAllScreen({ setMenuContent }) {
  React.useEffect(() => {
    setMenuContent(<BlogHiddenMenuScreen />);
  }, [setMenuContent]);

  console.log("BlogAllScreen");
  const data = useGetApi('finance/intro');

  return (
    <div>
      <p>{data.message}</p>
    </div>
  );
}

function BlogYouScreen({ setMenuContent }) {
  React.useEffect(() => {
    setMenuContent(<BlogHiddenMenuScreen />);
  }, [setMenuContent]);

  console.log("BlogYourPostsScreen");
  const data = useGetApi('finance/intro');

  return (
    <div>
      <p>{data.message}</p>
    </div>
  );
}

function BlogFavoriteScreen({ setMenuContent }) {
  React.useEffect(() => {
    setMenuContent(<BlogHiddenMenuScreen />);
  }, [setMenuContent]);

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
      <ul style={{listStyle: 'none',}}>
        <li>
          <NavLink to="/blog/">All Posts</NavLink>
        </li>
        <li>
          <NavLink to="/blog/you">Your Posts</NavLink>
        </li>
        <li>
          <NavLink to="/blog/favorite">Favorites</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function BlogApp({ setMenuContent }) {
  return (
    <div style={{ display: 'table' }}>
      <div style={{ position: 'relative', width: '10%', display: 'table-cell' }}>
        <BlogNav />
      </div>
      <div style={{ width: '90%', display: 'table-cell' }}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BlogAppRoutes setMenuContent={setMenuContent} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

function BlogAppRoutes({ setMenuContent }) {
  return (
    <Routes>
      <Route path="/" element={<BlogAllScreen setMenuContent={setMenuContent} />} />
      <Route path="/you" element={<BlogYouScreen setMenuContent={setMenuContent} />} />
      <Route path="/favorite" element={<BlogFavoriteScreen setMenuContent={setMenuContent} />} />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export {BlogApp, BlogHiddenMenuScreen}
