import React, {createRef, useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {Tabs, Text} from "@geist-ui/react";
import {APP_HOME_ROUTE, APP_SEARCH_ROUTE, APP_SETTINGS_ROUTE, APP_TRAINING_ROUTE} from "@common/routes/app";

interface Props {
  routerEventPath?: string
}

const calculateBase = (fullPath: string) => fullPath

const AppHeader: React.FC<Props> = ({routerEventPath}) => {

  const {pathname, push} = useRouter()
  const [path, setPath] = useState(pathname)
  const [basePath, setBasePath] = useState(calculateBase(pathname))
  const headerRef = createRef<HTMLDivElement>()

  // used to switch to the selected tab
  useEffect(() => {
    if (pathname !== path) push(path).then()
  }, [path])

  // used to react to router events between route changes
  useEffect(() => {
    if (routerEventPath) setBasePath(calculateBase(routerEventPath))
    else {
      setPath(pathname)
      setBasePath(calculateBase(pathname))
    }
  }, [routerEventPath])

  // used to remove empty space under the tabs
  useEffect(() => {
    const ref = headerRef.current
    if (!ref) return
    // const content = ref.querySelector(".content")
    // if (content) content.remove()
  }, [headerRef])

  // used to highlight the selected tab from router change
  useEffect(() => {
    setPath(pathname)
    setBasePath(calculateBase(pathname))
  }, [pathname])

  const handleChangeTab = useCallback((value: string) => {
    setPath(value);
  }, [setPath]);

  const handleLogo = useCallback(() => {
    setPath(APP_HOME_ROUTE);
  }, [setPath]);

  return (
    <div className="header" ref={headerRef}>
      <div className="header_content">
        <div style={{paddingTop: 10, paddingBottom: 10}}>
          <button onClick={handleLogo} className="logo_button">
            <img className={"logo_img"} src={require("@common/assets/images/logo.svg")} height={32} alt="Logo"/>
            <Text span size={"1.2rem"} b>BrutForce INNOTECH HACK</Text>
          </button>
        </div>
        <Tabs value={basePath} onChange={handleChangeTab}>
          <Tabs.Item label="Обучение" value={APP_TRAINING_ROUTE}/>
          <Tabs.Item label="Поиск по фото" value={APP_SEARCH_ROUTE}/>
          <Tabs.Item label="Настройки" value={APP_SETTINGS_ROUTE}/>
        </Tabs>
      </div>

      <style jsx>{`
        .header {
          overflow: hidden;
          backdrop-filter: blur(20px);
          position: static;
          left: 0;
          right: 0;
          top: 0;
          z-index: 1000;
        }
        .header_content {
          width: 750pt;
          max-width: 100vw;
          margin: 0 auto;
          padding: 0;
          box-sizing: border-box;
        }
        .logo_button {
          border: none;
          padding: 0;
          background: none;
          display: flex;
          justify-content: center;
          flex-wrap: nowrap;
        }
        .logo_img {
          margin-right: 4px;
        }
        .logo_button:hover {
          cursor: pointer;
         }
      `}</style>
    </div>
  );
};

export default AppHeader;