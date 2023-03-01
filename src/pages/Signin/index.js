import React from "react";
import {PageArea} from './styled'; //puxa do css
import {PageContainer, PageTitle} from '../../Components/MainComponents';

const Page =() =>{
    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
                <PageArea>
                    <form>
                        <label className="area"> 
                            <div className="area--title">Email</div>
                            <div className="area--input">
                                <input type="email" />
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Senha</div>
                            <div className="area--input">
                                <input type="password" />
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Lembrar senha</div>
                            <div className="area--input">
                                <input type="checkbox" className="checkbox"/>
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button>Login</button>
                            </div>
                        </label>
                    </form>
                </PageArea>            
        </PageContainer>
    );
}


export default Page;

