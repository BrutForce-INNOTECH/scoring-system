import React, {useEffect, useState} from 'react';
import {Page, useTheme} from "@geist-ui/react";
import AppHeader from "../../containers/AppHeader";
import {useRouter} from "next/router";
import clsx from "clsx";
import AppPageLoader from "./AppPageLoader";

interface Props {
}

const AppLayout: React.FC<Props> = ({children}) => {

  // indicates if the loading indicator should appear
  const [isLoading, setIsLoading] = useState(false)
  // used to inform the Header about route changes
  const [routerEventPath, setRouterEventPath] = useState<string | undefined>()
  // used to listen to events
  const {events} = useRouter();

  const theme = useTheme();

  useEffect(() => {

    /** Informs about the beginning of a route change */
    const handleStart = (url: string) => {
      setRouterEventPath(url)
      setIsLoading(true)
    }

    /** Informs about the ending of a route change */
    const handleEnd = () => {
      setRouterEventPath(undefined)
      setIsLoading(false)
    }

    // adds listeners to route events
    events.on("routeChangeStart", handleStart)
    events.on("routeChangeComplete", handleEnd)
    events.on("routeChangeError", handleEnd)

    // removes listeners to route events
    return () => {
      events.off("routeChangeStart", handleStart)
      events.off("routeChangeComplete", handleEnd)
      events.off("routeChangeError", handleEnd)
    }
  }, [])

  return (
    <Page size={"small"} className={"page"} key={"app_page"}>
      {/** page header and background */}
      <Page.Header className={"page_header"}>
        <AppHeader routerEventPath={routerEventPath}/>
        <div className={clsx("header_background", "header")}/>
      </Page.Header>
      <Page.Content className={"page_content"}>
        {/** show loading indicator on route changes */}
        <AppPageLoader isLoading={isLoading}/>
        {/** common content */}
        <div className={"content"}>
          {children}
        </div>
      </Page.Content>

      <style jsx>{`
        .header_background {
          overflow: hidden;
          position: fixed;
          opacity: 0.4;
          left: 0;
          right: 0;
          top: 0;
          height: 78px;
          width: 100%;
          z-index: 99;
        }
        .header {
          background-color: ${theme.type === "light" ? "white" : "black"}
        }
        .content {
          opacity: ${isLoading ? 0 : 1};
          margin-top: -50px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          flex-wrap: nowrap;
        }
     `}</style>
    </Page>
  );
};

export default AppLayout;