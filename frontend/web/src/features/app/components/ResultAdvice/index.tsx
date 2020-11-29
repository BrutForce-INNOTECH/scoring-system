import React from 'react';
import {Card, Grid} from "@geist-ui/react";
import {Result} from "@app/data/result";

interface Props {
  result: Result;
}

const ResultAdvice: React.FC<Props> = (props) => {
  const MockItem = () => {
    return <Card shadow style={{width: '100%', height: '100px'}}/>
  }
  return (
    <div className={"r_root"}>
      <Grid.Container gap={2} justify="center">
        <Grid xs={6}><MockItem/></Grid>
        <Grid xs={6}><MockItem/></Grid>
        <Grid xs={6}><MockItem/></Grid>
      </Grid.Container>

      <style jsx>{`
        .r_root {
          padding-top: 8px;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          flex-grow: 1;
        }
      `}</style>
    </div>
  )
};

export default ResultAdvice;