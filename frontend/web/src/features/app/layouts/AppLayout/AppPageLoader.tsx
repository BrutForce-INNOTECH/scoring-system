import React from 'react';
import {Spinner} from "@geist-ui/react";

interface Props {
  isLoading?: boolean
}

const AppPageLoader: React.FC<Props> = ({isLoading}) => {

  return (
    <div className={"root"}>
      <Spinner size="large"/>

      <style jsx>{`
        .root {
          display: ${isLoading ? "flex" : "none"};
          opacity: ${isLoading ? 1 : 0};
          flex-direction: column;
          flex-grow: 1;
          align-items: center;
          justify-content: center;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default AppPageLoader;