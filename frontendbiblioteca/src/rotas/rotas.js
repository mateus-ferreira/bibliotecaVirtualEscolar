import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CadastroLivro from "../conexoes/Livros/C/CadastroLivro";
import ListaGeral from '../conexoes/Livros/R/ListaGeral'
import EdicaoLivro from "../conexoes/Livros/U/EdicaoLivro";

import CadastroUsuario from "../conexoes/Usuarios/C/CadastroUsuario";

import Cabecalho from "../components/Cabecalho";



function Rotas(){
    return(
    <Router>
        <Cabecalho/>
        <Switch>
            <Route exact path='/'><ListaGeral/></Route>
            <Route exact path='/cadastroLivro'><CadastroLivro/></Route>
            <Route exact path='/editar/:codigo'><EdicaoLivro/></Route>

            <Route exact path='/cadastroUsuario'><CadastroUsuario/></Route>
        </Switch>
    </Router>
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