import React from 'react';
import {Button, Link, Text} from "@geist-ui/react";
import {APP_HOME_ROUTE} from "@common/routes/app";
import NextLink from "next/link";
import GithubIcon from '@geist-ui/react-icons/github'


interface Props {
}

const logoStyle = {
  border: "none",
  padding: 0,
  background: "none",
  display: "flex",
  alignItems: "center",
}

const AppHeader: React.FC<Props> = () => {

  const handleGithub = () => {
    if (window) window.open("https://github.com/BrutForce-INNOTECH/scoring-system", '_ blank');
  }

  return (
    <header className="h_header">
      <div className="h_header_content">
        <NextLink href={APP_HOME_ROUTE}>
          <Link style={logoStyle}>
            <img className={"h_logo_img"} src={require("@common/assets/images/logo.svg")} height={32} alt="Logo"/>
            <Text span size={"1.2rem"} b>BrutForce INNOTECH HACK</Text>
          </Link>
        </NextLink>

        <div className={"h_action_grow"} />
        <Button onClick={handleGithub} type={"default"} icon={<GithubIcon/>} auto size="small">
          GitHub
        </Button>
      </div>

      <style jsx>{`
        .h_header {
          overflow: hidden;
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          z-index: 1;
        }
        .h_header_content {
          max-width: 100vw;
          margin: 0;
          padding: 8px 16px;
          box-sizing: border-box;
          border-bottom: solid 1px #bdbdbd;
          display: flex;
          flex-direction: row;
        }
        .h_logo_img {
          margin-right: 4px;
        }
        .h_action_grow {
          flex-grow: 1;
        }
      `}</style>
    </header>
  );
};

export default AppHeader;