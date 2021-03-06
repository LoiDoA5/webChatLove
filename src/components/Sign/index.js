import React, { useState } from "react";
import { Button, Alert, FormGroup, Label, Input, Row, Col } from "reactstrap";
import ButtonAppBar from "./appbar";
import Dropmenu from "./dropmenu";
import Footer from "./footer";
import "./Sign.scss";
import axios from "axios";
import config from "../../config";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const [creds, setCreds] = useState({});
  const history = useHistory();

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyConfirmPassword, setEmptyConfirmPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [isInValidEmail,setIsInValidEmail] = useState(false);
  const [isExistUser,setIsExistUser] = useState(false);

  const sign = (e) => {
    e.preventDefault();
     

    if (!creds.email) {
      setEmptyEmail(true);
    }
    if (!creds.password) {
      setEmptyPassword(true);
    }

    if (!creds.confirmPassword) {
      setEmptyConfirmPassword(true);
    }

    if (creds.password !== creds.confirmPassword) {
      setWrongPassword(true);
      return;
    }

    //  let isFull =Object.value(this.valueChangePassword).every(x => !!x)
    //  valueChangePassword: {
    //    oldPassworld:'',
    //    newPassworld1: '',
    //    newPassworld2: '',
    //  },

    

    axios
      .post(`${config.API_PATH}/accounts/users/`, creds)

      .then(function (response) {
       
        
        if(response.status === 201) {
          history.push("/");
        }
        


      })
      .catch(function (error) {
        if (error.response) {
          const errorText = error.response.data.email[0]
          if (errorText === 'Enter a valid email address.'){
            setIsInValidEmail(true);
          }

          const errorText2 = error.response.data.email[0]
          if (errorText2 === 'user with this email already exists.') {
            setIsExistUser(true);
          }


          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      });
  };

  const updateParam = (e) => {
    if (e.target.name === 'email') {
      setEmptyEmail(false);
      setIsInValidEmail(false);
      setIsExistUser(false);
     
    }

    if (e.target.name === "password") {
      setEmptyPassword(false);
      setWrongPassword(false);
    }

    if (e.target.name === "confirmPassword") {
      setEmptyConfirmPassword(false);
      setWrongPassword(false);
    }

    let params = {};
    // e.target.name la` name of input
    params[e.target.name] = e.target.value;
    setCreds((prevState) => ({ ...prevState, ...params }));
  };

  return (
    <div>
      <Row className="appbar">
        <ButtonAppBar className="buttonapp" />
      </Row>

      <Row className="login"></Row>

      <Row className="email">
        <Col sm="5" className="col5">
          <ul
            style={{ maxWidth: "70%" }}
            method="post"
            action=""
            className="font"
          >
            <p>??i???u Kho???n D???ch V???</p>

            <li>Ng?????i d??ng cung c???p th??ng tin ch??nh x??c c???a ch??nh m??nh.</li>
            <li>
              Ng?????i d??ng s??? d???ng t??n th???t c???a m??nh tr??n gi???y t??? h???p ph??p ????? ????ng
              k?? s??? d???ng d???ch v???.
            </li>
            <li>
              M???i Ng?????i d??ng ch??? s??? d???ng m???t t??i kho???n c???a ch??nh m??nh s??? d???ng
              d??ng th???i gian v??o c??c m???c ????ch c?? nh??n.
            </li>
            <li>
              Ng?????i d??ng kh??ng chia s??? m???t kh???u t??i kho???n c???a m??nh c??ng nh?? c???p
              cho ng?????i kh??c
            </li>
          </ul>
        </Col>

        <Col xs="12" sm="7" className="col7">
          <FormGroup
            style={{ maxWidth: "80%", padding: "40px" }}
            method="post"
            action=""
            className="col-12 form-signin signin"
          >
            <FormGroup>
              <Label for="exampleEmail">T??i Kho???n</Label>
            </FormGroup>
            <FormGroup>
              <Input
                color="primary"
                type="email"
                name="email"
                id="exampleEmail"
                onChange={updateParam}
                //         ? la ket qua cua if // : la ket qua cua else
                // emtyEmail la dieu kien trong if
                style={{ borderColor: emptyEmail ? "red" : "  " }}
              />


             { isInValidEmail && (
              <Alert color="danger">H??y nh???p ????ng ?????a ch??? email !</Alert>
            )} 
   
            
             { isExistUser && (
              <Alert color="danger">T??i kho???n ???? t???n t???i !</Alert>
            )} 

            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">M???t Kh???u</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                onChange={updateParam}
                //         ? la ket qua cua if // : la ket qua cua else
                // emtyEmail la dieu kien trong if
                style={{ borderColor: emptyPassword ? "red" : "" }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">X??c Nh???n M???t Kh???u</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="examplePassword"
                onChange={updateParam}
                //         ? la ket qua cua if // : la ket qua cua else
                // emtyEmail la dieu kien trong if
                style={{ borderColor: emptyConfirmPassword ? "red" : "" }}
              />
            </FormGroup>

            {/* && la if khong co else */}

            {wrongPassword && (
              <Alert color="danger">Sai M???t Kh???u , h??y nh???p l???i !</Alert>
            )}

            {/* 
             {wrongPassword ? <Alert color="danger">
              Sai password, hay nhap lai
            </Alert> : <></>}    // day la if co else  */}

            <div>
              <Button style={{ background: "#FE2E64" }} onClick={sign}>
                {" "}
                X??c Nh???n{" "}
              </Button>
            </div>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </div>
  );
};

export default SignUp;
