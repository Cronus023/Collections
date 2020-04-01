import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
 
function RightMenu(props) {
  const user = useSelector(state => state.user)
  let id = null
  if(user.userData) id = user.userData._id

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <div >
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href={`/collections/upload/${id}`}>New collection</a>
        </Menu.Item>
        <Menu.Item key="get">
          <a href={`/collections/get/${id}`}>My collections</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
      </div>
    )
  }
}

export default withRouter(RightMenu);

