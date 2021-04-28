import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Row, } from 'reactstrap';
import { useHistory } from "react-router-dom";
import config from '../../config';
import "./Room.scss" ;
import Footer from '../Sign/footer';
import ButtonAppBarRoom from './appBarRoom';
 

const RoomList = () => {
  const [listRoom, setListRoom] = useState([])
  const history = useHistory();
  


  useEffect(() => {


    const userLogin = JSON.parse(localStorage.getItem('user')) 
    // Localstorage luu user dang JSON. PHAI DUNG JSON.parse de chuyen ve Object

    axios.defaults.headers.common['Authorization'] = `Token ${userLogin.token}`

     // Gan token vao axios


    axios.get(`${config.API_PATH}/rooms/rooms/`)

    .then(function (response) {
        setListRoom(response.data.results)
    })
    .catch(function (error) {
        
    })
  }, []);


  // index === item.id === id cua Room

  const joinRoom = (index) => {
    axios.post(`${config.API_PATH}/rooms/rooms/` + index +'/add_user/')

   // axios.post(`${config.API_PATH}/rooms/rooms/` + index +'/add_user/') la duong dan
  // /rooms/rooms/{id}/add_user/ tren backend

    .then(function (response) {
      if (response.status === 200){
        history.push(`/chat/${index}`);
      }
    })
    .catch(function (error) {
        console.log(error);
    })
  }


  


  return (
    <div  
    className = 'room'
    style={{background:'#FA58AC', 
    height:'100vh', width:'100%'  }} >


       <div>
      <ButtonAppBarRoom/>     
      </div>
       

        <Table className='Table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nhóm</th>
          <th>Chọn Nhóm</th>
        </tr>
      </thead>
    
      <tbody>
        {/* // item la phan tu cua listRoom => la Room */}
 
        {listRoom && listRoom.map((item, index) => (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{item.name}</td>
                <td><Button  style={{background:'#FE2E64'}}
                 onClick={() => joinRoom(item.id)}>Tham Gia </Button></td>
            </tr>
        ))}
        

      </tbody>
       

    </Table>
         <div>
         <Footer/>
        </div>
    </div>

     
  );
}

export default RoomList;