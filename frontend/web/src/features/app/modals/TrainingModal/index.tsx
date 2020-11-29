import React, {useState} from 'react';
import {Input, Modal, Spacer, Textarea, useToasts} from "@geist-ui/react";
import {useMutation} from "react-fetching-library";

interface Props {
  open: boolean
  onClose: () => any;
}

const fetchTrain = (formValues: any) => ({
  method: 'POST',
  endpoint: '/train',
  body: formValues,
});

const TrainingModal: React.FC<Props> = ({open, onClose}) => {

  const [value, setValue] = useState("https://vk.com/durov");
  const [count, setCount] = useState("10");
  const [toasts, setToast] = useToasts();
  const {loading, payload, mutate, error, reset, abort} = useMutation(fetchTrain as any);

  const changeValue = (event: any) => {
    setValue(event.target.value);
  }
  const changeCount = (event: any) => {
    const newCount = event.target.value.replace(/\D/g, '');
    setCount(newCount);
  }

  const handleSubmit = async (e: any) => {
    const _count = +count;
    if (_count < 3 || _count > 20) {
      setToast({text: "Кол-во вхождений должно быть от 3 до 20.", type: "error"});
      return;
    }

    const inputs = value.split("\n").filter(x => x);
    const result = await mutate({urls: inputs, count: _count});
    if (result.error) {
      setToast({text: "Ошибка при загрузке данных. Попробуйте еще раз.", type: "error"});
    } else {
      setToast({text: "Данные успешно отправлены на проверку. Можно искать по фото!", type: "success"});
      setValue("");
      onClose();
    }
  }

  return (
    <Modal open={open} disableBackdropClick width="35rem">
      <Modal.Title>Добавьте ссылки на соцсети VK или Facebook</Modal.Title>
      <Modal.Subtitle>Для добавления новой строки нажмите Enter</Modal.Subtitle>
      <Modal.Content>
        <Textarea
          width={"100%"}
          rows={8}
          disabled={loading}
          value={value}
          onChange={changeValue}
          status="success"
          placeholder="Ссылка на профиль в соц сети. Например, https://vk.com/durov"
        />
        <Spacer y={0.5}/>
        <Input
          label="Кол-во вхождений"
          min={3}
          max={20}
          disabled={loading}
          value={count}
          width={"100%"}
          type={"numeric"}
          onChange={changeCount}
        />
      </Modal.Content>
      <Modal.Action passive disabled={loading} onClick={onClose}>Закрыть</Modal.Action>
      <Modal.Action
        onClick={handleSubmit}
        htmlType={"submit"}
        size={"small"}
        disabled={!value || loading}
        loading={loading}
        type={"success"}>
        Отправить профили
      </Modal.Action>

      <style jsx>{`
        .t_root {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </Modal>
  );
};

export default TrainingModal;