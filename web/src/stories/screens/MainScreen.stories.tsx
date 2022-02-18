import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useMediaQuery } from "react-responsive";

import { ClassListItem } from "../../components/list/ClassListItem";
import { TeacherClassView, StudentClassView } from "../ClassListItem.stories";
import { Input } from "../../components/Input";
import { MySidebar } from "../Sidebar.stories";
import { Topbar, TopbarItem } from "../../components/Topbar";
import { AvatarPlaceholder } from "../../components/AvatarPlaceholder";
import HomeIcon from "../../icons/HomeIcon";
import PlusIcon from "../../icons/PlusIcon";
import { Menubar, MenubarItem } from "../../components/Menubar";
import { useDropdownMenu } from "../../hooks/useDropdownMenu";
import { DropdownMenu, DropdownMenuItem } from "../../components/DropdownMenu";

function MainScreen({ classes }: any) {
  const [showMenu, setShowMenu] = useState(false);

  const { setRefs, setPopperElement, styles, attributes } = useDropdownMenu({
    outsideClickCallback: () => setShowMenu(false),
    menuPlacement: "right-start",
  });

  return (
    <div className="w-11/12 sm:max-w-mainContent sm:ml-12">
      <Menubar>
        {(isMobile) => (
          <>
            <MenubarItem>
              <AvatarPlaceholder />
            </MenubarItem>
            <MenubarItem
              className={
                isMobile
                  ? "flex items-center text-muted"
                  : "flex flex-col items-center justify-center text-muted"
              }
              style={{
                marginTop: isMobile ? "0px" : "200px",
              }}
            >
              <HomeIcon className="mr-4 sm:mr-0 opacity-70 hover:opacity-100 cursor-pointer" />
              <div
                className="sm:mt-6"
                ref={setRefs}
                onClick={() => setShowMenu(!showMenu)}
              >
                <PlusIcon className="opacity-70 hover:opacity-100 cursor-pointer" />
                {showMenu && (
                  <DropdownMenu
                    ref={setPopperElement}
                    style={{
                      ...styles.popper,
                      width: "75px",
                      maxWidth: "75px",
                    }}
                    {...attributes.popper}
                  >
                    <DropdownMenuItem>Action 1</DropdownMenuItem>
                    <DropdownMenuItem>Action 2</DropdownMenuItem>
                  </DropdownMenu>
                )}
              </div>
            </MenubarItem>
          </>
        )}
      </Menubar>
      <div className="flex justify-between items-center mt-5 mb-2">
        <p className="text-muted select-none">MY CLASSES</p>
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
