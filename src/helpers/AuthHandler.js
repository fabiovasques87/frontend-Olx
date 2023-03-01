
import  Cookies from 'js-cookie';


export const isLogged = () => {
    let token = Cookies.get('token');
    //return, caso o token exista, retornará true, caso não exista, retornará falso.
    return (token) ? true : false;
}