import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'

const urlbase = process.env.REACT_APP_BASE_URL

function ExcluirLivro(){

    async function fetchLivros(codigo){
        try{
            const resposta = await fetch(urlbase+`/excluirLivro/${codigo}`, {
                method: 'DELETE',
                headers: {
                    Accept:'*/*',
                    'Content-Type': 'application/json'
                }
            }) 
            const dado = await resposta.json()
            return console.log(dado)
        }catch(erro){
            return console.log(erro)
        }
    }

    useEffect(()=>{
        fetchLivros()
    }, [])

}

export default ExcluirLivro