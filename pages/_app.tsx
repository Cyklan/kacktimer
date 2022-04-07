import Head from 'next/head';
import '../styles/globals.css';
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from 'react';
import useOnline from '../hooks/useOnline';
import { Toaster } from 'react-hot-toast';
import useDataSync from '../hooks/useDataSync';
import SyncContext from '../context/SyncContext';

export const OnlineContext = createContext(false);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  const [online, setOnline] = useState(typeof window !== "undefined" ? window.navigator.onLine : false);
  const syncData = useDataSync();

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

  // check for pwa stuff
  useEffect(() => {
    if (typeof window === "undefined" || "serviceWorker" in navigator === false || (window as any).workbox === undefined) {
      return;
    }

    const wb = (window as any).workbox
    
    wb.addEventListener("waiting", event => {
      if (confirm("Es gibt ein Update für diese App. Möchten sie das Update installieren?")) {
        wb.addEventListener("controlling", event => {
          window.location.reload();
        });

        wb.messageSkipWaiting()
      }
    })

    wb.register()
  })

  return <>
    <Head>
      <title>Kacktimer</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    </Head>
    <OnlineContext.Provider value={online}>
      <SyncContext.Provider value={syncData}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <Toaster />
        </SessionProvider>
      </SyncContext.Provider>
    </OnlineContext.Provider>
  </>;
}

export default MyApp;
