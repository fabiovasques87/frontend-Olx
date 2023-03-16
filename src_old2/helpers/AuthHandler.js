
import  Cookies from 'js-cookie';


export const isLogged = () => {
    let token = Cookies.get('token');
    //return, caso o token exista, retornará true, caso não exista, retornará falso.
    return (token) ? true : false;
}

export const doLogin = (token, rememberPassword = false) =>{
    //se tiver que setar um cookie que não expira tão rápido, ou sejá que não foi marcado a opção de lembrar a senha...
    if(rememberPassword){
        Cookies.set('token', token, {expires:999}); //irá demorar 999 dias para expirar
    }else{
        //caso não sejá para lemrar a senha ...
        Cookies.set('token', token);


    }
}

//Processo de logout
export const doLogout = () => {
    Cookies.remove('token');
}