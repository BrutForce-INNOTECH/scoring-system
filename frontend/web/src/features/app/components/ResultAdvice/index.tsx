import {Card, Grid} from "@geist-ui/react";
import {Result, AdviceItem} from "@app/data/result";

interface Props {
  result: Result;
}


interface ResultAdviceItemProps {
  item: AdviceItem
}

const ResultAdviceItem: React.FC<ResultAdviceItemProps> = ({item}) => {

  return (
    <Grid xs={6}>
      <Card shadow style={{width: '100%', height: '100px'}}>
        {item.name}
      </Card>
    </Grid>
  );
};

const ResultAdvice: React.FC<Props> = ({result}) => {
  return (
    <div className={"r_root"}>
      <Grid.Container gap={2} justify="center">
        {result.advices.map(advice => (
          <ResultAdviceItem item={advice} key={advice.id}/>
        ))}
      </Grid.Container>

      <style jsx>{`
        .r_root {
          padding: 8px 8px 12px 8px;
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