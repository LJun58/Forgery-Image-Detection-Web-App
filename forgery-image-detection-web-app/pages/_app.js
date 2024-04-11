import "@/styles/globals.css";
import ResponsiveAppBar from "@/components/nav";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <SessionProvider session={pageProps.session}>
        <ResponsiveAppBar />
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}
