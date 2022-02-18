import React from "react";
import { useMediaQuery } from "react-responsive";

export type TopbarProps = {};
export type TopbarItemProps = {};

export const TopbarItem: React.FC<TopbarItemProps> = ({ children }) => {
  return <div>{children}</div>;
};

export const Topbar: React.FC<TopbarProps> = ({ children }) => {
  return <div className="flex justify-between w-full">{children}</div>;
};
