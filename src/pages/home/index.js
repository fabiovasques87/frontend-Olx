
import React from "react";
import { Link } from "react-router-dom";

const Page = ()=> {
    return (
        <div>
            <h1>página inicial </h1><br />
            <Link to={'/About'}>Ir para About</Link>
        </div>
    );
}


export default Page;
