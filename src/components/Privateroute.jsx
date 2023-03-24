import React from 'react'
import {Outlet,Navigate } from 'react-router-dom'
import { isLoggedIn } from '../auth';
const Privateroute=()=> {
  
    //<Outlet/>represents the routes of user
    if(isLoggedIn()){
        return <Outlet/>
    }else{
        return <Navigate to={"/login"}/>;
    }
}

export default Privateroute