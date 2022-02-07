import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ClassListItem } from "../ui/list/ClassListItem";

export default {
  component: ClassListItem,
  title: "List/Class List Item",
} as ComponentMeta<typeof ClassListItem>;

const Template: ComponentStory<typeof ClassListItem> = (args) => (
  <ClassListItem {...args} />
);

export const TeacherClassView = Template.bind({});

TeacherClassView.args = {
  isTeacher: true,
  _className: "Pre-Cal Honors",
  studentCount: 15,
  period: 7,
  roomNumber: 104,
};

export const StudentClassView = Template.bind({});

StudentClassView.args = {
  isTeacher: false,
  _className: "Pre-Cal Honors",
  period: 7,
  roomNumber: 104,
  grade: 90,
  teacherName: "Mr. Eshelman",
};
