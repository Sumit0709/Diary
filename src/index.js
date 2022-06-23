import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import DiaryContextProvider from "./store/DiaryContextProvider";

ReactDOM.render(
  <DiaryContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DiaryContextProvider>,
  document.getElementById("root")
);
