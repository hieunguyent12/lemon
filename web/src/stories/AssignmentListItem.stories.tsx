import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AssignmentListItem } from "../ui/list/AssignmentListItem";

export default {
  component: AssignmentListItem,
  title: "List/Assignment List Item",
} as ComponentMeta<typeof AssignmentListItem>;

const Template: ComponentStory<typeof AssignmentListItem> = (args) => (
  <AssignmentListItem {...args} />
);

export const TeacherAssignmentView = Template.bind({});

TeacherAssignmentView.args = {
  isTeacher: true,
  assignmentName: "Synthesis Essay",
};

export const StudentAssignmentView = Template.bind({});

StudentAssignmentView.args = {
  isTeacher: false,
  assignmentName: "Synthesis Essay",
  grade: 90,
};
