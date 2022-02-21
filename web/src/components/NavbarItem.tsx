import {
  UnstyledButton,
  createStyles,
  Group,
  ThemeIcon,
  Text,
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
};

const NavbarItem: React.FC<Props> = ({ children, icon }) => {
  const { classes: styles } = useStyles();

  return (
    <UnstyledButton className={styles.button}>
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
