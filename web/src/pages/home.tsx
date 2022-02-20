import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import { PageComponent } from "../types";

type Props = {
  session: Session;
};

const Home: PageComponent<Props> = ({ session }) => {
  return <h1>Home!</h1>;
};

Home.auth = true;

export default Home;
