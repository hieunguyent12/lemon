import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import APOLLO_CLIENT from "../../apollo-client";

function Lemon({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={APOLLO_CLIENT}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default Lemon;
