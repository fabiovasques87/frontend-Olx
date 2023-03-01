
import React from "react";
import { Link } from "react-router-dom";

const Page = ()=> {
    return (
        <div>
            página inicial <br />
            <Link to={'/About'}>Ir para About</Link>
        </div>
    );
}


export default Page;
