
import React from 'react';

import Home from '../pages/home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import SignUp from '../pages/SignUp';


import {useRoutes } from 'react-router-dom';



export const MyRoutes =  () => {
    return useRoutes ([
            {path: '/', element: <Home />},
            {path: '/About', element: <About />},
            {path: '/Signin', element:<Signin />},
            {path: '/SignUp', element:<SignUp />},
            {path: '*', element:<NotFound />}

        ]   
    );
}