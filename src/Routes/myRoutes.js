
import React from 'react';

import Home from '../pages/home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';


import {useRoutes } from 'react-router-dom';



export const MyRoutes =  () => {
    return useRoutes ([
            {path: '/', element: <Home />},
            {path: '/About', element: <About />},
            {path: '/Signin', element:<Signin />},
            {path: '*', element:<NotFound />}

        ]   
    );
}