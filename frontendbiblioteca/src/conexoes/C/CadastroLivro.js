import React, { useState, useEffect } from "react";
import { TextField, Button } from '@material-ui/core'

const urlbase = process.env.REACT_APP_BASE_URL

function CadastroLivro(){
    const [livros, setLivros] = useState({
        codigo: '',
        titulo: '',
        autor: '',
        editora: ''
    })

    async function fetchLivros(dados={}){
        try{
            const resposta = await fetch(urlbase+'/cadastroLivro', {
                method: 'POST',
                headers: {
                    Accept:'*/*',
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(dados)
            })
            const dado = await resposta.json()
            return dado
            
        }catch(erro){
            return console.log(erro.message)
        }
    }
    function handleSubmit(){
        fetchLivros(livros)
    }

    return (
        <form onSubmit={(event)=>{
            event.preventDefault()
            handleSubmit()
        }}>
            <TextField
                value={livros.codigo}
                onChange={(event)=>{
                    setLivros({...livros, codigo: event.target.value})
                }}
                id='codigo'
                label='Codigo'
                variant="outlined"
                margin="normal"
                fullWidth
            ></TextField>
            <TextField
                value={livros.titulo}
                onChange={(event)=>{
                    setLivros({...livros, titulo: event.target.value})
                }}
                id='titulo'
                label='Titulo'
                variant="outlined"
                margin="normal"
                fullWidth
            ></TextField>
            <TextField
                value={livros.autor}
                onChange={(event)=>{
                    setLivros({...livros, autor: event.target.value})
                }}
                id='autor'
                label='Autor'
                variant="outlined"
                margin="normal"
                fullWidth
            ></TextField>
            <TextField
                value={livros.editora}
                onChange={(event)=>{
                    setLivros({...livros, editora: event.target.value})
                }}
                id='editora'
                label='Editora'
                variant="outlined"
                margin="normal"
                fullWidth
            ></TextField>
            <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
        </form>
    )
}

export default CadastroLivro