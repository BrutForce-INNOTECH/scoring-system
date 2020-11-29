import React from 'react';
import {Tabs} from "@geist-ui/react";
import ResultDetail from "@app/components/ResultDetail";
import {Result} from "@app/data/result";
import ResultBdip from "@app/components/ResultBdip";
import ResultRecommend from "@app/components/ResultRecommend";

interface Props {
  result: Result;
}

const ResultContainer: React.FC<Props> = ({result}) => {

  return (
    <div className={"r_root"}>
      <div className={"r_tabs_container"}>
        <Tabs initialValue="1">
          <Tabs.Item label="Финансовая информация" value="1"><ResultDetail result={result}/></Tabs.Item>
          {result.score &&
          <Tabs.Item label="Рекомендуемые продукты" value="2"><ResultRecommend result={result} score={result.score}/></Tabs.Item>}
          {result.BDIP?.BDIP && result.BDIP.BDIP.length > 0 &&
          <Tabs.Item label="Судебное производство от ФССП" value="3"><ResultBdip BDIP={result.BDIP.BDIP}/></Tabs.Item>}
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