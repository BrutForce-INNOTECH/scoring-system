import '../../styles/globals.scss'
import {AppProps} from "next/app";
import {CssBaseline, GeistProvider} from "@geist-ui/react";
import React from "react";
import AppLayout from "@app/layouts/AppLayout";

const App = ({Component, pageProps}: AppProps) => {

  return (
    <GeistProvider>
      <CssBaseline/>
      <AppLayout>
        <Component {...pageProps}/>
      </AppLayout>
    </GeistProvider>
  );
};

export default App;

