import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Button,
    Form,
    FormGroup,
    Input,
    Col,
  } from 'reactstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import config from '../../config';
import "./Login.scss";


const LoginPage = () => {
  const [creds, setCreds] = useState({})
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault()
   
    // axios la ten thu vien de call API
    // post la api http method la phuong thuc de call API,
 
    //                url api path,                 data
    const response = await axios.post(`${config.API_PATH}/accounts/login`, creds)

    localStorage.setItem('user', JSON.stringify(response.data));
        // Moi lan Login phai dung dong` code nay`

        axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
        // Gan token vao axios

        history.push("/list-room");

    // http://chatapp-afive.herokuapp.com/api/accounts/users/ , TRUYEN DATA
    // cach lay URL


    
    // . then va. catch la promise 
    // response la du lieu ca backend tra ve
      // .then(function (response) {
      //   // response = {
      //   //   status_code: 200,
      //   //   data: {
      //   //     user_info: {},
      //   //     token: '35812527547812521'
      //   //   }
      //   // }
      //   localStorage.setItem('user', JSON.stringify(response.data)); // nghia la dat user co gia tri là reponse.data dang string
      //   // Moi lan Login phai dung dong` code nay`
      //   axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
      //   history.push("/list-room");
      // })
      // .catch(function (error) {
      //   console.log(error);
      // })
  }

  const updateParam = (e) => {
    let params = {}
    // e.target.name la` name of input
    params[e.target.name] = e.target.value
   
    


    
        
    // sau khi nhap username
    // params = {
    //   'username': 'admin',
    // }
    // prevState = {}

    // creds == {...prevState, ...params} == {'username': 'admin'}

    // ------------------------------------------------------------
    // sau khi nhap password
    // params = {'password': 123}
    // prevState == creds == {'username': 'admin'}

    // creds == {...prevState, ...params} == {'username': 'admin', 'password': 123}

    // XU LY TRONG COMPONENT SIGN
    // data = {
    //   'email': "nam@gmail.com",
    //   'password': '123',
    //   'repassword': '123'
    // }

    setCreds(prevState => ({...prevState, ...params}))
  }

  const tryLogin = (e) => {
    if (e.which === 13) {
      console.log('HEloo enter')
      login(e)
    }
  }

  const signUp = () => {
    history.push("/sign-up");
  }
  

  useEffect(() => {
    const userLogin = localStorage.getItem('user')
    if (userLogin) {
        history.push("/list-room");
    }
  });



  return (
    <Container id={'container-login'}>
        <Row className='row-login' style={{width:'100%'}} >
          <Form style={{width:'30%'}} >
            <FormGroup >
              <Input   name='username' placeholder={'Tài Khoản'} onKeyDown={tryLogin}
                     onChange={updateParam} />
            </FormGroup>
            <FormGroup>
              <Input type="password" name='password' placeholder={'Mật Khẩu'} onKeyDown={tryLogin}
                     onChange={updateParam} />
            </FormGroup>
            <FormGroup>
      
             <Row> 
              
             <Col   sm='6'> 
                  <Button    
                   style={{background:'#FA58AC'}}
                  className='btn-block btn-login text-uppercase' 
                  onClick={login}>
                    {'LOGIN'}
                   </Button>
                </Col>
          


                <Col   sm='6'> 
                  <Button    
                  style={{background:'#FA58AC'}}
                  className='btn-block btn-login text-uppercase' 
                  onClick={signUp}>
                    {'SIGN'}
                   </Button>
                </Col>


              </Row>
            </FormGroup>
          </Form>
        </Row>
      
      </Container>
     
  );
}


export default LoginPage;
