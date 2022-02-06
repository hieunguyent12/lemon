import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AvatarMenu } from "../ui/AvatarMenu";

export default {
  component: AvatarMenu,
  title: "AvatarMenu",
} as ComponentMeta<typeof AvatarMenu>;

const Template: ComponentStory<typeof AvatarMenu> = (args) => (
  <AvatarMenu {...args} />
);

export const MyAvatarMenu = Template.bind({});
