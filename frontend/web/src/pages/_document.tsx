import NextDocument, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';
import {CssBaseline} from "@geist-ui/react";
import {GA_TRACKING_ID} from "@common/ga";
import {serverSideUtils} from "@common/utils/serverSideUtils";

class Document extends NextDocument {
  public render() {
    return (
      <Html dir="ltr" lang="ru">
        <Head>
          {serverSideUtils.isProduction() && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
              <script async
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
                }}
              />
            </>
          )}
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
