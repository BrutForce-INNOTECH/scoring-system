import React from 'react';
import {Text} from "@geist-ui/react";
import PageLayout from "@app/layouts/PageLayout";

interface Props {
}

const Settings: React.FC<Props> = (props) => {
  return (
    <PageLayout>
      <Text h1>Settings</Text>
    </PageLayout>
  );
};

export default Settings;