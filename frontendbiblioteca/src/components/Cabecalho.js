import React from "react";
import '../assets/css/cssCabecalho.css'

const Cabecalho = () => {
    return(
        <header>
            <nav className='navPrincipal'>
                <a className='linkHome' href='/'><h1>Biblioteca Virtual</h1></a>
            </nav>
        </header>
    )
}

export default Cabecalho