import NextDocument, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';
import {CssBaseline} from "@geist-ui/react";

class Document extends NextDocument {
  public render() {
    return (
      <Html dir="ltr" lang="ru">
        <Head>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await NextDocument.getInitialProps(ctx)
  const styles = CssBaseline.flush()
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        {styles}
      </>
    )
  }
};

export default Document;
