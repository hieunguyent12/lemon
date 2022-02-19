import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import APOLLO_CLIENT from "../../apollo-client";

function Lemon({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={APOLLO_CLIENT}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default Lemon;
