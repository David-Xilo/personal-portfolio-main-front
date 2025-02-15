import * as React from 'react'

interface MenuTableProps {
  children: React.ReactNode;
}

const MenuTable: React.FC<MenuTableProps> = ({ children }) => {
  return (
    <div className="menu-table">
      {children}
      </div>
  );
};

const MenuTableCell: React.FC<MenuTableProps> = ({ children }) => {
  return (
    <div className="menu-table-cell">
      {children}
      </div>
  );
};

export { MenuTable, MenuTableCell };