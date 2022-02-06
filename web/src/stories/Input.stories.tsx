import { Input, InputProps } from "../ui/Input";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  Component: Input,
  title: "Input",
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const TextInput = Template.bind({});

TextInput.args = {
  placeholder: "placeholder",
  inputType: "text",
} as InputProps;

TextInput.argTypes = {
  placeholder: {
    control: {
      type: "text",
    },
  },
  inputType: {
    options: ["text", "password"],
    control: {
      type: "radio",
    },
  },
};
