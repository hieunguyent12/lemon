import React from "react";
import { useMediaQuery } from "react-responsive";

export type SidebarProps = {};
export type SidebarItemProps = {};

export const SidebarItem: React.FC<SidebarItemProps> = ({ children }) => {
  return <div>{children}</div>;
};

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-14 flex flex-col items-center
  bg-white dark:bg-gray-900 shadow-md py-5"
    >
      {children}
    </div>
  );
};
