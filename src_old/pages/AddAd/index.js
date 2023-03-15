import React, {useState,useEffect, useRef} from "react";
import MaskedInput from "react-text-mask";
import  createNumberMask  from "text-mask-addons/dist/createNumberMask";
import {PageArea} from './styled'; //puxa do css
import useApi from '../../helpers/OlxApi';


import {PageContainer, PageTitle, ErrorMessage} from '../../Components/MainComponents';
import { useNavigate } from "react-router-dom";


const Page =() =>{

    const api  = useApi(); //é usado em formato de hook
    const fileField = useRef();
    const history = useNavigate();

    const [categories, setCategories] = useState([]);  //Lista toda...

    const [title, setTitle] = useState('');
    const[category, setCategory] = useState ('');  //item selecionado
    const [price, setPrice] = useState ('');
    const [priceNegotiable, setPriceNegotiable] = useState (false);
    const [desc, setDesc] = useState('');
    
    const [disabled, setDisabled] = useState(false);
    const [error, setError] =  useState('');

    useEffect(()=>{
        const getCategories = async ()=>{
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    },[]);

    const handleSubmit =  async(e)=>{
     e.preventDefault();
     setDisabled(true);
     setError(''); //limpa os erros

     let errors = [];
     //se digitou um titulo
    // trim, remove os espaços

    if(!title.trim()){
        error.push('Sem Título');
    }

    //caso nao tenha uma categoria selecionada...
    if(!category){
        errors.push('Sem categoria');
    }

    //se algum erro passou pelas condições adima...
    if(errors.length === 0) {
        //continua...
        const fData = new FormData();
        //adiciona os itens
        fData.append('title', title);
        fData.append('price', price);
        fData.append('priceneg', priceNegotiable);
        fData.append('desc', desc);
        fData.append('cat', category);

        //add as imagens...
        //caso tenha imagens...

        if(fileField.current.files.length > 0){
            for(let i = 0; i < fileField.current.files.length; i++){
                fData.append('img', fileField.current.files[i]);

            }
        }

        //fazendo a requisição...
        const json = await api.addAd(fData);
        //se nao gerou erro...ele manda parao proprio ID do anuncio...
        if(!json.error){
            history(`/ad/${json.id}`); //Se n huver erro, ele retorna o id do anuncio, e vai para o proprio anuncio
             return;
        }else {
            //caso de algum erro...mostra o erro
            setError(json.error); 
        }


    }else{
        //exibe os erros
        setError(errors.join("\n"));
    }

        setDisabled(false);


     }


     const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true, //inclui o separador de milhares
        thousandsSeparatorSymbol:'.', //informa o simbolo dele
        allowDecimal: true, //permitir decimais
        decimalSymbol:','//simbolo dos decimais

     });

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
                                <select
                                    disabled={disabled}
                                    onChange={e=>setCategory(e.target.value)}
                                    required
                                >
                                    <option></option>
                                    {/*Caso category exista... ele da um map */}
                                    {categories && categories.map(i=>
                                        <option key={i._id} value={i._id}>{i.name}</option>
                                    )}
                                </select>
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Preço</div>
                            <div className="area--input">
                                {/*usando o componente */}
                                <MaskedInput 
                                    mask={priceMask}
                                    placeholder="R$"
                                    disabled={disabled || priceNegotiable }     //o Preço ficará desativado quando o priceNegotiable estiver ok
                                    value={price}
                                    onChange={e=>setPrice(e.target.value)}
                                
                                />
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

