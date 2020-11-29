import React from 'react';
import PageLayout from "@app/layouts/PageLayout";
import PageContent from "@app/containers/PageContent";
import ResultContainer from "@app/containers/ResultContainer";

interface Props {
}

const Index: React.FC<Props> = (props) => {

  return (
    <PageLayout>
      <PageContent>
        <ResultContainer/>
      </PageContent>
    </PageLayout>
  );
};

export default Index;