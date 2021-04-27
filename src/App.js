import React, { Component } from "react";
import "./App.scss";
import InitChat from "./components/InitChat";
// import Chat from './components/Chat'
// import WebSocketInstance from './services/WebSocket'
import LoginPage from "./components/Login";
 
 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loggedIn: false,
    };
  }

  render() {
    const {
      loggedIn,
      // username
    } = this.state;

    return (
      <div className="App">
        {!loggedIn ? (
          <LoginPage />
        ) : (
          // <Chat
          //   currentUser={username}
          // />
          // :
          <InitChat
            onSubmit={this.handleLoginSubmit}
            usernameChangeHandler={this.usernameChangeHandler}
          />
        )}
        
      </div>
    );
  }
}
