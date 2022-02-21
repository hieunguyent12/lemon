import {
  UnstyledButton,
  createStyles,
  Group,
  ThemeIcon,
  Text,
  useMantineTheme,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  button: {
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

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
};

const NavbarItem: React.FC<Props> = ({
  children,
  icon,
  onClick,
  isSelected,
}) => {
  const theme = useMantineTheme();
  const { classes: styles } = useStyles();

  return (
    <UnstyledButton
      className={styles.button}
      onClick={onClick}
      style={{
        backgroundColor: isSelected
          ? theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0]
          : undefined,
      }}
    >
      {icon ? (
        <Group>
          <ThemeIcon color={"blue"} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{children}</Text>
        </Group>
      ) : (
        children
      )}
    </UnstyledButton>
  );
};
export default NavbarItem;
