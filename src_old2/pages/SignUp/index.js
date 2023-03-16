import React, {useState, useEffect} from "react";
import {PageArea} from './styled'; //puxa do css
import useApi from '../../helpers/OlxApi';
import {doLogin} from '../../helpers/AuthHandler';

import {PageContainer, PageTitle, ErrorMessage} from '../../Components/MainComponents';


const Page =() =>{

    const api  = useApi(); //é usado em formato de hook



    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [stateList, setStateList] = useState([]);

    const [disable, setDisable] = useState(false);
    const [error, setError] =  useState('');

    useEffect (()=>{
        const getStates = async () =>{
            const slist = await api.getStates(); //slist vai receber a lista do estados, vindo da api, web service
            setStateList(slist);
        }
        getStates();
    },[]);

    const handleSubmit =  async(e)=>{
        e.preventDefault();
        setDisable(true);
        setError(''); //limpa o erro


        //verificar os campos senha e confirmar senha, se são iguais...
        if(password !== confirmPassword){
            setError('Senhas não são iguais...');
            setDisable(false);
            return;
        }


        //fazer a consulta

        const json = await api.register(name, email, password, stateLoc); //envia todos os campos para o olxApi

        if(json.error){
            setError(json.error);
        }else{
            //caso não tenha erro, é pq veio o token...

            doLogin(json.token);
            //após salvar  o cokkie, atualiza a página...
            window.location.href = '/'; //manda ele para a raiz do projeto....
        }

         setDisable(false);

    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
                <PageArea>
                    {/*se tiver erro , exibe a mensagem de erro  */}

                    {error &&                     
                        <ErrorMessage>{error}</ErrorMessage>                    
                    }
        

                    <form onSubmit={handleSubmit}>
                        <label className="area"> 
                            <div className="area--title">Nome Completo</div>
                                <div className="area--input">
                                    <input 
                                        type="text"  
                                        disabled={disable}
                                        value={name}
                                        onChange={e=>setName(e.target.value)}
                                        required
                                    />                                    
                                </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Estado</div>
                                <div className="area--input">
                                    <select value={stateLoc}  onChange={e=>setStateLoc(e.target.value)} required>
                                        <option> </option>
                                        {stateList.map((i, k)=>(
                                            <option key={k} value={i._id}>{i.name}</option>
                                        ))}
                                    </select>
                                </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Email</div>
                            <div className="area--input">
                                <input 
                                    type="email"  
                                    disabled={disable}
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Senha</div>
                            <div className="area--input">
                                <input type="password"
                                 disabled={disable}
                                 value={password}
                                 onChange={e=>setPassword(e.target.value)}
                                 required
                                 />
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Confirmar Senha</div>
                            <div className="area--input">
                                <input type="password"
                                 disabled={disable}
                                 value={confirmPassword}
                                 onChange={e=>setConfirmPassword(e.target.value)}
                                 required
                                 />
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button disabled={disable}>Fazer Cadastro</button>
                            </div>
                        </label>
                    </form>
                </PageArea>            
        </PageContainer>
    );
}


export default Page;

