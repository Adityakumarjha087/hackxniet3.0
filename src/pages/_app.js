import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style jsx global>{`
          html, body {
            overflow-x: hidden;
            overflow-y: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
            width: 100%;
            max-width: 100vw;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html::-webkit-scrollbar, body::-webkit-scrollbar {
            display: none;
          }
          * {
            box-sizing: border-box;
            max-width: 100%;
          }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;