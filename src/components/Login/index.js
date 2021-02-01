import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Button,
    Form,
    FormGroup,
    Input,
  } from 'reactstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [creds, setCreds] = useState({})
  const history = useHistory();

  const login = (e) => {
    e.preventDefault()
    axios.post('http://127.0.0.1:8000/api/accounts/login', creds)
        .then(function (response) {
            localStorage.setItem('user', JSON.stringify(response.data));
            axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
            history.push("/list-room");
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  const updateParam = (e) => {
    let params = {}
    params[e.target.name] = e.target.value
    setCreds(prevState => ({...prevState, ...params}))
  }

  const tryLogin = (e) => {
    if (e.which === 13) {
      login(e)
    }
  }

  useEffect(() => {
    const userLogin = localStorage.getItem('user')
    if (userLogin) {
        history.push("/list-room");
    }
  });

  return (
    <Container id={'id_login_form'}>
        <Row>
          <Form method='post' action='' className='col-12 form-signin signin'>
            <FormGroup>
              <Input name='username' placeholder={'Username'} onKeyDown={tryLogin}
                     onChange={updateParam} />
            </FormGroup>
            <FormGroup>
              <Input type="password" name='password' placeholder={'Password'} onKeyDown={tryLogin}
                     onChange={updateParam} />
            </FormGroup>
            <FormGroup>
              <Button color={'primary'} className='btn-block btn-login text-uppercase' onClick={login}>
                {'Login!'}
              </Button>
            </FormGroup>
          </Form>
        </Row>
      </Container>
  );
}


export default LoginPage;