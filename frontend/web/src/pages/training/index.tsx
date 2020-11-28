import React, {useState} from 'react';
import {Button, Card, Input, Spacer, Text, useToasts} from "@geist-ui/react";
import PageLayout from "@app/layouts/PageLayout";
import {useMutation} from "react-fetching-library";
import PageContent from "@app/containers/PageContent";
import UserIcon from '@geist-ui/react-icons/user'


function makeId(length: number = 16) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

interface Props {
}

const fetchTrain = (formValues: any) => ({
  method: 'POST',
  endpoint: '/train',
  body: formValues,
});

interface Item {
  id: string;
  value: string
}

interface InputItemProps {
  id: string
  onChange: (id: string, value: string) => any;
}

const InputItem: React.FC<InputItemProps> = ({id, onChange}) => {

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
        onChange={handleChange}
        icon={<UserIcon/>}
        placeholder={"URL адрес пользователя соц сети"}
      />
    </div>
  );
};

const Training: React.FC<Props> = (props) => {

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
    const result = await mutate({input: inputs.map(x => x.value)});
    if (result.error) {
      setToast({text: result.error, type: "error"});
    } else {
      setToast({text: "Данные успешно отправлены на проверку. Можно искать по фото!", type: "success"});
    }
  }

  return (
    <PageLayout>
      <Text h1>Создание финансового профиля</Text>
      <PageContent>
        <Card shadow>
          <form onSubmit={handleSubmit}>
            <h4>Добавьте ссылку на соцсети</h4>
            <div className={"actions"}>
              <Button size={"small"} onClick={changeAddItem}>Добавить ссылку</Button>
              <Spacer x={0.5}/>
              {inputs.length > 0 && <Button size={"small"} onClick={changeRemoveItem}>Удалить ссылку</Button>}
              <div className={"grow_action"}/>
              <Button
                htmlType={"submit"}
                size={"small"}
                disabled={inputs.length === 0}
                loading={loading}
                type={"success"}>
                Отправить
              </Button>
            </div>
            {inputs.map((input) => (
              <InputItem id={input.id} key={input.id} onChange={changeValueOnItem}/>
            ))}
          </form>
        </Card>
      </PageContent>

      <style jsx>{`
        .actions {
          display: flex;
          flex-direction: row;
          align-items: center;
        } 
        .grow_action {
          flex-grow: 1;
        }
      `}</style>
    </PageLayout>
  );
};

export default Training;