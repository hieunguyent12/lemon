import React from "react";
import { motion, MotionProps } from "framer-motion";
// import SettingsIcon from "../../apps/web/src/icons/Settings";

export type AvatarMenuProps = {} & React.HTMLAttributes<HTMLDivElement> &
  MotionProps;
export type AvatarMenuItemProps = {};

export const AvatarMenuItem: React.FC<AvatarMenuItemProps> = () => {
  return null;
};

export const AvatarMenu: React.FC<AvatarMenuProps> = ({
  className,
  ...props
}) => {
  return (
    <>
      <motion.div
        initial={{
          x: -20,
        }}
        animate={{
          x: 0,
        }}
        className={`${className} flex flex-col rounded border border-gray-200 shadow-lg`}
        style={{
          width: "150px",
          maxWidth: "150px",
          bottom: "-60px",
          left: "0px",
        }}
        {...props}
      >
        <span className="flex items-center text-gray-500 py-1 px-2 cursor-pointer hover:bg-gray-100">
          {/* <SettingsIcon className="opacity-75 " /> */}
          <span className="ml-2 text-sm">Settings</span>
        </span>

        <span className="flex items-center text-gray-500 py-1 px-2 cursor-pointer hover:bg-gray-100">
          {/* <SettingsIcon className="opacity-75 text-sm" /> */}
          <span className="ml-2 text-sm">Item 2</span>
        </span>
      </motion.div>
    </>
  );
};
