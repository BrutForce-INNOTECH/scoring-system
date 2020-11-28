import React, {useCallback, useState} from 'react';
import {Card, Text} from "@geist-ui/react";
import PageLayout from "@app/layouts/PageLayout";
import PageContent from "@app/containers/PageContent";
import {useDropzone} from 'react-dropzone'

interface Props {
}

const Search: React.FC<Props> = ({children}) => {

  const [file, setFile] = useState();

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0)
      setFile(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <PageLayout>
      <Text h1>Определить по фото клиента</Text>
      <PageContent>


        <Card>

          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
          </div>

        </Card>
      </PageContent>
    </PageLayout>
  );
};

export default Search;