import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AvatarHeader } from "../ui/AvatarHeader";
import { AvatarMenu } from "../ui/AvatarMenu";
import { OutsideAlerter } from "../hooks/useOutsideAlert";

function AvatarHeaderWithMenu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      <OutsideAlerter callback={() => setShowMenu(false)}>
        <AvatarHeader
          name="Hieu Nguyen"
          id="avatarHeader"
          onClick={() => {
            if (showMenu) {
              setShowMenu(false);
            } else {
              setShowMenu(true);
            }
          }}
        >
          {showMenu && (
            <AvatarMenu
              className="mt-1 absolute"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </AvatarHeader>
      </OutsideAlerter>
    </div>
  );
}

export default {
  component: AvatarHeaderWithMenu,
  title: "AvatarHeaderWithMenu",
};

const Template: ComponentStory<typeof AvatarHeaderWithMenu> = (args) => (
  <AvatarHeaderWithMenu />
);

export const MyAvatarHeaderWithMenu = Template.bind({});
