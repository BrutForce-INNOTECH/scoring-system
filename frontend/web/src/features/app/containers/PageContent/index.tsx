
interface Props {
}

const PageContent: React.FC<Props> = ({children}) => {

  return (
    <div className={"pc_root"}>
      {children}
      <style jsx>{`
         .pc_root {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding-top: 0;
          padding-bottom: 16px;
         }
        `}</style>
    </div>
  );
};

export default PageContent;