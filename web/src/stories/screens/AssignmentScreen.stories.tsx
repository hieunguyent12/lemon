import { ComponentStory, ComponentMeta } from "@storybook/react";
import Select from "react-select";

import { Header } from "../Header.stories";
import { AssignmentListItem } from "../../ui/list/AssignmentListItem";
import {
  TeacherAssignmentView,
  StudentAssignmentView,
} from "../AssignmentListItem.stories";
import { Input } from "../../ui/Input";

const options = [
  { value: "1", label: "AP Lang" },
  { value: "2", label: "Pre-Calc Honors" },
  { value: "3", label: "Weight training 3" },
];

function AssignmentsScreen({ classes }: any) {
  return (
    <div>
      <Header />
      <div className="flex items-center mt-5">
        <Select options={options} defaultValue={options[0]} />
      </div>
      <div className="flex justify-between items-center mt-5 mb-2">
        <p className="text-xs text-muted">MY ASSIGNMENTS</p>
        <Input placeholder="Search" size="small" />
      </div>
      {classes.map((assignment: any) => (
        <AssignmentListItem {...assignment} />
      ))}
    </div>
  );
}

export default {
  title: "Screens/Assignments Screen",
  component: AssignmentsScreen,
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
} as ComponentMeta<typeof AssignmentsScreen>;

const Template: ComponentStory<typeof AssignmentsScreen> = (args) => (
  <AssignmentsScreen {...args} />
);

export const TeacherPOV = Template.bind({});

TeacherPOV.args = {
  classes: [
    {
      ...TeacherAssignmentView.args,
    },
    {
      ...TeacherAssignmentView.args,
      _className: "AP ENG LANG & COMP",
    },
    {
      ...TeacherAssignmentView.args,
    },
  ],
};

export const StudentPOV = Template.bind({});

StudentPOV.args = {
  classes: [
    {
      ...StudentAssignmentView.args,
    },
    {
      ...StudentAssignmentView.args,
    },
    {
      ...StudentAssignmentView.args,
    },
  ],
};
