import React from "react";
//import { Link } from 'react-router-dom'
import '../assets/css/cssCabecalho.css'

const Cabecalho = () => {
    return(
        <header>
            <nav className='navPrincipal'>
                <a className='linkHome' href='/'><h1>Biblioteca Virtual</h1></a>
            
            
                <a className='login' href='/login'>Entrar</a>
                <a className='login' href='/cadastroUsuario'>Cadastrar</a>
            </nav>
        </header>
    )
}

export default Cabecalho