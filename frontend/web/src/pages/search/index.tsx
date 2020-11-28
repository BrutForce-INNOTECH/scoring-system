import React, {useCallback, useState} from 'react';
import {Button, Card, Spacer, Text, useToasts} from "@geist-ui/react";
import PageLayout from "@app/layouts/PageLayout";
import PageContent from "@app/containers/PageContent";
import Dropzone from 'react-dropzone'
import clsx from "clsx"
import {useMutation} from "react-fetching-library";

interface Props {
}

const fetchSearch = (formValues: any) => ({
  method: 'POST',
  endpoint: '/search',
  body: formValues,
});

const Search: React.FC<Props> = ({children}) => {

  const [file, setFile] = useState();
  const [toasts, setToast] = useToasts();
  const {loading, payload, mutate, error, reset, abort} = useMutation(fetchSearch as any);

  const handleDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const acceptedFile = acceptedFiles[0];
      setFile(Object.assign(acceptedFile, {
        preview: URL.createObjectURL(acceptedFile)
      }));
    }
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await mutate(file);
    if (result.error) {
      setToast({text: result.error, type: "error"});
    } else {
      // setToast({text: "Данные успешно отправлены на проверку!", type: "success"});
    }
  }

  const handleRemoveFile = () => {
    setFile(undefined);
  }

  return (
    <PageLayout>
      <Text h1>Определить по фото клиента</Text>
      <PageContent>
        <Card shadow>
          <form onSubmit={handleSubmit}>
            <Dropzone onDrop={handleDrop} disabled={!!file}>
              {({getRootProps, getInputProps, isDragActive}) => (
                <div {...getRootProps()} className={clsx("dropzone", isDragActive && "dropzone_active")}>
                  <input {...getInputProps()} />
                  {!file && <p>Перетащите фото или загрузите с компьютера</p>}
                  {!!file && <img alt={"thumb"} className={"thumb"} src={(file as any).preview!}/>}
                </div>
              )}
            </Dropzone>
            <Spacer y={0.75}/>
            <div className={"actions"}>
              <Button
                loading={loading}
                htmlType={"submit"}
                disabled={!file}
                type={"success"}>
                Отправить
              </Button>
              <Spacer x={0.5}/>
              {!!file && <Button onClick={handleRemoveFile}>Удалить файл</Button>}
            </div>
          </form>

        </Card>
      </PageContent>

      <style jsx>{`
        .dropzone {
          border: dashed #ccc 1px;
          border-radius: 8px;
          height: 360px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .dropzone_active {
          background-color: #c8e6c9;
        }
        .thumb {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .actions {
          display:flex;
          flex-direction: row;
          align-items: center;
        }
      `}</style>
    </PageLayout>
  );
};

export default Search;