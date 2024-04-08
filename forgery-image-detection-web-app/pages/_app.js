import "@/styles/globals.css";
import ResponsiveAppBar from "@/components/nav";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ResponsiveAppBar />
      <Component {...pageProps} />

    </div>
 );
}
