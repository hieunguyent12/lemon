import { Session } from "next-auth";
import { useQuery, gql } from "@apollo/client";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";

import { Query } from "../graphql/generated";
import { PageComponent } from "../types";
import ClassList from "../components/class/ClassList";

type Props = {
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

const Home: PageComponent<Props> = ({ session }) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  if (!session.userId) return null;

  const { loading, error, data } = useQuery<Query>(GET_CLASSES);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
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
          <ClassList classes={data?.classes} />
        </Navbar>
      }
      header={
        // <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Header height={70} padding="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
        // </MediaQuery>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
};

Home.auth = true;

export default Home;
