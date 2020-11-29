import React, {useEffect} from 'react';
import {useMutation} from "react-fetching-library";
import {AdviceItem, Result} from "@app/data/result";
import {Card, Grid, Spinner} from "@geist-ui/react";

const fetchRecommend = (formValues: any) => ({
  method: 'POST',
  endpoint: '/get_recommend',
  body: formValues,
});

interface Props {
  result: Result;
  score: number
}

interface ResultAdviceItemProps {
  item: { item: string }
}

const ResultAdviceItem: React.FC<ResultAdviceItemProps> = ({item}) => {

  console.log(item);

  return (
    <Grid xs={6}>
      <Card shadow style={{width: '100%', height: '100px'}}>
        {item.item}
      </Card>
    </Grid>
  );
};

const ResultRecommend: React.FC<Props> = ({result, score}) => {

  const {loading, payload, mutate, error, reset, abort} = useMutation(fetchRecommend as any);

  useEffect(() => {
    mutate({score: score}).then();
  }, []);

  return (
    <div className={"rec_root"}>
      {loading && <Spinner/>}
      {!loading && payload && <ResultAdviceItem item={payload}/>}

      <style jsx>{`
        .rec_root {
         padding: 16px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default ResultRecommend;