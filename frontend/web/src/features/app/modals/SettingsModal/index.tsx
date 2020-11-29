import React, {useEffect, useState} from 'react';
import {Input, Modal, Text} from "@geist-ui/react";
import {Settings} from "@app/data/settings";

interface Props {
  onChangeSettings: (settings: Settings) => any;
  settings: Settings
  open: boolean
  onClose?: () => void
}

const SettingsModal: React.FC<Props> = ({onClose, open, settings, onChangeSettings}) => {

  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChangeValue = (event: any) => {
    setValue(event.target.value);
  }

  const handleSubmit = () => {
    setError(undefined);
    const thresh = +(value || "0");
    if (thresh <= 0 || thresh > 1) {
      setError("Введите порог для поиска лиц от 0 до 1")
    } else {
      onChangeSettings({thresh: thresh} as Settings)
      onClose && onClose()
    }
  }

  useEffect(() => {
    if (settings && open) setValue(settings.thresh?.toString());
  }, [open])

  return (
    <Modal width={"36rem"} open={open} onClose={onClose}>
      <Text h3>Настройки</Text>
      <Modal.Content>
        <Input
          width={"100%"}
          label={"Порог для поиска лиц"}
          value={value}
          type={"number"}
          step={0.01}
          required
          onChange={handleChangeValue}
          placeholder="Введите значение от 0 до 1">
          <Text span type={"secondary"} size={"0.8rem"}>
            Уверенность системы в том, что два лица принадлежат одному человеку
          </Text>
        </Input>
        {error && <Text span type={"error"} size={"0.65rem"}>{error}</Text>}
      </Modal.Content>
      <Modal.Action onClick={onClose}>Закрыть</Modal.Action>
      <Modal.Action onClick={handleSubmit} disabled={!value}>Сохранить</Modal.Action>
      <style jsx>{`
      `}</style>
    </Modal>
  );
};

export default SettingsModal;