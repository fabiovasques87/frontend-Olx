import Cookies from "js-cookie";
import qs from "qs";

const BASEAPI = 'http://localhost:5000';

const apiFetchPost = async (endpoint, body) => {

    //se não estiver enviando nemhum tipo de token...
    if(!body.token){
        //pega o que está no cookie...
        let token = Cookies.get('token');
        //se realmente existe e está preenchido...
        if(token){
            body.token = token; //ele add o token...
        }
    }

    const res = await fetch(BASEAPI+endpoint,{
        method: 'POST',
        // headers:{
        //     'Accept': 'application/json',
        //     'Content-type': 'application/json; charset=UTF-8'
        // },
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(body)
    });
    const json = await res.json();
    //recebe a resposta do json...
    if(json.notallowed){
        window.location.href = '/signin';
        return; //para finalizar a execução
    }
    return json; //caso não tenha a notallowed ele retorna o proprio resultado da requisissão

}


const apiFetchGet = async (endpoint, body = []) => {

    //se não estiver enviando nemhum tipo de token...
    if(!body.token){
        //pega o que está no cookie...
        let token = Cookies.get('token');
        //se realmente existe e está preenchido...
        if(token){
            body.token = token; //ele add o token...
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();
    //recebe a resposta do json...
    if(json.notallowed){
        window.location.href = '/signin';
        return; //para finalizar a execução
    }
    return json; //caso não tenha a notallowed ele retorna o proprio resultado da requisissão

}


const OlxApi = {

    login: async(email, password) => {
        //fazer consulta ao webService...
        //return {error: "Funcionalidade imcompleta"};

        const json = await apiFetchPost(
            //Endpoint para fazer o login...
            '/user/signin',
            {email, password}
        );
        return json;
    }
};


export default  ()=>OlxApi; //função que retorna o objeto acima...