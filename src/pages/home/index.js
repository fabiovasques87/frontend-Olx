import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {SearchArea, PageArea} from './styled'; //puxa do css
import useApi from '../../helpers/OlxApi';

import {PageContainer} from '../../Components/MainComponents';


const Page =() =>{

    const api  = useApi(); //é usado em formato de hook

    const[stateList, setStateList]= useState([]); //Lista dos estados
    const [categories, setCategories] = useState([]); //lista das categorias

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

        <>
        
            <SearchArea>
                <PageContainer>
                    {/*área de busca */}
                    <div className="searchBox"> 
                        <form method="GET" action="ads">
                            <input type="text" name="q" placeholder="o qye você procura?" />
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
                   ...
                </PageArea>            
        </PageContainer>
        </>

        
    );
}


export default Page;

