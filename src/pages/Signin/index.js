import React, {useState} from "react";
import {PageArea} from './styled'; //puxa do css
import useApi from '../../helpers/OlxApi';
import {doLogin} from '../../helpers/AuthHandler';

import {PageContainer, PageTitle, ErrorMessage} from '../../Components/MainComponents';


const Page =() =>{

    const api  = useApi(); //é usado em formato de hook

    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [rememberPassword, setrememberPassword] = useState(false);
    const [disable, setDisable] = useState(false);
    const [error, setError] =  useState('');



    const handleSubmit =  async(e)=>{
        e.preventDefault();
        setDisable(true);

        //fazer a consulta de login
        const json = await api.login(email, password);

        if(json.error){
            setError(json.error);
        }else{
            //caso não tenha erro, é pq veio o token...

            doLogin(json.token, rememberPassword);//salva o cokkie
            //após salvar  o cokkie, atualiza a página...
            window.location.href = '/'; //manda ele para a raiz do projeto....
        }

    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
                <PageArea>
                    {/*se tiver erro , exibe a mensagem de erro  */}

                    {error &&                     
                        <ErrorMessage>{Error}</ErrorMessage>                    
                    }


                    <form onSubmit={handleSubmit}>
                        <label className="area"> 
                            <div className="area--title">Email</div>
                            <div className="area--input">
                                <input 
                                    type="email"  
                                    disabled={disable}
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
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
                                 />
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Lembrar senha</div>
                            <div className="area--input">
                                <input type="checkbox" 
                                className="checkbox" 
                                disabled={disable}
                                checked={rememberPassword}
                                onClick={()=>setrememberPassword(!rememberPassword)}
                                />
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button disabled={disable}>Login</button>
                            </div>
                        </label>
                    </form>
                </PageArea>            
        </PageContainer>
    );
}


export default Page;

