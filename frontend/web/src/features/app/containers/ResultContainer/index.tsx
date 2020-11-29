import React from 'react';
import {Tabs} from "@geist-ui/react";
import ResultDetail from "@app/components/ResultDetail";
import {Result} from "@app/data/result";
import ResultAdvice from "@app/components/ResultAdvice";
import ResultBdip from "@app/components/ResultBdip";

interface Props {
  result: Result;
}

const ResultContainer: React.FC<Props> = ({result}) => {

  return (
    <div className={"r_root"}>
      <div className={"r_tabs_container"}>
        <Tabs initialValue="1">
          <Tabs.Item label="Финансовая информация" value="1"><ResultDetail result={result}/></Tabs.Item>
          {result.BDIP?.BDIP && result.BDIP.BDIP.length > 0 &&
          <Tabs.Item label="Судебное производство от ФССП" value="2"><ResultBdip BDIP={result.BDIP.BDIP}/></Tabs.Item>}
          {result.advices && result.advices.length > 0 &&
          <Tabs.Item label="Рекомендуемые услуги" value="3"><ResultAdvice result={result}/></Tabs.Item>}
        </Tabs>
      </div>

      <style jsx>{`
        .r_root {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          flex-grow: 1;
        }
        .r_tabs_container {
          padding-bottom: 16px;
        }
      `}</style>
    </div>
  );
};

export default ResultContainer;