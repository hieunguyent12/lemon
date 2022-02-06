import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ListItem } from "../ui/ListItem";

export default {
  component: ListItem,
  title: "List Item",
} as ComponentMeta<typeof ListItem>;

const Template: ComponentStory<typeof ListItem> = (args) => (
  <ListItem {...args} />
);

export const TeacherView = Template.bind({});

TeacherView.args = {
  isTeacher: true,
  _className: "Pre-Cal Honors",
  studentCount: 15,
  period: 7,
  roomNumber: 104,
};

export const StudentView = Template.bind({});

StudentView.args = {
  isTeacher: false,
  _className: "Pre-Cal Honors",
  period: 7,
  roomNumber: 104,
  grade: 90,
  teacherName: "Mr. Eshelman",
};
