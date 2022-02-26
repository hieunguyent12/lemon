import { Menu } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import { ModalType } from "../AppContainer";

type Props = {
  control: any;
  menuClasses?: Record<"root", string>;
  menuOpened: boolean;
  setMenuOpened: Dispatch<SetStateAction<boolean>>;
  role: "student" | "teacher";
  onOpenModal: (type: ModalType) => void;
};

const ActionMenu: React.FC<Props> = ({
  control,
  menuClasses,
  menuOpened,
  setMenuOpened,
  role,
  onOpenModal,
}) => {
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
          <Menu.Item key="1" onClick={() => onOpenModal("class")}>
            New class
          </Menu.Item>,
          <Menu.Item key="2" onClick={() => onOpenModal("assignment")}>
            New assignment
          </Menu.Item>,
        ]
      )}
    </Menu>
  );
};

export default ActionMenu;
