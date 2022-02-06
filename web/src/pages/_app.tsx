import "../styles/globals.css";
import type { AppProps } from "next/app";

function Lemon({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Lemon;
