import React from "react";
import { useMediaQuery } from "react-responsive";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export type MenubarProps = {
  children: (isMobile: boolean) => React.ReactNode;
};
export type MenubarItemProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const MenubarItem: React.FC<MenubarItemProps> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};

export const Menubar: React.FC<MenubarProps> = ({ children }) => {
  // bigScreen = not mobile
  // anything less is mobile
  const bigScreen = useMediaQuery({ query: "(min-width: 640px)" });

  if (bigScreen) {
    return <Sidebar>{children(!bigScreen)}</Sidebar>;
  } else {
    // If screen is small, we want to render the menubar on top
    return <Topbar>{children(!bigScreen)}</Topbar>;
  }
};
