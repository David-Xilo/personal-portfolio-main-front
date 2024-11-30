import * as React from 'react'

interface MenuTableProps {
  children: React.ReactNode;
}

const MenuTable: React.FC<MenuTableProps> = ({ children }) => {
  return (
    <div className="table w-full">
      {children}
      </div>
  );
};

const MenuTableCell: React.FC<MenuTableProps> = ({ children }) => {
  return (
    <div className="table-cell w-[90%]">
      {children}
      </div>
  );
};

export { MenuTable, MenuTableCell };