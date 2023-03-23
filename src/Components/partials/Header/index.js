
import React from "react";
import { Link, json } from "react-router-dom";
import {HeaderArea} from './styled';


import { isLogged, doLogout, doLogin, getToken } from "../../../helpers/AuthHandler";

import {useState, useEffect} from 'react';

import useApi from '../../../helpers/OlxApi';






export const Header = () =>{
    const logged = isLogged();

   

    const  handkeLogout = () => {
        doLogout(); //fazer logout...
        window.location.href = '/'; //redireciona para o inicio
    }

    const api = useApi();
    
    const [welcome , setWelcome] = useState ({});
    const token = getToken();
    //const token = '$2b$10$Z2IX7DS8ubIQceo/IDHj9uhtoqhGzAjw5ftPAHh6cfWrwdrwIvwKO';


    // const getInfo = async (token) =>{
    //     const info = await useApi.getInfo();
    //     setWelcome(info);
    // }
    // getInfo(token);
// const getUserData = async (token) => {

//     try {
//         const response = await fetch('http://192.168.0.109:5000/user/me', {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: '$2b$10$Z2IX7DS8ubIQceo/IDHj9uhtoqhGzAjw5ftPAHh6cfWrwdrwIvwKO'
//           }
//         });
//         const userData = await response.json();
//         alert(userData);
//         return userData;
       
//       } catch (error) {
//         console.error(error);
//         alert(error);
//       } 

//     }






    // const token = '$2b$10$xdNODhuMyeiYPABWuVnQ.OrY9bn3eYli9am4Erq3DdxEwDPJ26RZu';
    const url = 'http://192.168.0.109:5000/user/me';
  
    // const fetchData = async () => {
    //     const token = '$2b$10$xdNODhuMyeiYPABWuVnQ.OrY9bn3eYli9am4Erq3DdxEwDPJ26RZu';
    //     const response = await fetch('http://192.168.0.109:5000/user/me', {
    //       method: 'GET',
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //       }
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //   }
  
  
// useEffect(()=>{
//      fetchData();
// },[]);

//      const token = '$2b$10$rIWpryvQbkb71xembwyLjOoN64a8A1XZZG1dOS9O8E75SWoUWJoKO';


    
        useEffect (()=>{
            if(logged){
                    const getInfo = async () =>{
                        const slist = await api.getInfo(token);
                        setWelcome(slist);
                    }
                getInfo();
            }
            
        },[]);
    


    return (
        <HeaderArea> 
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <span className="logo-1">O</span>
                        <span className="logo-2">L</span>
                        <span className="logo-3">X  </span>

                    </Link>
                </div>
                <nav>
                    <ul>
                        {/* verifica se está logado aparecerá menus diferentes
                         do que se não estiver logado... */}
                        {logged &&
                        
                            <>
                              {/* Quando  estiver logado... */}
                              <li>
                             <div className="welcome"><span> Bem Vindo: </span>{welcome.name} </div>  

                            </li> 
                            <li>
                                <Link to="/my-account">Minha Conta</Link>
                            </li>
                                           
                            <li>
                                <button onClick={handkeLogout}>Sair</button>
                            </li>
                            <li>
                                <Link to="/post-an-ad" className="button">Poste um anuncio</Link>
                            </li>

                            
                            </>
                        }
                        {!logged && 
                        
                            <>
                            
                                {/* Quando não estiver logado... */}
                            <li>
                                <Link to="/signin">Login</Link>
                            </li>
                            <li>
                                <Link to="/signUp">Cadastrar</Link>
                            </li>
                            <li>
                                <Link to="/signin" className="button">Poste um anuncio</Link>
                            </li>

                            
                            </>
                        
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}


