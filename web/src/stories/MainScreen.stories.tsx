import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Header } from "./Header.stories";
import { ClassListItem } from "../ui/list/ClassListItem";
import { TeacherClassView, StudentClassView } from "./ClassListItem.stories";
import { Input } from "../ui/Input";

function MainScreen({ classes }: any) {
  return (
    <div>
      <Header />
      <div className="flex justify-between items-center mt-5 mb-2">
        <p className="text-xs text-muted">MY CLASSES</p>
        <Input placeholder="Search" size="small" />
      </div>
      {classes.map((classItem: any) => (
        <ClassListItem {...classItem} />
      ))}
    </div>
  );
}

export default {
  title: "Screens/Main Screen",
  component: MainScreen,
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
} as ComponentMeta<typeof MainScreen>;

const Template: ComponentStory<typeof MainScreen> = (args) => (
  <MainScreen {...args} />
);

export const TeacherPOV = Template.bind({});

TeacherPOV.args = {
  classes: [
    {
      ...TeacherClassView.args,
    },
    {
      ...TeacherClassView.args,
      _className: "AP ENG LANG & COMP",
    },
    {
      ...TeacherClassView.args,
    },
  ],
};

export const StudentPOV = Template.bind({});

StudentPOV.args = {
  classes: [
    {
      ...StudentClassView.args,
    },
    {
      ...StudentClassView.args,
    },
    {
      ...StudentClassView.args,
    },
  ],
};
