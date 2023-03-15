import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
import {PageArea, Fake, OthersArea,BreadChumb} from './styled'; //puxa do css
import useApi from '../../helpers/OlxApi';

import {PageContainer} from '../../Components/MainComponents';
import AdItem from '../../Components/partials/AdItem';


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

    //Funcao para formatar a data
    const formatDate = (date) => {
        let cDate = new Date(date);
        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubto', 'novembro', 'dezembro'];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}` ;
    }


    return (
        <PageContainer>
            {adInfo.category &&

                <BreadChumb>
                    Você está aqui:
                    <Link to="/">Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                    / {adInfo.title}

                </BreadChumb>
                }
                <PageArea>                   
                    <div className="leftSide">
                        <div className="box">
                            <div className="adImage">
                                 {/*Quando estiver carregando.... usa o componente fake */}
                                 {loading && <Fake  height={300}/> }
                                {/*Se tiver as imagens para exibir... */}
                                {adInfo.images &&
                                   
                                    <div>
                                         <Slide>
                                            {adInfo.images.map((img, k)=>
                                                <div key={k} className="each-slide">
                                                    <img src={img} alt="" />
                                                </div>
                                            )}
                                            {/* <div>teste</div> */}
                                        </Slide>
                                    </div>
                                }
                                

                            </div>
                            <div className="adInfo">
                                <div className="adName">
                                    {/*Quando estiver carregando.... usa o componente fake */}
                                    {loading && <Fake  height={20}/> }
                                    {/*Se existir... */}

                                    {adInfo.title &&
                                        <h2>{adInfo.title}</h2>
                                    
                                    }
                                    {adInfo.dateCreated &&
                                    
                                        <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                    }
                                </div>
                                <div className="adDescription">
                                    {/*Quando estiver carregando.... usa o componente fake */}
                                    {loading && <Fake  height={100}/> }
                                    {adInfo.description}
                                    <hr/>
                                    {adInfo.views &&
                                        <small>Visualizações: {adInfo.views}</small>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rightSide">
                        <div className="box box--padding">
                             {/*Quando estiver carregando.... usa o componente fake */}
                             {loading && <Fake  height={20}/> }
                             {/*Quando tiver o priceNegotiable....  */}

                             {adInfo.priceNegotiable &&
                                "Preço Negociável"    
                             }       
                              {/*Quando não existir o priceNegotiable e existir o price...  */}
                             {!adInfo.priceNegotiable && adInfo.price &&
                             
                                <div className="price">Preço: <span>R$ {adInfo.price}</span> </div>
                             }

                        </div>
                        {/*Quando estiver carregando.... usa o componente fake */}
                        {loading && <Fake  height={50}/> }

                         {adInfo.userInfo && 

                            <>
                                <a href={`malito: ${adInfo.userInfo.email}`} target="_blank" className="contactSellerLink" >Falar com o vendedor</a>

                                <div className="createBy box box--padding">
                                    Criado por: 
                                    <strong>{adInfo.userInfo.name}</strong>
                                    <small>Email: {adInfo.userInfo.email}</small>


                                </div>
                            </>
                         
                         }    
  
                    </div>
                </PageArea>   
                <OthersArea>
                    {adInfo.other &&
                            
                            <>
                            <h2>Outras ofertas do vendedor</h2>
                            <div className="list">
                                {adInfo.others.map((i, k)=>
                                    <AdItem  key={i} data={i}/>

                                )}
                            </div>
                        
                        </>
                    }
                </OthersArea>
      
        </PageContainer>
    );
}


export default Page;

