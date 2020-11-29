import React, {useMemo} from 'react';
import {fioByPerson, Person, Result} from "@app/data/result";
import {Modal, Text} from "@geist-ui/react";
import ResultContainer from "@app/containers/ResultContainer";

interface Props {
  open: boolean
  onClose?: () => void
  result?: Result
}

const ResultModal: React.FC<Props> = ({open, result, onClose, children}) => {

  const fio = useMemo(() => result ? fioByPerson(result.data) : '', [result]);

  return (
    <Modal width={"48rem"} open={open} onClose={onClose}>
      <Text h3 style={{paddingBottom: 8}}>Финансовый профиль {fio}</Text>
      <Modal.Content>
        {result && <div style={{minHeight: 360}}>
          <ResultContainer result={result}/>
        </div>}
      </Modal.Content>
      <Modal.Action passive onClick={onClose}>Закрыть</Modal.Action>
      <Modal.Action
        htmlType={"button"}
        size={"small"}
        type={"success"}>
        Подобрать услугу
      </Modal.Action>
      <style jsx>{`
      `}</style>
    </Modal>
  )
};

export default ResultModal;