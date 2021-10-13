import React from "react";
import { Link } from 'react-router-dom'
import '../assets/css/cssCabecalho.css'

const Cabecalho = () => {
    return(
        <header>
            <nav className='navPrincipal'>
                <Link className='linkHome' to='/'><h1>Biblioteca Virtual</h1></Link>
            
            
                <Link className='login' to='/cadastroUsuario'>Entrar</Link>
            </nav>
        </header>
    )
}

export default Cabecalho