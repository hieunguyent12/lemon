import React from "react";

export type AvatarHeaderProps = {
  avatar?: React.ReactNode;
  name: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const AvatarHeader: React.FC<AvatarHeaderProps> = ({
  avatar,
  name,
  children,
  ...props
}) => {
  const placeholderAvatar = (
    <div className="rounded-full bg-blue-400 w-8 h-8 mr-2"></div>
  );

  return (
    <div
      className="flex relative items-center w-max p-2 select-none transition duration-200 ease-in-out hover:bg-gray-100 rounded cursor-pointer z-10"
      {...props}
    >
      {avatar ? avatar : placeholderAvatar}
      {name}
      {children}
    </div>
  );
};
