import { Link } from "react-router-dom";


const Notound =() =>{
    return (
        <div>
            <h1>404</h1>
            <h4>Página não encontrada</h4><br />
            <Link to="/">Voltar para o Home</Link>
        </div>
    );
}


export default Notound;