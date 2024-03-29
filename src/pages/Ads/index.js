import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageArea} from './styled'; //puxa do css
import useApi from '../../helpers/OlxApi';

import {PageContainer} from '../../Components/MainComponents';
import AdItem from '../../Components/partials/AdItem';

let timer; //para a requisição aguardar um tempo para ser executada, caso contrário, a cada letra digitada ele vai fazer reuisição


const Page =() =>{

    const api  = useApi(); //é usado em formato de hook
    const history = useNavigate();



    const useQueryString = () => {   //pegar a querystring que vem da URL. ex: cat=sports

        return new URLSearchParams (useLocation().search);
    }
    
    const query = useQueryString();



    //Guarda as queryStrings na state
     const[q, setQ] = useState(query.get('q') != null ? query.get('q') : '');  //se não for nulo, pega o valor de verdade....e pega o proprio valor
     const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
     const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');
     const [resultopacity, setResultOpacity] = useState (1);
     const [WarningMessage, setWarningMessage] = useState('carregando....');
     const[loading, setLoading] = useState(true);


    const [adsTotal, setAdsTotal] = useState(0); //state que mostra quantos itens tem para poder fazer a páginação
    const[stateList, setStateList]= useState([]); //Lista dos estados
    const [categories, setCategories] = useState([]); //lista das categorias
    const [adList, setAdList] = useState([]); //lista os ultimos anuncios
    const [pageCount, setPageCount] = useState(0);    //Quantas páginas irão ter a páginação
    const [currentPage, setCurrentPage] = useState(1); //Informa qual é a ppágina atual


    //fazer a busca...
    const getAdsList = async () => {
        setLoading(true);//mensagem de carregando
        //usar o filtros para fazer as consultas e exibir

        let offset = (currentPage -1) * 2; //multiplpica o numero de páginas pela quantidade de páginas que se desejpa exibir


        const json = await api.getAds({
            //pegar os ultimos anuncios...
            sort : 'desc', 
            limit:2,
            q,
            cat,
            state,
            offset   //pula os anuncios conforme a quantidade de anuncios que se deseja pegar...
        });
        //Quando receber o retorno, guarda no setAdList();
        setAdList(json.ads);
        setAdsTotal(json.total); //recebe  total para controlar a páginação
        setResultOpacity(1); //Quando concluiu a pesquisa dos itens, a opacidade do item fica em 1
        setLoading(false);//termina a mensagem de carregando da pesquisa
    }

    //toda a vez que adsTotal moificar, modifica a quantidade de páginas....

    useEffect(()=>{
           /*setar a quantidade de páginas, ceil-> arredonda sempre para cima, 
             divide o total pela quantidade de anuncios que possui na lista*/
             if(adList.length > 0 ){ 
                    setPageCount(Math.ceil(adsTotal / adList.length) ); 
             }else {
                setPageCount(0); //se n tiver anuncio, n tem páginação
             }
    },[adsTotal]);

    //executa a consulta e modifica os items conforme clica nos botões da páginação
    useEffect(()=>{
        setResultOpacity(0.3);
        getAdsList();
    },[currentPage]);

    //faz o monitoramento da galera
    useEffect(()=>{

        let queryString = [];
        if(q){
            queryString.push(`q=${q}`);
        }
        if(cat){
            queryString.push(`cat=${cat}`);
        }
        if(state){
            queryString.push(`state=${state}`);
        }

        history({
            search: `?${queryString.join('&')}`  //queryString.join para juntar todo mundo e separa por &...
        });


        //ajusta para a requisição acontecer mais lentamete...não a cada letra pressionada no campo pesquisa...
        if(timer){
            //reseta o timer
            clearTimeout(timer);
        }

        timer = setTimeout(getAdsList, 2000); //limpa e seta o timer
        setResultOpacity(0.3); //altera a opacidade dos itens até a conclusão da pesquisa aqui é o processo de busca....
        setCurrentPage(1); //zera a página atual dentro da páginação

    },[q,cat,state]);


    //vai pegar os estados
    useEffect (()=>{
        const getStates = async () =>{
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    },[]);




    //vai pegar as categorias
    useEffect (()=>{
        const getCategories = async () =>{
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    },[]);


    //criacao da paginação
    let  pagination = [];
    for (let i = 1; i <=pageCount; i++ ){
        pagination.push(i);
    }

    return (

       <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input 
                            type="text" 
                            name="q" 
                            placeholder="o que você procura?" 
                            value={q}
                            onChange={e=>setQ(e.target.value)}
                        />

                        <div className="filterName">Estado:</div>
                            <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                                <option></option>
                                {stateList.map((i, k)=>
                                    <option value={i.name} key={k}>{i.name}</option>
                                )}
                            </select>

                        <div className="filterName">Categoria:</div>
                            <ul>
                                {categories.map((i,k)=>
                                    <li 
                                        key={k} 
                                        className={cat == i.slug? 'categoryItem active' : 'categoryItem'} /* troca a classe... */
                                        onClick={()=>setCat(i.slug)}
                                        > 
                                        <img src={i.img} alt />
                                        <span>{i.name}</span>
                                    </li>
                                )}
                            </ul>


                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultados</h2>
                    {loading && adList.length === 0 &
                       <div className="listWarning">Carregando</div> //se está carregando...
                    }
                    {!loading && adList.length === 0 && //Quando nao estiver carregando e n estiver resultados.... 
                        <div className="listWarning">Não foi encoontrado resultados para a pesquis</div>
                    } 
                        <div className="list" style={{opacity:resultopacity}}>
                            {adList.map((i, k)=>
                                <AdItem key={k} data={i} />
                            )} 
                        </div>   

                         {/* iniciando a páginação */}          
                                <div className="pagination">
                                         {/* itens de páginação */}
                                         {pagination.map((i, k)=>
                                         //setcurrentPage(i)vai para página atual
                                            <div onClick={()=>setCurrentPage(i)} className={i === currentPage? 'pagItem active': 'pagItem'}>{i} </div> //i é o número da página
                                         )}
                                </div>


                </div>
            </PageArea>
       </PageContainer>

        
    );
}


export default Page;

