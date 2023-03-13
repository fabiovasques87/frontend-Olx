
 import React from 'react';
 import {Routes , Route} from 'react-router';

 
import RouteHandler from '../Components/RouteHandler';

import Home from '../pages/home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import SignUp from '../pages/SignUp';
import AdPage from '../pages/AdPage';


//import {useRoutes } from 'react-router-dom';


const App = () => {

return (
    <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/About' element={ <About /> } />
        <Route path='/Signin' element={ <Signin /> } />
        <Route path='/SignUp' element={ <SignUp /> } />
        <Route path='/ad/:id' element={ <AdPage /> } />
        <Route path='/post-an-ad' element={ <RouteHandler><About /></RouteHandler> } />
        <Route path='*' element={ <NotFound /> } />
        {/* <Route path='/About' element={ <About /> } />
        <Route path='/Signin' element={ <Signin/> } />
        <Route path='/SignUp' element={ <SignUp /> } />
        <Route path='/ad/:id' element={ <AdPage /> }/>
        <Route path='*' element={ <NotFound /> }/> */}


        {/* <RouteHandler path='/' element={ <Home /> }></RouteHandler>
        <RouteHandler path='/About' element={ <About /> }></RouteHandler>
        <RouteHandler path='/Signin' element={ <Signin/> }></RouteHandler>
        <RouteHandler path='/SignUp' element={ <SignUp /> }></RouteHandler>
        <RouteHandler path='/ad/:id' element={ <AdPage /> }></RouteHandler>
        <RouteHandler path='*' element={ <NotFound /> }></RouteHandler>
 */}
    </Routes>
);



}

export default App;

// export const MyRoutes =  () => {
//     return RouteHandler ([
//             {path: '/', element: <Home />},
//             {path: '/About', element: <About />},
//             {path: '/Signin', element:<Signin />},
//             {path: '/SignUp', element:<SignUp />},
//             {path: '/ad/:id', element:<AdPage />},
//             {path: '*', element:<NotFound />}

//         ]   
//     );
// }