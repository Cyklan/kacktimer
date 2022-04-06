import Head from 'next/head';
import '../styles/globals.css';
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from 'react';
import useOnline from '../hooks/useOnline';

export const OnlineContext = createContext(false);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  const [online, setOnline] = useState(typeof window !== "undefined" ? window.navigator.onLine : false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("online", () => {
      setOnline(true);
    });

    window.addEventListener("offline", () => {
      setOnline(false);
    });

    return () => {
      window.removeEventListener("online", () => {
        setOnline(true);
      });

      window.removeEventListener("offline", () => {
        setOnline(false);
      });
    };
  }, []);

  return <>
    <Head>
      <title>Kacktimer</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    </Head>
    <OnlineContext.Provider value={online}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </OnlineContext.Provider>
  </>;
}

export default MyApp;
