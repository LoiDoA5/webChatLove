import React, { Component, Fragment } from 'react';
import './Chat.scss';
import Sockette from 'sockette'
import {Container, Form, Row, Input, Button,Col,} from 'reactstrap'
import classnames from 'classnames'
import config from '../../config';
import ButtonAppBarChat from './appBarChat';
 
import Footer from '../Sign/footer';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      myMess: [],
      message: '',
      rows: 1,
    }
    this.initChat = this.initChat.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.receiveMessage = this.receiveMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.rcMe = this.rcMe.bind(this)
    this.rcMes = this.rcMes.bind(this)
    this.trySend = this.trySend.bind(this)
  }

  rcMe (message) {
    let messages = this.state.messages.slice(0);
    messages.push(message)
    this.setState({ messages: messages })
  }

  rcMes (ms) {
    let messages = this.state.messages.slice(0);
    this.setState({ messages: messages.concat(ms) })
  }

  sendMessage (e) {
    e.preventDefault()
    const {message} = this.state;
    this.ws.json({
      message,
    })
    this.setState({message: ''})
  }

  trySend (e) {
    if (e.which === 13) {
      this.sendMessage(e)
    }
  }

  handleChange (e) {
    let {rows} = this.state;

    const message = e.target.value;
    rows = message.split('\n').length;
    this.setState({
      ...this.state,
      message,
    })
  }

  receiveMessage (e) {
    const data = JSON.parse(e.data)
    if (!data) {
      return;
    }

    if (data.message) {
      this.rcMe(data.message);
    }

    if (data.messages) {
      this.rcMes(data.messages);
    }
  }

  initChat (e) {
    if (this.isInitSuccess) {
      return;
    }
    this.ws.json({
      'action': 'fetch_messages',
    })
    this.isInitSuccess = true;
  }

  componentDidMount() {
    const {room_id} = this.props.match.params;
    const userLogin = JSON.parse(localStorage.getItem('user'))
    this.ws = new Sockette(config.WS_PATH + room_id + '/?' + userLogin.token, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen:  this.initChat,
      onmessage: this.receiveMessage,
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    });
  }

  render() {
    let lastUsername = ''
    const userLogin = JSON.parse(localStorage.getItem('user'))


    return (
      <Fragment style={{height:'100vh'}} >

      <ButtonAppBarChat/>

       <div style={{backgroundColor: '#fa58ac'}}>
        <Container fluid className='chatRoom'
         style={{height:'100vh'}}>
                  <div className='messages'>
                    {
                      this.state.messages !== undefined && this.state.messages.map((message, index) => {
                        let displayUsername = false;
                        if (lastUsername !== message.username) {
                          displayUsername = true;
                          lastUsername = message.username
                        }
                        return (
                          <div className={classnames({
                            'd-flex': true,
                            'flex-row': !message.username !== userLogin.username,
                            'flex-row-reverse': message.username === userLogin.username,
                          })} key={index}>
                            <div className='message p-2'>
                              {
                                displayUsername && (
                                  <strong>{message.username}: </strong>
                                )
                              }
                              {message.message}
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className='chat-enter-message-box' style={{position: 'absolute', 
                  bottom: 0, width: '96%', display: 'flex', flexDirection: 'row'}}>
                    <Input type='textarea' name='message'
                     onKeyDown={this.trySend}
                    style={{ maxWidth: "100%" }}
                    onChange={this.handleChange} 
                    value={this.state.message}
                           rows={this.state.message.split('\n').length}/>
                    <Button style={{background:'#FE2E64'}} 
                    onClick={this.sendMessage}
                    >
                      {"Gửi"}
                    </Button>
                  </div>
        </Container>
       


        
        </div>
       
   
      
      </Fragment>
    )
  }
}
