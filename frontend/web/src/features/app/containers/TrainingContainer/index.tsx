import React, {useState} from 'react';
import {Button, Input, Spacer, useToasts} from "@geist-ui/react";
import {useMutation} from "react-fetching-library";
import UserIcon from "@geist-ui/react-icons/user";

export function makeId(length: number = 16) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const fetchTrain = (formValues: any) => ({
  method: 'POST',
  endpoint: '/train',
  body: formValues,
});

interface Props {
}

interface Item {
  id: string;
  value: string
}

interface InputItemProps {
  id: string
  loading: boolean;
  onChange: (id: string, value: string) => any;
}

const InputItem: React.FC<InputItemProps> = ({id, onChange, loading}) => {

  const [value, setValue] = useState("");

  const handleChange = (value: any) => {
    const newValue = value.target.value;
    setValue(newValue);
    onChange(id, newValue)
  }

  return (
    <div>
      <Spacer y={0.5}/>
      <Input
        required
        width={"100%"}
        value={value}
        disabled={loading}
        onChange={handleChange}
        icon={<UserIcon/>}
        placeholder={"URL адрес пользователя соц сети"}
      />
    </div>
  );
};

const TrainingContainer: React.FC<Props> = (props) => {

  const [inputs, setInputs] = useState<Item[]>([{id: makeId(), value: ""}]);
  const [toasts, setToast] = useToasts();
  const {loading, payload, mutate, error, reset, abort} = useMutation(fetchTrain as any);

  const changeValueOnItem = (id: string, value: string) => {
    const existsItem = inputs.find(x => x.id === id);
    if (existsItem) existsItem.value = value;
  }

  const changeAddItem = () => {
    inputs.push({id: makeId(), value: ""});
    setInputs([...inputs]);
  }

  const changeRemoveItem = () => {
    if (inputs.length === 0) return
    setInputs([...inputs.splice(0, inputs.length - 1)]);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await mutate(inputs.map(x => x.value));
    if (result.error) {
      setToast({text: "Ошибка при загрузке данных. Попробуйте еще раз.", type: "error"});
    } else {
      setToast({text: "Данные успешно отправлены на проверку. Можно искать по фото!", type: "success"});
      setInputs([{id: makeId(), value: ""}]);
    }
  }

  return (
    <div className={"t_root"}>
      <form onSubmit={handleSubmit}>
        <h4>Добавьте ссылку на соцсети</h4>
        <div className={"actions"}>
          <Button size={"small"} onClick={changeAddItem} disabled={loading}>Добавить ссылку</Button>
          <Spacer x={0.5}/>
          {inputs.length > 0 &&
          <Button size={"small"} disabled={loading} onClick={changeRemoveItem}>Удалить ссылку</Button>}
          <div className={"grow_action"}/>
          <Button
            htmlType={"submit"}
            size={"small"}
            disabled={inputs.length === 0 || loading}
            loading={loading}
            type={"success"}>
            Отправить
          </Button>
        </div>
        {inputs.map((input) => (
          <InputItem loading={loading} id={input.id} key={input.id} onChange={changeValueOnItem}/>
        ))}
      </form>

      <style jsx>{`
        .t_root {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .t_actions {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .grow_action {
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
};

export default TrainingContainer;