import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../src/components/Login";
import SignUp from '../src/components/Sign';
import RoomList from "../src/components/Room";
import Chat from "../src/components/Chat";
import "./App.scss";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/list-room" exact component={RoomList} />
        <Route exact path="/chat/:room_id" component={Chat} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
