import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListaGeral from '../conexoes/R/ListaGeral'
import CadastroLivro from "../conexoes/C/CadastroLivro";
import EdicaoLivro from "../conexoes/U/EdicaoLivro";


function Rotas(){
    return(
    <Router>
        <Switch>
            <Route exact path='/'><ListaGeral/></Route>
            <Route exact path='/cadastro'><CadastroLivro/></Route>
            <Route exact path='/editar/:codigo'><EdicaoLivro/></Route>
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