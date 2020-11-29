import React, {useMemo} from 'react';
import {Button, Col, Spacer, Text} from "@geist-ui/react";
import {fioByResult, labelByResultKey, Result, universityByResult} from "@app/data/result";
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

  const fio = useMemo(() => fioByResult(result), [result]);
  const university = useMemo(() => universityByResult(result), [result]);

  return (
    <div className={"r_root"}>
      <div className={"r_header"}>
        <div className={clsx("r_header_row", "r_img_wrapper")}>
          <img alt={"image"} src={result.photo_max_orig} width={240} height={340} className={"r_img"}/>
          <Spacer y={0.5} />
          <Button type={"success"}>Подобрать услугу</Button>
        </div>
        <div className={"r_header_row"}>
          <Col><Text size={"2rem"} span>{fio}</Text></Col>
          {result.occupation && (
            <Col>
              <Text span>{result.occupation.name}</Text>
              <Spacer y={0.5}/>
            </Col>)}
          {result.country && <Col><DetailRowItem name={labelByResultKey("country")} value={result.country.title}/></Col>}
          {result.home_town && <Col><DetailRowItem name={labelByResultKey("home_town")} value={result.home_town}/></Col>}
          {university && <Col><DetailRowItem name={labelByResultKey("university")} value={university}/></Col>}
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