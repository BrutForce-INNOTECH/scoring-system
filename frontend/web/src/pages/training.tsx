import React from 'react';
import {Text} from "@geist-ui/react";
import PageLayout from "@app/layouts/PageLayout";

interface Props {
}

const Training: React.FC<Props> = (props) => {

    return (
      <PageLayout>
        <Text h1>Создание финансового профиля</Text>
      </PageLayout>
    );
};

export default Training;