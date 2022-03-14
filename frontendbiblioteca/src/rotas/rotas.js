import React from "react";
import { /*Router,*/ Route, BrowserRouter, Routes } from 'react-router-dom'
import CadastroLivro from "../conexoes/Livros/C/CadastroLivro";
import ListaGeral from '../conexoes/Livros/R/ListaGeral'
import EdicaoLivro from "../conexoes/Livros/U/EdicaoLivro";

import CadastroUsuario from "../conexoes/Usuarios/C/CadastroUsuario";
import Login from "../conexoes/Usuarios/C/Login";

import Cabecalho from "../components/Cabecalho";



function Rotas(){
    return(
        <div>
            <Cabecalho />
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<ListaGeral />}></Route>
                    <Route exact path='/cadastroLivro' element={<CadastroLivro />}></Route>
                    <Route exact path='/editar/:codigo' element={<EdicaoLivro />}></Route>

                    <Route exact path='/cadastroUsuario' element={<CadastroUsuario />}></Route>
                    <Route exact path='/login' element={<Login />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
        /*
    <div>
        <ListaGeral/>
    </div>
    <div>
        <CadastroLivro />
    </div>
    */
    )
}

export default Rotas