import React, {useCallback, useState} from 'react';
import {Button, Card, Spacer, Text, useToasts} from "@geist-ui/react";
import PageLayout from "@app/layouts/PageLayout";
import PageContent from "@app/containers/PageContent";
import Dropzone from 'react-dropzone'
import clsx from "clsx"
import fileClient from "@common/api/fileClient";
import {useMutation} from "react-fetching-library";

interface Props {
}

const fetchSearch = (formValues: any) => ({
  method: 'POST',
  endpoint: '/search',
  body: formValues,
});

interface FileItem {
  preview: string;
  blob: File
}

const Search: React.FC<Props> = ({children}) => {

  const [file, setFile] = useState<FileItem>();
  const [loading, setLoading] = useState(false);
  const [toasts, setToast] = useToasts();
  const {payload, mutate, error} = useMutation(fetchSearch as any);

  const handleDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const acceptedFile = acceptedFiles[0];
      setFile({blob: acceptedFile, preview: URL.createObjectURL(acceptedFile)});
    }
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;
    try {
      setLoading(true);

      const uploadResult = await fileClient.uploadFile(file.blob);
      const result = await mutate({
        url: uploadResult
      });
      if (result.error) {
        setToast({text: "Ошибка при поиске по фото. Попробуйте еще раз.", type: "error"});
      } else {
        setToast({text: result.payload, type: "success"});
        setFile(undefined);
      }
    } catch (err) {
      console.log(err);
      setToast({text: err.message, type: "error"});
    } finally {
      setLoading(false);
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
                  {!!file && <img alt={"thumb"} className={"thumb"} src={file.preview!}/>}
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