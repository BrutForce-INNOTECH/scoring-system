import React, {useState} from 'react';
import {Modal, Textarea, useToasts} from "@geist-ui/react";
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
  const [toasts, setToast] = useToasts();
  const {loading, payload, mutate, error, reset, abort} = useMutation(fetchTrain as any);

  const changeValue = (event: any) => {
    setValue(event.target.value);
  }

  const handleSubmit = async (e: any) => {
    const inputs = value.split("\n").filter(x => x);
    const result = await mutate({urls: inputs});
    if (result.error) {
      setToast({text: "Ошибка при загрузке данных. Попробуйте еще раз.", type: "error"});
    } else {
      setToast({text: "Данные успешно отправлены на проверку. Можно искать по фото!", type: "success"});
      setValue("");
      onClose();
    }
  }

  return (
    <Modal open={open} disableBackdropClick>
      <Modal.Title>Добавьте ссылку на соцсети</Modal.Title>
      <Modal.Content>
        <Textarea
          width={"100%"}
          rows={8}
          disabled={loading}
          value={value}
          onChange={changeValue}
          placeholder="Для примера: https://vk.com/durov"
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
        Отправить
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