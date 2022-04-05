import React from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import CadastroLivro from "../conexoes/Livros/C/CadastroLivro";
import ListaGeral from '../conexoes/Livros/R/ListaGeral'
import EdicaoLivro from "../conexoes/Livros/U/EdicaoLivro";
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
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Rotas