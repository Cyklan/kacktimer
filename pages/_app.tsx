import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Kacktimer</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>
    <Component {...pageProps} />
  </>;
}

export default MyApp;
