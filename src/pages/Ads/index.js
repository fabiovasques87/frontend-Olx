import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageArea} from './styled'; //puxa do css
import useApi from '../../helpers/OlxApi';

import {PageContainer} from '../../Components/MainComponents';
import AdItem from '../../Components/partials/AdItem';


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



    const[stateList, setStateList]= useState([]); //Lista dos estados
    const [categories, setCategories] = useState([]); //lista das categorias
    const [adList, setAdList] = useState([]); //lista os ultimos anuncios


    const getAdsList = async () => {
        //usar o filtros para fazer as consultas e exibir
        const json = await api.getAds({
            //pegar os ultimos anuncios...
            sort : 'desc', 
            limit:9,
            q,
            cat,
            state
        });
        //Quando receber o retorno, guarda no setAdList();
        setAdList(json.ads);
    }


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

        getAdsList(); //quando uma das states mudar....

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
                        <div className="list">
                            {adList.map((i, k)=>
                                <AdItem key={k} data={i} />
                            )} 
                         </div>           
                </div>
            </PageArea>
       </PageContainer>

        
    );
}


export default Page;

