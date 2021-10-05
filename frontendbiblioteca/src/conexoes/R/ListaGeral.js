import React, { useEffect, useState } from "react";
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

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
    useEffect(() =>{
        async function connLivros (){
            await fetchLivros()
        }
        connLivros()
         
    }, [])
    
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>Titulo</TableCell>
                        <TableCell>Autor</TableCell>
                        <TableCell>Editora</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {livros.map((livro) => {
                        return(
                            <TableRow>
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
    )
}

export default ListaGeral