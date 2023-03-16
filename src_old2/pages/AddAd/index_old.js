import React, {useState, useRef} from "react";
import {PageArea} from './styled'; //puxa do css
import useApi from '../../helpers/OlxApi';
import {doLogin} from '../../helpers/AuthHandler';

import {PageContainer, PageTitle, ErrorMessage} from '../../Components/MainComponents';


const Page =() =>{

    const api  = useApi(); //é usado em formato de hook
    const fileField = useRef();

    const [title, setTitle] = useState('');
    const[category, setCategory] = useState ('');
    const [price, setPrice] = useState ('');
    const [priceNegotiable, setPriceNegotiable] = useState (false);
    const [desc, setDesc] = useState('');
    
    const [disabled, setDisable] = useState(false);
    const [error, setError] =  useState('');



    const handleSubmit =  async(e)=>{
    //     e.preventDefault();
    //     setDisable(true);
    //     setError(''); //se errar a senha e quando clicar para enviar, vau sumir o erro...

    //     //fazer a consulta de login
    //     const json = await api.login(email, password);

    //     if(json.error){
    //         setError(json.error);
    //     }else{
    //         //caso não tenha erro, é pq veio o token...

    //         doLogin(json.token, rememberPassword);//salva o cokkie
    //         //após salvar  o cokkie, atualiza a página...
    //         window.location.href = '/'; //manda ele para a raiz do projeto....
    //     }

    //      setDisable(false);

     }

    return (
        <PageContainer>
            <PageTitle>Postar um anuncio</PageTitle>
                <PageArea>
                    {/*se tiver erro , exibe a mensagem de erro  */}

                    {error &&                     
                        <ErrorMessage>{error}</ErrorMessage>                    
                    }
        

                    <form onSubmit={handleSubmit}>
                        <label className="area"> 
                            <div className="area--title">Título</div>
                            <div className="area--input">
                                <input 
                                    type="text"  
                                    disabled={disabled}
                                    value={title}
                                    onChange={e=>setTitle(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Categoria</div>
                            <div className="area--input">
                                <select></select>
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Preço</div>
                            <div className="area--input">
                                ....
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Preço Negociável</div>
                            <div className="area--input">
                                <input 
                                    type="checkbox"                                    
                                    disabled={disabled}
                                    checked={priceNegotiable}
                                    onChange={e=>setPriceNegotiable(!priceNegotiable)}    

                                />
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Descrição</div>
                            <div className="area--input">
                                <textarea
                                    disabled={disabled}
                                    value={desc}
                                    onChange={e=>setDesc(e.target.value)}
                                >
                                </textarea>
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Imagens (1 ou mais)</div>
                            <div className="area--input">
                                <input 
                                    type="file"
                                    disabled={disabled}
                                    ref={fileField}
                                    multiple
                                />
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button disabled={disabled}>Adicionar Anúncio</button>
                            </div>
                        </label>
                    </form>
                </PageArea>            
        </PageContainer>
    );
}


export default Page;

