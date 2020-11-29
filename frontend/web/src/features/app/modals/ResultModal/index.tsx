import React from 'react';
import {Result} from "@app/data/result";
import {Modal, Text} from "@geist-ui/react";
import ResultContainer from "@app/containers/ResultContainer";

interface Props {
  open: boolean
  onClose?: () => void
  result?: Result
}

const ResultModal: React.FC<Props> = ({open, result, onClose, children}) => {

  return (
    <Modal width={"48rem"} open={open} onClose={onClose}>
      <Text h3 style={{paddingBottom: 8}}>Финансовый профиль {result?.fio || ""}</Text>
      <Modal.Content>
        {result && <div style={{minHeight: 360}}>
          <ResultContainer result={result}/>
        </div>}
      </Modal.Content>
      <style jsx>{`
      `}</style>
    </Modal>
  )
};

export default ResultModal;