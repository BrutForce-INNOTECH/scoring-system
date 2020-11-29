import React from 'react';
import {Col, Spacer, Text} from "@geist-ui/react";
import {labelByResult, Result} from "@app/data/result";
import clsx from "clsx";

interface Props {
  result: Result;
}

interface DetailRowItemProps {
  name: string;
  value?: string;
}

const DetailRowItem: React.FC<DetailRowItemProps> = ({name, value}) => {

  return (
    <div>
      <span className={"r_name"}>{name}:</span>
      <Text size={"1rem"} span>{value}</Text>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .r_name {
          margin-right: 4px;
          color: #616161;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

const ResultDetail: React.FC<Props> = ({result}) => {

  return (
    <div className={"r_root"}>
      <div className={"r_header"}>
        <div className={clsx("r_header_row", "r_img_wrapper")}>
          <img alt={"image"} src={result.image} width={240} height={340} className={"r_img"}/>
        </div>
        <div className={"r_header_row"}>
          <Col><Text size={"2rem"} span>{result.fio}</Text></Col>
          {result?.position && (
            <Col>
              <Text span>{result?.position}</Text>
              <Spacer y={0.5}/>
            </Col>)}
          <Col><DetailRowItem name={labelByResult("vk")} value={result.vk}/></Col>
          <Col><DetailRowItem name={labelByResult("fb")} value={result.fb}/></Col>
          <Col><DetailRowItem name={labelByResult("inn")} value={result.inn}/></Col>
          <Col><DetailRowItem name={labelByResult("fssp")} value={result.fssp}/></Col>
          <Col><DetailRowItem name={labelByResult("bankrot")} value={result.bankrot}/></Col>
        </div>
      </div>

      <style jsx>{`
        .r_root {
          padding-top: 8px;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          flex-grow: 1;
        }
        .r_header {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
        }
        .r_header_row {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
        }
        .r_img_wrapper {
          border-radius: 8px;
          overflow: hidden;
          margin-right: 16px;
        }
        .r_img {
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default ResultDetail;