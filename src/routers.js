import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from '../src/components/Login';
import RoomList from '../src/components/Room';
import Chat from '../src/components/Chat';

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={LoginPage} />
        <Route path="/list-room" exact component={RoomList} />
        <Route exact path="/chat/:room_id" component={Chat} />
      </div>
    </Router>
  );
}

export default AppRouter;
