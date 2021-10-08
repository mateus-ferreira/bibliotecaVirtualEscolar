import React, { useEffect, useState } from "react";
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ExcluirLivro  from '../D/ExcluirLivro'
import iconeCadastro from '../../assets/images/cadastrar.svg'
import iconeExcluir from '../../assets/images/excluir.svg'
import iconeEditar from '../../assets/images/editar.svg'
import iconePesquisar from '../../assets/images/pesquisar.svg'

const urlbase = process.env.REACT_APP_BASE_URL

function ListaGeral(){
    const reqHeader ={
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    const [livros, setLivros] = useState([])
    async function fetchLivros(){
        try{
            const resposta = await fetch(urlbase+'/listaLivros', reqHeader)
            const livr = await resposta.json()
            setLivros(livr)
        }catch(erro){
            return console.log(erro.message)
        }
    }
    
    function apagar(codigo){
        fetch(urlbase+`/excluirLivro/${codigo}`, {
            method: 'DELETE',
            headers: {
                Accept:'*/*',
            }
        })
        .then(console.log(`livro ${codigo} apagado`))
    }
    useEffect(() =>{
        async function conn(){
            await fetchLivros()
        }
        conn()
    },[livros.codigo])
    
    return (
        <div>
            <Container maxWidth='lg'>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Link to='/cadastro'><img src={iconeCadastro} alt='iconAdicionar'></img></Link>
                                </TableCell>
                                <TableCell>Código</TableCell>
                                <TableCell>Titulo</TableCell>
                                <TableCell>Autor</TableCell>
                                <TableCell>Editora</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {livros.map((livro) => {
                                return(
                                    <TableRow key={livro.codigo}>
                                        <TableCell>
                                            <Link to='/' onClick={(event)=>{
                                                event.preventDefault()
                                                apagar(livro.codigo)

                                            }}><img src={iconeExcluir} alt='iconExcluir'></img></Link>
                                            <Link to={`/editar/${livro.codigo}`}><img src={iconeEditar} alt='iconEditar'></img></Link>
                                        </TableCell>
                                        <TableCell>{livro.codigo}</TableCell>
                                        <TableCell>{livro.titulo}</TableCell>
                                        <TableCell>{livro.autor}</TableCell>
                                        <TableCell>{livro.editora}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}

export default ListaGeral