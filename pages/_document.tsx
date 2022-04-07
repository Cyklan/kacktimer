import { Html, Main, NextScript, Head } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name='application-name' content='Kacktimer' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Kacktimer' />
        <meta name='description' content='Behalte deine Kacks immer im Überblick' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#FFFFFF' />

        <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/icons/152.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/180.png' />
        <link rel='apple-touch-icon' sizes='167x167' href='/icons/167.png' />

        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://timer.kacken.org' />
        <meta name='twitter:title' content='Kacktimer' />
        <meta name='twitter:description' content='Behalte deine Kacks immer im Überblick' />
        <meta name='twitter:image' content='https://timer.kacken.org/icons/180.png' />
        <meta name='twitter:creator' content='@DavidWShadow' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Kacktimer' />
        <meta property='og:description' content='Behalte deine Kacks immer im Überblick' />
        <meta property='og:site_name' content='Kacktimer' />
        <meta property='og:url' content='https://timer.kacken.org' />
        <meta property='og:image' content='https://timer.kacken.org/icons/180.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}