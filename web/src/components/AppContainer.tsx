import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Divider,
  Button,
  Menu,
  createStyles,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Session } from "next-auth";
import { PlusIcon } from "@modulz/radix-icons";

import NavbarItem from "./NavbarItem";
import { Query } from "../graphql/generated";
import ClassList from "./class/ClassList";
import ActionMenu from "./ActionMenu";

type Props = {
  children: React.ReactNode;
  session: Session;
};

const GET_CLASSES = gql`
  query Classes {
    classes {
      id
      name
    }
  }
`;

const useMenuStyles = createStyles((theme) => ({
  root: {
    width: "100%",
  },
  track: {
    width: "100%",
  },
}));

const AppContainer: React.FC<Props> = ({ children, session }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { classes: menuClasses } = useMenuStyles();
  const { data, error, loading } = useQuery<Query>(GET_CLASSES);

  const onNewClass = () => {
    console.log("new class");
  };

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <MediaQuery
          smallerThan="sm"
          styles={{
            boxSizing: "border-box",
            paddingTop: "80px",
            position: "fixed",
          }}
        >
          <Navbar
            padding="md"
            // Breakpoint at which navbar will be hidden if hidden prop is true
            hiddenBreakpoint="sm"
            // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
            hidden={!opened}
            // when viewport size is less than theme.breakpoints.sm navbar width is 100%
            // viewport size > theme.breakpoints.sm – width is 300px
            // viewport size > theme.breakpoints.lg – width is 400px
            width={{ sm: 300, lg: 400 }}
          >
            {loading && <p>Loading...</p>}
            {error && <p>Error...</p>}

            <Navbar.Section mb={10}>
              <ActionMenu
                control={
                  <Button
                    fullWidth
                    leftIcon={<PlusIcon />}
                    variant="gradient"
                    gradient={{ from: "grape", to: "pink", deg: 35 }}
                    onClick={() => setMenuOpened(!menuOpened)}
                  >
                    New
                  </Button>
                }
                menuClasses={menuClasses}
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
                role={session.role}
                onNewClass={onNewClass}
              />
            </Navbar.Section>
            <Navbar.Section grow>
              <ClassList classes={data?.classes} />
            </Navbar.Section>
            <Divider />
            <Navbar.Section>
              <NavbarItem>{session.user?.name}</NavbarItem>
            </Navbar.Section>
          </Navbar>
        </MediaQuery>
      }
      header={
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Header height={50} padding="md" fixed zIndex={9999999999}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              {/* <MediaQuery largerThan="sm" styles={{ display: "none" }}> */}
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
              {/* </MediaQuery> */}
            </div>
          </Header>
        </MediaQuery>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <MediaQuery
        smallerThan="sm"
        styles={{
          marginTop: "70px",
        }}
      >
        <Text>Resize app to see responsive navbar in action</Text>
      </MediaQuery>
    </AppShell>
  );
};

export default AppContainer;
