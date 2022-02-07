import React, { useState, useRef } from "react";
import { usePopper } from "react-popper";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { DropdownMenu, DropdownMenuItem } from "./DropdownMenu";

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
  const [showMenu, setShowMenu] = useState(false);
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 5],
        },
      },
    ],
  });
  const popperRef = useRef<any>();

  useOutsideClick(popperRef, () => setShowMenu(false));

  const placeholderAvatar = (
    <div className="rounded-full bg-muted w-8 h-8 mr-2"></div>
  );

  return (
    <div
      className="flex items-center w-max relative right-2 p-2 select-none transition duration-200 ease-in-out hover:bg-gray-100 rounded cursor-pointer z-10"
      ref={(ref) => {
        setReferenceElement(ref);
        popperRef.current = ref;
      }}
      onClick={() => setShowMenu(!showMenu)}
      {...props}
    >
      {avatar ? avatar : placeholderAvatar}
      {name}
      {children}

      {showMenu && (
        <DropdownMenu
          ref={setPopperElement}
          style={{ ...styles.popper, width: "150px", maxWidth: "150px" }}
          {...attributes.popper}
        >
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenu>
      )}
    </div>
  );
};
