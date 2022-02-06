import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AvatarHeader, AvatarHeaderProps } from "../ui/AvatarHeader";

export default {
  component: AvatarHeader,
  title: "AvatarHeader",
} as ComponentMeta<typeof AvatarHeader>;

const Template: ComponentStory<typeof AvatarHeader> = (args) => (
  <AvatarHeader {...args} />
);

export const MyAvatarHeader = Template.bind({});

MyAvatarHeader.args = {
  name: "Hieu Nguyen",
} as AvatarHeaderProps;

MyAvatarHeader.argTypes = {
  name: {
    control: {
      type: "text",
    },
  },
};
