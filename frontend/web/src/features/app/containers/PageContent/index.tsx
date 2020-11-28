
interface Props {
}

const PageContent: React.FC<Props> = ({children}) => {

  return (
    <div className={"root"}>
      {children}
      <style jsx>{`
         .root {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding-top: 12px;
          padding-bottom: 16px;
         }
        `}</style>
    </div>
  );
};

export default PageContent;