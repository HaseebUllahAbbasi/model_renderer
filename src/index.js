/* 
  How to run locally?

  Make sure you have recent Node.js, npm or Yarn installed.
  - Click `File` -> `Export to ZIP`
  - Extract downloaded archive
  - Open terminal in project directory

  In terminal:
  - Run `yarn` or `npm i` to install project modules
  - Run `yarn start` or `npm start`
  
  Now open your browser and join localhost:8080
*/

import React from "react";
import { render } from "react-dom";
import { Global, css } from "@emotion/core";

import Example from "./example";

const styles = css`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;

const App = () => {
  return (
    <>
      <Global {...styles} />
      <Example />
    </>
  );
};

render(<App />, document.getElementById("root"));
