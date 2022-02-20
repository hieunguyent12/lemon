import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box,
  createStyles,
} from "@mantine/core";
import { useState } from "react";

const AppLayout: React.FC = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

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
            marginTop: "70px",
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
            <p>Nav</p>
          </Navbar>
        </MediaQuery>
      }
      header={
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Header height={70} padding="md" fixed zIndex={9999999999}>
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

export default AppLayout;
