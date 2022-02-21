import { Menu } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

type Props = {
  control: any;
  menuClasses: Record<"root" | "track", string>;
  menuOpened: boolean;
  setMenuOpened: Dispatch<SetStateAction<boolean>>;
  role: "student" | "teacher";
  onNewClass: () => void;
};

const ActionMenu: React.FC<Props> = ({
  control,
  menuClasses,
  menuOpened,
  setMenuOpened,
  role,
  onNewClass,
}) => {
  console.log(role);
  return (
    <Menu
      control={control}
      classNames={menuClasses}
      size="auto"
      opened={menuOpened}
      onOpen={() => setMenuOpened(true)}
      onClose={() => setMenuOpened(false)}
      placement="center"
    >
      <Menu.Label>Menu</Menu.Label>
      {role === "student" ? (
        <Menu.Item>Join class</Menu.Item>
      ) : (
        [
          <Menu.Item key="1" onClick={onNewClass}>
            New class
          </Menu.Item>,
          <Menu.Item key="2">New assignment</Menu.Item>,
        ]
      )}
    </Menu>
  );
};

export default ActionMenu;
