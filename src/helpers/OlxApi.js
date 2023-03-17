import Cookies from "js-cookie";
import qs from "qs";

const BASEAPI = 'http://192.168.0.109:5000';

const apiFetchFile = async (endpoint, body) =>{

    //se não estiver enviando nemhum tipo de token...   
    if(!body.token){
        //pega o que está no cookie...
        let token = Cookies.get('token');
        //se realmente existe e está preenchido...
        if(token){
            body.append('token', token);
        }
    }

    const res = await fetch(BASEAPI+endpoint,{
        method: 'POST',
        body
    });
    const json = await res.json();
    //recebe a resposta do json...
    if(json.notallowed){
        window.location.href = '/signin';
        return; //para finalizar a execução
    }
    return json; //caso não tenha a notallowed ele retorna o proprio resultado da requisissão

}



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
    },

    register: async (name, email, password, stateLoc) => {
        //após receber as informações como parametro na função vindas do signUp
        //ele faz a requisição ao web service...
        const json = await apiFetchPost(
            '/user/signup',
            //body: corpo da página...
            {name, email, password, state: stateLoc}
        );
        return json; //vai retornar com erro ou com o token de sucesso...
    },

    getStates: async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;   //retorna o estados do banco
    },



    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },
    getAds: async (options)  => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },
    getAd : async (id, other = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        );
        return json;
    },

    addAd: async (fData) =>{
        //enviar arquivos para api
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        //retorna o resultado
        return json;
    }
};


export default  ()=>OlxApi; //função que retorna o objeto acima...