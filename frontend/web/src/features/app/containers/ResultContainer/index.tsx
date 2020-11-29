import React from 'react';
import {Tabs} from "@geist-ui/react";
import ResultDetail from "@app/components/ResultDetail";
import {defaultResult, Result} from "@app/data/result";
import ResultAdvice from "@app/components/ResultAdvice";

interface Props {
  result?: Result;
}

const ResultContainer: React.FC<Props> = ({result = defaultResult}) => {

  return (
    <div className={"r_root"}>
      <Tabs initialValue="1">
        <Tabs.Item label="Финансовая информация" value="1"><ResultDetail result={result}/></Tabs.Item>
        <Tabs.Item label="Рекомендуемые услуги" value="2"><ResultAdvice result={result}/></Tabs.Item>
      </Tabs>

      <style jsx>{`
        .r_root {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
};

export default ResultContainer;