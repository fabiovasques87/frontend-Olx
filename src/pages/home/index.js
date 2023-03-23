import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {SearchArea, PageArea} from './styled'; //puxa do css
import useApi from '../../helpers/OlxApi';

import {PageContainer} from '../../Components/MainComponents';
import AdItem from '../../Components/partials/AdItem';


const Page =() =>{

    const api  = useApi(); //é usado em formato de hook

    const[stateList, setStateList]= useState([]); //Lista dos estados
    const [categories, setCategories] = useState([]); //lista das categorias
    const [adList, setAdList] = useState([]); //lista os ultimos anuncios

    //vai pegar os estados
    useEffect (()=>{
        const getStates = async () =>{
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    },[]);


    //vai pegar os anuncios recentes
    useEffect (()=>{
        const getRecentsAds = async () =>{
            const json = await api.getAds({
                //pegar os ultimos anuncios...
                sort : 'desc', 
                limit:8
            });
            //Quando receber o retorno, guarda no setAdList();
            setAdList(json.ads);
        }
        getRecentsAds();
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

        <>
        
            <SearchArea>
                <PageContainer>
                    {/*área de busca */}
                    <div className="searchBox"> 
                        <form method="GET" action="ads">
                            <input type="text" name="q" placeholder="o que você procura?" />
                            <select name="state">
                               {stateList.map((i, k)=>(
                                    <option key={k} value={i.name}>{i.name}</option>
                               ))}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    
                    </div>
                      {/*área de categoria */}
                    <div className="categoryList">
                        {categories.map((i,k)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem" >
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                   <h2>Anuncios recentes</h2>
                   <div className="list">
                        {adList.map((i,k)=>
                            <AdItem key={k} data={i} /> //as infornações irão estar em i
                        )}
                   </div>
                   <Link to="/ads" className="seeAllLink"> Ver todos</Link>
                   <hr />


                   Lorem Ipsum é simplesmente uma simulação de texto da indústria 
                   tipográfica e de impressos, e vem sendo utilizado desde o século XVI,
                    quando um impressor desconhecido pegou uma bandeja de tipos e os 
                    embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não

                </PageArea>            
        </PageContainer>
        </>

        
    );
}


export default Page;

