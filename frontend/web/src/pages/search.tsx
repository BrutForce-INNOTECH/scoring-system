import React from 'react';
import {Text} from "@geist-ui/react";
import PageLayout from "@app/layouts/PageLayout";

interface Props {
}

const App: React.FC<Props> = ({children}) => {
  return (
    <PageLayout>
      <Text h1>Search</Text>
    </PageLayout>
  );
};

export default App;