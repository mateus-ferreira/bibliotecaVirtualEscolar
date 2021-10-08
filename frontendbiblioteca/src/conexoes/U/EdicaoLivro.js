import React, {useState} from "react";
import { TextField, Button, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'

const urlbase = process.env.REACT_APP_BASE_URL

function EdicaoLivro (){
    const [livros, setLivros] = useState({
        codigo: '',
        titulo: '',
        autor: '',
        editora: ''
    })

    return(
        <Container maxWidth='sm'>
            <form onSubmit={(event)=>{
                event.preventDefault()
                //handleSubmit()
            }}>
                <TextField
                    value={livros.codigo}
                    defaultValue={livros.codigo}
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
                <Link to='/'><Button variant="outlined" color="secondary">Cancelar</Button></Link>
            </form>
        </Container>
    )
}

export default EdicaoLivro