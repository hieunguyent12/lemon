import { ComponentStory, ComponentMeta } from "@storybook/react";
import Select from "react-select";

import { Header } from "../Header.stories";
import { StudentGradeListItem } from "../../components/list/StudentGradeListItem";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import LeftArrow from "../../icons/LeftArrow";

const options = [
  { value: "1", label: "AP Lang" },
  { value: "2", label: "Pre-Calc Honors" },
  { value: "3", label: "Weight training 3" },
];

function AssignmentDetailScreen({ students }: any) {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center mt-5">
        <Button
          variant="accent"
          size="small"
          className="mb-2 w-48 relative "
          icon={<LeftArrow className="text-muted" />}
          style={{
            right: "20px",
          }}
        >
          View all assignments
        </Button>
        <Select options={options} defaultValue={options[0]} />
      </div>
      <div className="flex justify-between items-center mt-5 mb-2">
        <p className="text-xs text-muted">STUDENTS GRADES</p>
        <Input placeholder="Search" size="small" />
      </div>
      {students.map((student: any) => (
        <StudentGradeListItem {...student} />
      ))}
    </div>
  );
}

export default {
  title: "Screens/Assignment Detail Screen",
  component: AssignmentDetailScreen,
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
} as ComponentMeta<typeof AssignmentDetailScreen>;

const Template: ComponentStory<typeof AssignmentDetailScreen> = (args) => (
  <AssignmentDetailScreen {...args} />
);

export const TeacherPOV = Template.bind({});

TeacherPOV.args = {
  students: [
    {
      studentName: "Hieu Nguyen",
      grade: 90,
    },

    {
      studentName: "John Doe",
      grade: 50,
    },
    {
      studentName: "Kevin Wang",
      grade: null,
    },
    {
      studentName: "Justin Thomas",
      grade: 78,
    },
  ],
};
