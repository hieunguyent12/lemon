import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button, ButtonProps } from "../components/Button";

export default {
  component: Button,
  title: "Button",
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.variant}</Button>
);

export const Primary = Template.bind({});

Primary.args = {
  variant: "primary",
};

Primary.argTypes = {
  variant: {
    options: ["primary", "secondary"],
    control: {
      type: "radio",
    },
  },
  disabled: {
    control: {
      type: "boolean",
    },
  },
  size: {
    options: ["regular", "small"],
    control: {
      type: "radio",
    },
  },
};
