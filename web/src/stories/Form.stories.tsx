import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button, ButtonProps } from "../ui/Button";
import { Input, InputProps } from "../ui/Input";

function Form() {
  return (
    <div className="w-60">
      <div className="flex flex-col w-full">
        <Input placeholder="placeholder 1" className="mb-2" />
        <Input placeholder="placeholder 2" className="mb-2" />
      </div>
      <Button variant="primary" size="regular" className="w-full">
        Submit
      </Button>
    </div>
  );
}

export default {
  Component: Form,
  title: "Form",
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Form> = (args) => <Form />;

export const MyForm = Template.bind({});
