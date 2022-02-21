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

const Home: PageComponent<Props> = ({ session }) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  if (!session.userId) return null;
  return <p>Home</p>;
};

Home.auth = true;

export default Home;
