import styled from '@emotion/styled/macro';

// Styled components
const StyledSubMenuNavigationNav = styled.nav`
  background-color: #f0f2f5; // Light gray background
  padding: 20px; // Padding around the navigation
  border-radius: 8px; // Rounded corners
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); // Subtle shadow
`;

const StyledSubMenuNavigationUl = styled.ul`
  list-style: none;
  margin: 0; // Removes default margin
  padding: 0; // Removes default padding
`;

const StyledSubMenuNavigationLi = styled.li`
  margin-bottom: 10px; // Space between items
`;


export { StyledSubMenuNavigationNav, StyledSubMenuNavigationUl, StyledSubMenuNavigationLi }
