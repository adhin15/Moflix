import { useEffect, Suspense } from "react";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // window.AOS.init({
    //   // Initialization
    //   duration: 1000,
    // });
  }, []);
  return (
    <Suspense fallback={<>Loading...</>}>
      <Component {...pageProps} />
    </Suspense>
  );
}
