import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Header } from "../Header.stories";
import { StudentListItem } from "../../components/list/StudentListItem";
import { TeacherClassView, StudentClassView } from "../ClassListItem.stories";
import { Input } from "../../components/Input";

function StudentsScreen({ students }: any) {
  return (
    <div>
      <Header />
      <div className="flex justify-between items-center mt-5 mb-2">
        <p className="text-xs text-muted">MY STUDENTS</p>
        <Input placeholder="Search" size="small" />
      </div>
      {students.map((student: any) => (
        <StudentListItem {...student} />
      ))}
    </div>
  );
}

export default {
  title: "Screens/Students Screen",
  component: StudentsScreen,
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
} as ComponentMeta<typeof StudentsScreen>;

const Template: ComponentStory<typeof StudentsScreen> = (args) => (
  <StudentsScreen {...args} />
);

export const TeacherPOV = Template.bind({});

TeacherPOV.args = {
  students: [
    {
      studentName: "Hieu Nguyen",
      grade: 90,
      email: "426365@ecsd.me",
    },
    {
      studentName: "John Doe",
      grade: null,
      email: "123445@ecsd.me",
    },
    {
      studentName: "John Cena",
      grade: 50,
      email: "123131@ecsd.me",
    },
  ],
};
