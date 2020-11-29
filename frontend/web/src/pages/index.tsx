import React, {useCallback, useState} from 'react';
import {Button, Card, Spacer, Text, useToasts} from "@geist-ui/react";
import PageLayout from "@app/layouts/PageLayout";
import PageContent from "@app/containers/PageContent";
import Dropzone from 'react-dropzone'
import clsx from "clsx"
import fileClient from "@common/api/fileClient";
import {QueryResponse, useMutation} from "react-fetching-library";
import TrainingModal from "../features/app/modals/TrainingModal";
import ResultModal from "../features/app/modals/ResultModal";
import {createResultByRaw, Result} from "@app/data/result";
import {makeErrorToast} from "@common/utils";

interface Props {
}

const fetchSearch = (formValues: any) => ({
  method: 'POST',
  endpoint: '/search',
  body: formValues,
});

const fetchResult = (formValues: any) => ({
  method: 'POST',
  endpoint: '/get_info',
  body: formValues,
});

interface FileItem {
  preview: string;
  blob: File
}

const Index: React.FC<Props> = ({children}) => {

  const [result, setResult] = useState<Result>();
  const [file, setFile] = useState<FileItem>();
  const [loading, setLoading] = useState(false);
  const [toasts, setToast] = useToasts();
  const [searchModal, setSearchModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const {mutate: searchMutate} = useMutation(fetchSearch as any);
  const {mutate: resultMutate} = useMutation(fetchResult as any);

  const handleOpenSearchModal = () => setSearchModal(true)
  const handleCloseSearchModal = () => setSearchModal(false)
  const handleOpenResultModal = (newResult: Result) => {
    setResult(newResult);
    setResultModal(true);
  };
  const handleCloseResultModal = () => {
    setResultModal(false);
  }

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
      setResult(undefined);

      const uploadResult = await fileClient.uploadFile(file.blob);
      const searchResult: QueryResponse = await searchMutate({
        thresh: 0.65,
        url: uploadResult,
      });
      if (searchResult.error) {
        setToast(makeErrorToast("Ошибка при поиске по фото. Попробуйте еще раз."));
      } else {
        console.log(searchResult.payload);
        const fetchResult = await resultMutate({id: searchResult.payload.data.id});
        handleOpenResultModal(createResultByRaw(fetchResult));
      }
    } catch (err) {
      setToast(makeErrorToast(err.message));
    } finally {
      setLoading(false);
    }
  }

  const handleRemoveFile = () => {
    setFile(undefined);
    setResult(undefined);
  }

  return (
    <PageLayout>
      <Text h1 size={"1.6rem"} type={"secondary"}>Определить финансовый профиль по фото</Text>
      <PageContent>
        <Card>
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
                onClick={handleOpenSearchModal}
                disabled={loading}
                type={"default"}>
                Добавить ссылки
              </Button>
              <div className={"grow_action"}/>
              {!!file && (
                <>
                  <Spacer x={0.5}/>
                  <Button type={"error-light"} disabled={loading} onClick={handleRemoveFile}>Удалить фото</Button>
                  <Spacer x={0.5}/>
                </>
              )}
              <Button
                loading={loading}
                htmlType={"submit"}
                disabled={!file}
                type={"success"}>
                Определить
              </Button>
            </div>
          </form>

        </Card>
      </PageContent>

      <TrainingModal open={searchModal} onClose={handleCloseSearchModal}/>
      {result && <ResultModal open={resultModal} onClose={handleCloseResultModal} result={result}/>}

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
        .grow_action {
          flex-grow: 1;
        }
      `}</style>
    </PageLayout>
  );
};

export default Index;