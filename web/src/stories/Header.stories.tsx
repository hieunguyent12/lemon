import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState, useRef } from "react";
import { usePopper } from "react-popper";

import { AvatarHeader } from "../ui/AvatarHeader";
import { Button } from "../ui/Button";
import { DropdownMenu, DropdownMenuItem } from "../ui/DropdownMenu";
import { useOutsideClick } from "../hooks/useOutsideClick";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [-12, 5],
        },
      },
    ],
  });
  const popperRef = useRef<any>();

  useOutsideClick(popperRef, () => setShowMenu(false));

  return (
    <div
      className="flex justify-between items-center"
      style={{
        width: "500px",
        maxWidth: "500px",
      }}
    >
      <AvatarHeader name="Hieu Nguyen" />
      <div
        ref={(ref) => {
          setReferenceElement(ref);
          popperRef.current = ref;
        }}
        className="relative"
      >
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
