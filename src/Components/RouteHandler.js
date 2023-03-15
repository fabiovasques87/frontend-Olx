
import { Navigate } from "react-router-dom"; //componente navigate
import { isLogged } from "../helpers/AuthHandler";

import React from 'react';

const RouteHandler = ({children}) =>{

    const logged = isLogged(); //se está logado...

    if (logged){
        return children;
    }else {
        return <Navigate to="/signin" />
    }
   
 }

export default RouteHandler;