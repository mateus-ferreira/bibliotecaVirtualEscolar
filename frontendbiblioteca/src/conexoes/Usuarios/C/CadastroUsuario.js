import React, {useState} from "react";
import { TextField, Button, Container } from '@material-ui/core'
//import { Link } from 'react-router-dom'

const urlbase = process.env.REACT_APP_BASE_URL

function CadastroUsuario(){
    const [usuarios, setUsuarios] = useState({
        nome: '',
        email: '',
        senha:''
    })

    async function fetchUsuarios(dados={}){
        try{
            const resposta = await fetch(urlbase+'/cadastroUsuario', {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            const dado = await resposta.json()
            return console.log(dado)

        }catch(erro){
            return console.log(erro.message)
        }
    }

    function handleSubmit(){
        fetchUsuarios(usuarios)
    }

    return (
        <Container maxWidth='sm'>
            <h1 className='titulo'>Cadastrar Usuario</h1>
            <form onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
            }}>
                <TextField
                    value={usuarios.nome}
                    onChange={(event) => {
                        setUsuarios({ ...usuarios, nome: event.target.value })
                    }}
                    id='nome'
                    label='Nome'
                    variant="outlined"
                    margin="normal"
                    fullWidth
                ></TextField>
                <TextField
                    value={usuarios.email}
                    onChange={(event) => {
                        setUsuarios({ ...usuarios, email: event.target.value })
                    }}
                    id='email'
                    type='email'
                    label='Email'
                    variant="outlined"
                    margin="normal"
                    fullWidth
                ></TextField>
                <TextField
                    value={usuarios.senha}
                    onChange={(event) => {
                        setUsuarios({ ...usuarios, senha: event.target.value })
                    }}
                    id='senha'
                    label='Senha'
                    type='password'
                    variant="outlined"
                    margin="normal"
                    fullWidth
                ></TextField>
                <Button type="submit" variant="outlined" color="primary">Cadastrar</Button>
                <a href='/'><Button variant="outlined" color="secondary">Cancelar</Button></a>
            </form>
        </Container>
    )
}

export default CadastroUsuario