import React, {useMemo} from 'react';
import {Code, Col, Tag, Text} from "@geist-ui/react";
import {fioByPerson, labelByPersonKey, Result, universityByPerson} from "@app/data/result";
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

  const data = result.data;
  const fio = useMemo(() => fioByPerson(data), [data]);
  const age = useMemo(() => result.age ? `${result.age}` : undefined, [result]);
  const university = useMemo(() => universityByPerson(data), [data]);
  const resultJson = useMemo(() => JSON.stringify(result, null, 2), [result]);
  const score = useMemo(() => result.age ? `Уровень принятия рисков инвестиций: ${result.score}` : undefined, [result]);

  return (
    <div className={"r_root"}>
      <div className={"r_header"}>
        <div className={clsx("r_header_row")}>
          <div className={"r_img_wrapper"}>
            <img alt={"image"} src={data.photo_max_orig} width={240} height={340} className={"r_img"}/>
          </div>
          {/*<Spacer y={0.5}/>*/}
          {/*<Button type={"success"}>Подобрать услугу</Button>*/}
        </div>
        <div className={"r_header_row"}>
          <Col>
            <Text size={"1.7rem"} style={{lineHeight: 1}} span>{fio}</Text>
            <div className={"r_detail"}>
              {score && <Tag type={"success"}>{score}</Tag>}
            </div>
          </Col>

          {age &&
          <Col><DetailRowItem name={labelByPersonKey("bdate")} value={age}/></Col>}
          {data.occupation && (
            <Col>
              <DetailRowItem name={labelByPersonKey("occupation")} value={data.occupation.name}/>
            </Col>)}
          {data.country &&
          <Col><DetailRowItem name={labelByPersonKey("country")} value={data.country.title}/></Col>}
          {data.home_town &&
          <Col><DetailRowItem name={labelByPersonKey("home_town")} value={data.home_town}/></Col>}
          {university && <Col><DetailRowItem name={labelByPersonKey("university")} value={university}/></Col>}
        </div>
      </div>
      {/*{resultJson && <div className={"r_code"}>*/}
      {/*  <Code style={{wordBreak: "break-word"}}>{resultJson}</Code>*/}
      {/*</div>}*/}

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
          display: flex;
          flex-direction: column;
        }
        .r_img_wrapper {
          margin-right: 16px;
          overflow: hidden;
          border-radius: 8px;
        }
        .r_img {
          object-fit: cover;
        }
        .r_code {
          max-width: 100%;
          margin-top: 16px;
          padding: 0 8px;
          max-height: 200px;
          overflow-y: auto;
        }
        .r_detail {
          margin-top: 4px;
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
};

export default ResultDetail;