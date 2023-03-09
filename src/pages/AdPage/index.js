import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {PageArea, Fake} from './styled'; //puxa do css
import useApi from '../../helpers/OlxApi';

import {PageContainer} from '../../Components/MainComponents';


const Page =() =>{

    const api  = useApi(); //é usado em formato de hook

    const {id} = useParams();
    
    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({}); //armazena as informações do anuncio...

    //puxar as informações do anuncio especifico...
    useEffect(()=>{
        const getAdInfo = async (id) =>{
            const json = await api.getAd(id, true);  //true se quiser mais informações do mesmo vendedor(anunciante)
            setAdInfo(json); // logo após pegar as informações...
            setLoading(false);
        }   
        getAdInfo(id);
    }, []);

    return (
        <PageContainer>
                <PageArea>                   
                    <div className="leftSide">
                        <div className="box">
                            <div className="adImage">
                                 {/*Quando estiver carregando.... usa o componente fake */}
                                 {loading && <Fake  height={300}/> }
                            </div>
                            <div className="adInfo">
                                <div className="adName">
                                    {/*Quando estiver carregando.... usa o componente fake */}
                                    {loading && <Fake  height={20}/> }
                                    {/*Se existir... */}

                                    {adInfo.title &&
                                        <h2>{adInfo.title}</h2>
                                    
                                    }
                                </div>
                                <div className="adDescription">
                                    {/*Quando estiver carregando.... usa o componente fake */}
                                    {loading && <Fake  height={100}/> }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rightSide">
                        <div className="box box--padding">
                             {/*Quando estiver carregando.... usa o componente fake */}
                             {loading && <Fake  height={20}/> }
                        </div>
                        <div className="box box--padding">
                            {/*Quando estiver carregando.... usa o componente fake */}
                            {loading && <Fake  height={50}/> }
                        </div>

                        
                    </div>
                </PageArea>            
        </PageContainer>
    );
}


export default Page;

