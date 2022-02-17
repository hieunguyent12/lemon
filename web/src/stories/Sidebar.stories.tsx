import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Sidebar, SidebarItem } from "../ui/Sidebar";
import { AvatarPlaceholder } from "../ui/AvatarPlaceholder";
import HomeIcon from "../icons/HomeIcon";
import PlusIcon from "../icons/PlusIcon";

export default {
  title: "Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Sidebar {...args}>
    <SidebarItem>
      <AvatarPlaceholder />
      <div
        className="flex flex-col items-center justify-center text-muted "
        style={{
          marginTop: "200px",
        }}
      >
        <HomeIcon />
        <PlusIcon className="mt-6" />
      </div>
    </SidebarItem>
  </Sidebar>
);

export const MySidebar = Template.bind({});
