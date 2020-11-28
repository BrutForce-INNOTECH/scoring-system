import React from 'react';
import {NextPage} from "next";
import Router from "next/router";
import {APP_TRAINING_ROUTE} from "@common/routes/app";

interface Props {
}

const Index: NextPage<Props> = (props) => {
  return (<></>);
};

Index.getInitialProps = (ctx) => {
  if (ctx.res) {
    ctx.res.writeHead(302, {Location: APP_TRAINING_ROUTE});
    ctx.res.end();
  } else {
    Router.push(APP_TRAINING_ROUTE);
  }

  return {}
}

export default Index;