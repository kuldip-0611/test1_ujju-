import React from "react";

import { Outlet } from 'react-router';
import Login from "../pages/Login";

const PrivateRoute = () => {
    let isLogin = (localStorage.getItem('loginData'));
    console.log(isLogin)
    return (
      (isLogin) ? <Outlet /> : <Login />
    )
}

export default PrivateRoute
  
