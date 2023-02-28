
import React from 'react';

import Home from '../pages/home';
import About from '../pages/About';
import {useRoutes } from 'react-router-dom';



export const MyRoutes =  () => {
    return useRoutes ([
            {path: '/', element: <Home />},
            {path: '/About', element: <About />}
        ]   
    );
}