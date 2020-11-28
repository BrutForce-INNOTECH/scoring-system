import React from 'react';

interface Props {
}

const PageLayout: React.FC<Props> = ({children}) => {

  return (
    <div className={"root"}>
      {children}
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          flex-grow: 1;
          padding-top: 12px;
        }
      `}</style>
    </div>
  );
};

export default PageLayout;