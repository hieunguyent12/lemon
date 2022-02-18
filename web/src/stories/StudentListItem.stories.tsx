import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StudentListItem } from "../components/list/StudentListItem";

export default {
  component: StudentListItem,
  title: "List/Student List Item",
} as ComponentMeta<typeof StudentListItem>;

const Template: ComponentStory<typeof StudentListItem> = (args) => (
  <StudentListItem {...args} />
);

export const StudentListItemView = Template.bind({});

StudentListItemView.args = {
  studentName: "Hieu Nguyen",
  grade: 90,
  email: "426365@ecsd.me",
};
