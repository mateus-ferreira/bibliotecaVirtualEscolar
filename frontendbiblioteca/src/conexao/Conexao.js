import React, { useEffect, useState } from "react";

const urlbase = 'http://localhost:3001'//process.env.BASE_URL

function Conexao(){
    const reqHeader ={
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    const [livros, setLivros] = useState([])
    async function fetchLivros(){
        try{
            const response = await fetch(urlbase+'/listaLivros', reqHeader)
            const livr = await response.json()
            setLivros(livr)
        }catch(erro){
            return erro.message
        }
    }
    useEffect(() =>{
        async function a (){
            await fetchLivros()
        }
        a()
         
    }, [])
    
    return (
        <div>
            {livros.map((livro)=>{
                return (
                    <div key={livro.codigo}>
                        <p>{livro.titulo}</p>
                        <p>{livro.autor}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Conexao 