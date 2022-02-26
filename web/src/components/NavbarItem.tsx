import {
  UnstyledButton,
  createStyles,
  Group,
  ActionIcon,
  Text,
  useMantineTheme,
  Menu,
  Box,
  Popover,
} from "@mantine/core";
import { DotsHorizontalIcon, TrashIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { DropdownMenu, DropdownMenuItem } from "./menu/DropdownMenu";
import { useDropdownMenu } from "../hooks/useDropdownMenu";

const useStyles = createStyles((theme) => ({
  button: {
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    cursor: "pointer",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

type Props = {
  icon?: React.ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  hasMenu?: boolean;
};

const NavbarItem: React.FC<Props> = ({
  children,
  icon,
  onClick,
  isSelected,
  leftIcon,
  rightIcon,
  hasMenu = false,
}) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {
    setRefs,
    setPopperElement,
    styles: popperStyles,
    attributes,
  } = useDropdownMenu({
    outsideClickCallback: () => setShowMenu(false),
  });

  const theme = useMantineTheme();
  const { classes: styles } = useStyles();
  const bgColor = isSelected
    ? theme.colorScheme === "dark"
      ? theme.colors.dark[6]
      : theme.colors.gray[0]
    : undefined;

  const renderContent = () => {
    return (
      <Group>
        <Text
          size="sm"
          style={{
            flex: 1,
          }}
        >
          {children}
        </Text>

        {hasMenu && (
          <>
            <div
              ref={setRefs}
              style={{
                position: "relative",
              }}
            >
              <DotsHorizontalIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
              />
            </div>
            {showMenu && (
              <DropdownMenu
                ref={setPopperElement}
                style={{
                  ...popperStyles.popper,
                  // width: "75px",
                  // maxWidth: "75px",
                  zIndex: "9999999",
                }}
                {...attributes.popper}
              >
                <DropdownMenuItem icon={<TrashIcon />}>
                  Action 1
                </DropdownMenuItem>
                <DropdownMenuItem>Action 2</DropdownMenuItem>
              </DropdownMenu>
            )}
          </>
        )}
      </Group>
    );
  };

  return (
    <Box
      className={styles.button}
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
      }}
    >
      {renderContent()}
    </Box>
  );
};
export default NavbarItem;
