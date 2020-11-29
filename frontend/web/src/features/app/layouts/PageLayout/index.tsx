import React from 'react';

interface Props {
}

const PageLayout: React.FC<Props> = ({children}) => {

  return (
    <div className={"p_root"}>
      {children}
      <style jsx>{`
        .p_root {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          flex-grow: 1;
          padding-top: 24px;
        }
      `}</style>
    </div>
  );
};

export default PageLayout;