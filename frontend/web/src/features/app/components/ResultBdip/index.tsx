import React from 'react';
import {Bdip} from "@app/data/result";
import {Divider, Text} from "@geist-ui/react";

interface Props {
  BDIP: Bdip[];
}

interface BdipItemProps {
  item: Bdip
}

interface DetailRowItemProps {
  name: string;
  value?: string;
}

const DetailRowItem: React.FC<DetailRowItemProps> = ({name, value}) => {

  return (
    <div>
      <span className={"bdip_name"}>{name}:</span>
      <Text size={"0.8rem"} span>{value}</Text>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .bdip_name {
          margin-right: 4px;
          color: #616161;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};

const BdipItem: React.FC<BdipItemProps> = ({item}) => {

  const {name, details, subject} = item;

  return (
    <div className={"bdi_item"}>

      <DetailRowItem name={"ФИО:"} value={name}/>
      <DetailRowItem name={"Причина:"} value={details}/>
      <DetailRowItem name={"Детали:"} value={subject}/>

      <style jsx>{`
        .bdi_item {
          padding-top: 8px;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          flex-grow: 1;
        }
      `}</style>
    </div>

  );
};

const ResultBdip: React.FC<Props> = ({BDIP}) => {

  return (
    <div>
      {BDIP.map((bd, index) => (
        <div key={index}>
          {index > 0 && <Divider/>}
          <BdipItem item={bd}/>
        </div>
      ))}
    </div>
  );
};

export default ResultBdip;