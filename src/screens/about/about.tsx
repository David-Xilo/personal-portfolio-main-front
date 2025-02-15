import * as React from 'react'
import {useEffect} from 'react'
import {MainMenuProps, SET_SUB_NAV, SubMenuProps} from '../../reducers/sub-menu-reducer'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorFallback} from 'components/error/error-fallback'
import {SubNavLink} from '../navigation/navigation'
import {Route, Routes} from 'react-router-dom'
import {NotFoundScreen} from 'components/error/not-found'
import {AboutIntroScreen} from './about-intro'
import {AboutContactsScreen} from './about-contacts'
import {
  MenuTableCell,
  MenuTable,
} from 'components/menu/menu-display'
import {SubMenuList, SubMenuListItem, SubMenuNavigation} from '../navigation/nav-commons'

const AboutApp: React.FC<MainMenuProps> = ({subMenuDispatch, hiddenMenuDispatch}) => {
  useEffect(() => {
    subMenuDispatch({type: SET_SUB_NAV, component: AboutNav})
  }, [subMenuDispatch])

  return (
    <MenuTable>
      <MenuTableCell>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AboutAppRoutes hiddenMenuDispatch={hiddenMenuDispatch} />
        </ErrorBoundary>
      </MenuTableCell>
    </MenuTable>
  )
}

const AboutNav: React.FC = () => {
  return (
    <SubMenuNavigation>
      <SubMenuList>
        <SubMenuListItem>
          <SubNavLink to={'/about'}>Introduction</SubNavLink>
        </SubMenuListItem>
        <SubMenuListItem>
          <SubNavLink to={'/about/contact'}>Contacts</SubNavLink>
        </SubMenuListItem>
      </SubMenuList>
    </SubMenuNavigation>
  )
}

const AboutAppRoutes: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<AboutIntroScreen hiddenMenuDispatch={hiddenMenuDispatch} />}
      />
      <Route
        path="/contact"
        element={
          <AboutContactsScreen hiddenMenuDispatch={hiddenMenuDispatch} />
        }
      />
      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {AboutApp}
