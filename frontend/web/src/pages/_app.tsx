import '../../styles/globals.scss'
import App, {AppContext, AppProps} from "next/app";
import {CssBaseline, GeistProvider} from "@geist-ui/react";
import React, {useEffect} from "react";
import AppLayout from "@app/layouts/AppLayout";
import Head from "next/head";
import {ClientContextProvider} from 'react-fetching-library';
import client from "@common/api/client";

interface CustomAppProps extends AppProps {
  cacheItems?: any
}

const CustomApp: React.FC<CustomAppProps> = ({Component, cacheItems, pageProps}) => {

  useEffect(() => {
    if (client.cache && cacheItems) client.cache.setItems(cacheItems);
  }, [cacheItems])

  return (
    <>
      <Head>
        <title>Команда BrutForce INNOTECH HACK</title>
      </Head>

      <ClientContextProvider client={client}>
        <GeistProvider>
          <CssBaseline/>
          <AppLayout>
            <Component {...pageProps}/>
          </AppLayout>
        </GeistProvider>
      </ClientContextProvider>
    </>
  );
};

(CustomApp as any).getInitialProps = async (appContext: AppContext) => {
  let appProps = {};
  if (typeof App.getInitialProps === 'function') {
    appProps = await App.getInitialProps(appContext);
  }

  return {
    ...appProps,
    cacheItems: client.cache?.getItems(),
  };
};

export default CustomApp;

