import { ComponentStory, ComponentMeta } from "@storybook/react";
import Select from "react-select";

import { AssignmentListItem } from "../../components/list/AssignmentListItem";
import {
  TeacherAssignmentView,
  StudentAssignmentView,
} from "../AssignmentListItem.stories";
import { Input } from "../../components/Input";
import { MySidebar } from "../Sidebar.stories";

const options = [
  { value: "1", label: "AP Lang" },
  { value: "2", label: "Pre-Calc Honors" },
  { value: "3", label: "Weight training 3" },
];

function AssignmentsScreen({ assignments }: any) {
  return (
    <div>
      <div className="flex flex-col mt-5">
        <Select options={options} defaultValue={options[0]} />
      </div>
      <div className="flex justify-between items-center mt-5 mb-2">
        <p className="text-xs text-muted">MY ASSIGNMENTS</p>
        <Input placeholder="Search" size="small" />
      </div>
      {assignments.map((assignment: any) => (
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
        <MySidebar />
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
  assignments: [
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
  assignments: [
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
