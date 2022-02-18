import React from "react";

export type AvatarPlaceholderProps = {};

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = () => {
  return <div className="rounded-full bg-muted w-8 h-8"></div>;
};
