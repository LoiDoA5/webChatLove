import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import { useHistory } from "react-router-dom";

const RoomList = () => {
  const [listRoom, setListRoom] = useState([])
  const history = useHistory();


  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('user'))
    axios.defaults.headers.common['Authorization'] = `Token ${userLogin.token}`
    axios.get('http://127.0.0.1:8000/api/rooms/rooms/')
    .then(function (response) {
        setListRoom(response.data.results)
    })
    .catch(function (error) {
        console.log(error);
    })
  }, []);

  const joinRoom = (index) => {
    axios.post('http://127.0.0.1:8000/api/rooms/rooms/' + index +'/add_user/')
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
    <div>
        <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Room</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listRoom && listRoom.map((item, index) => (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{item.name}</td>
                <td><Button color="primary" onClick={() => joinRoom(item.id)}>Join</Button></td>
            </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
}

export default RoomList;