import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AvatarHeader } from "../ui/AvatarHeader";
import { Button } from "../ui/Button";

export function Header() {
  return (
    <div
      className="flex justify-between items-center"
      style={{
        width: "500px",
        maxWidth: "500px",
      }}
    >
      <AvatarHeader name="Hieu Nguyen" />
      <Button variant="primary" size="small">
        New
      </Button>
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

export const MyHeader = HeaderTemplate.bind({});
