import {
  createStyles,
  Group,
  Text,
  useMantineTheme,
  Menu,
  Box,
} from "@mantine/core";
import { DotsHorizontalIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { DropdownMenu } from "../menu/DropdownMenu";
import { useDropdownMenu } from "../../hooks/useDropdownMenu";

const useStyles = createStyles((theme) => ({
  item: {
    boxSizing: "border-box",
    display: "block",
    width: "100%",
    height: "50px",
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
  menuContent?: React.ReactNode;
};

const ClassListItem: React.FC<Props> = ({
  children,
  icon,
  onClick,
  isSelected,
  leftIcon,
  rightIcon,
  menuContent,
  hasMenu = false,
}) => {
  const [hovered, setHovered] = useState(false);
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

        {hasMenu && renderDropdownMenu()}
      </Group>
    );
  };

  const renderDropdownMenu = () => {
    return (
      <>
        <Box
          ref={setRefs}
          style={{
            // use visibility instead of display because using display will mess with the size of the parent element for some reason.
            visibility: hovered ? "visible" : "hidden",
            boxSizing: "border-box",
            position: "relative",
            borderRadius: "3px",
            padding: "1px 5px 1px 5px",
            display: "block",
            height: "26px",
            width: "26px",
          }}
          sx={(theme) => ({
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[1],
            },
          })}
          onClick={(e: any) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >
          <DotsHorizontalIcon />

          {showMenu && (
            <DropdownMenu
              ref={setPopperElement}
              style={{
                ...popperStyles.popper,
                zIndex: "9999999",
              }}
              {...attributes.popper}
            >
              {menuContent}
            </DropdownMenu>
          )}
        </Box>
      </>
    );
  };

  return (
    <Box
      className={styles.item}
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        // boxSizing: "border-box",
        // maxHeight: "45px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        if (!showMenu) {
          setHovered(false);
        }
      }}
    >
      {renderContent()}
    </Box>
  );
};
export default ClassListItem;
