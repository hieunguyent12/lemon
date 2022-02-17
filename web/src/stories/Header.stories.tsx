import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState, useRef } from "react";
import { usePopper } from "react-popper";

import { AvatarHeader } from "../ui/AvatarHeader";
import { Button } from "../ui/Button";
import { DropdownMenu, DropdownMenuItem } from "../ui/DropdownMenu";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useDropdownMenu } from "../hooks/useDropdownMenu";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { setRefs, setPopperElement, styles, attributes } = useDropdownMenu({
    outsideClickCallback: () => setShowMenu(false),
  });

  return (
    <div
      className="flex justify-between items-center"
      style={{
        width: "500px",
        maxWidth: "500px",
      }}
    >
      <AvatarHeader name="Hieu Nguyen" />
      <div ref={setRefs} className="relative">
        <Button
          variant="primary"
          size="small"
          onClick={() => setShowMenu(!showMenu)}
        >
          New
        </Button>

        {showMenu && (
          <DropdownMenu
            ref={setPopperElement}
            style={{ ...styles.popper, width: "75px", maxWidth: "75px" }}
            {...attributes.popper}
          >
            <DropdownMenuItem>Action 1</DropdownMenuItem>
            <DropdownMenuItem>Action 2</DropdownMenuItem>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default {
  title: "Header",
  component: Header,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Header>;

const HeaderTemplate: ComponentStory<typeof Header> = (args) => {
  return <Header />;
};

// export const MyHeader = HeaderTemplate.bind({});
