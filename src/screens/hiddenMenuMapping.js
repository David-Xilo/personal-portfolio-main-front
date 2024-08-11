import {BlogHiddenMenuScreen} from './blog'


const menuMapping = {
  '/blog/*': BlogHiddenMenuScreen
};

// Helper function to find the matching component
function findMenuComponent(pathname) {
  // Check for an exact match first
  if (menuMapping[pathname]) {
    return menuMapping[pathname];
  }

  // Check for wildcard matches
  for (let route in menuMapping) {
    if (route.includes('*')) {
      const baseRoute = route.replace('*', '');
      if (pathname.startsWith(baseRoute)) {
        return menuMapping[route];
      }
    }
  }

  // Return null if no match found
  return null;
}

export {findMenuComponent};