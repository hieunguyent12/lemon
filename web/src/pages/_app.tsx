// import "../styles/globals.css";
import { useEffect, useLayoutEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Head from "next/head";
import { Session } from "next-auth";
import { Loader } from "@mantine/core";

import { ApolloProvider } from "@apollo/client";

import APOLLO_CLIENT from "../../apollo-client";
import AppContainer from "../components/AppContainer";
import { AppContextProvider } from "../context/AppContext";

interface AuthProps {
  isNewUserPage: boolean;
  children: (session: Session) => JSX.Element;
}

function Auth({ children, isNewUserPage }: AuthProps) {
  const { data: session } = useSession({ required: true });
  const router = useRouter();

  const isUser = !!session?.user;

  useEffect(() => {
    // if the user just signed up, redirect to /newuser
    if (session) {
      if (session.isNewUser) {
        if (window.location.pathname !== "/newuser") {
          router.replace("/newuser");
        }
      } else {
        if (isNewUserPage) {
          router.replace("/home");
        }
      }
    }
  }, [session, isNewUserPage]);

  // useEffect(() => {

  // }, [isNewUserPage, session])

  // If we go to a page that is not /newuser and the user is new, we render null for that page and then redirect to /newuser
  // this is to prevent flashes of the page's content
  if (!isNewUserPage && session?.isNewUser) {
    return null;
  }

  // If we go to /newuser and the user is not new, we render null for /newuser and redirect to the home page
  // this is to prevent flashes of the page's content
  if (isNewUserPage && !session?.isNewUser) {
    return null;
  }

  // If authenticated, return the content
  if (isUser) {
    if (!isNewUserPage) {
      return <AppContainer session={session}>{children(session)}</AppContainer>;
    }
    return children(session);
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader size="lg" />
    </div>
  );
}

function Lemon({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const renderComponent = () => {
    return (Component as any).auth ? (
      <Auth isNewUserPage={(Component as any).newUserPage}>
        {(session) => <Component {...pageProps} session={session} />}
      </Auth>
    ) : (
      <Component {...pageProps} />
    );
  };

  return (
    <>
      <Head>
        <title>Lemon</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SessionProvider session={session}>
        <ApolloProvider client={APOLLO_CLIENT}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: "light",
            }}
          >
            <NotificationsProvider>
              <AppContextProvider>{renderComponent()}</AppContextProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

export default Lemon;
