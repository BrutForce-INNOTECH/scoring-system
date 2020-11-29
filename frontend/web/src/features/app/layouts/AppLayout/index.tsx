import React from 'react';
import {Page} from "@geist-ui/react";
import AppHeader from "../../containers/AppHeader";

interface Props {
}

const AppLayout: React.FC<Props> = ({children}) => {

  return (
    <Page size={"small"} className={"page"} key={"app_page"}>
      <AppHeader />
      <Page.Content className={"page_content"}>
        <div className={"content"}>
          {children}
        </div>
      </Page.Content>

      <style jsx>{`
        .content {
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