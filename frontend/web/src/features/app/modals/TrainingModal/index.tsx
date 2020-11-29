import React, {useState} from 'react';
import {Input, Modal, Spacer, Textarea, useToasts} from "@geist-ui/react";
import {useMutation} from "react-fetching-library";
import {makeErrorToast, makeSuccessToast} from "@common/utils";

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

  const [value, setValue] = useState("https://vk.com/friomusic");
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
      setToast(makeErrorToast("Кол-во фотографий должно быть от 3 до 20."));
      return;
    }

    const inputs = value.split("\n").filter(x => x);
    const result = await mutate({urls: inputs, count: _count});
    console.log(result);
    if (result.error) {
      setToast(makeErrorToast("Ошибка при загрузке ссылок. Попробуйте еще раз."));
    } else {
      setToast(makeSuccessToast("Ссылки успешно отправлены. Можем искать финансовый профиль по фото!"));
      setValue("");
      onClose();
    }
  }

  return (
    <Modal open={open} disableBackdropClick width="35rem">
      <Modal.Title>Добавить ссылки на VK и Facebook</Modal.Title>
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
          label="Кол-во фотографий"
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