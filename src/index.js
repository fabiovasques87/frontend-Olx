import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";


import App from './App';
import Reducers from './Reducers';

const store = createStore (Reducers);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
       <BrowserRouter>
           <App />
      </BrowserRouter>
    </Provider>
);


