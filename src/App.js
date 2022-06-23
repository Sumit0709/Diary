import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import InsertDiary from "./components/inputs/InsertDiary";
import Home from "./components/diary/Home";
import Unsplash from "./unsplash/Unsplash";

function App() {

  return (
    <Fragment>
      <Switch>
        <Route path="/all-diary">
          <Home/>
        </Route>
        <Route path="/new-diary" exact>
          <InsertDiary />
        </Route>
        <Route path="/diary/:diaryId">
          <InsertDiary />
        </Route>
        <Route path='/background-selector/:diaryId'>
          <Unsplash/>
        </Route>
        <Route path="*">
          <Home/>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
