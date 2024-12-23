import { useEffect, useState } from "react";
import api from "../../api/api";

import imgPerfil from './perfil.png'
import style from './home.module.css'


export default function Home(props){
    const [galeria, setGaleria] = useState([]);
    const [status, setStatus] = useState("Carregando publicações...");

    const obterURLs = async () => {
        try {
            const response = await fetch("http://localhost:8080/publicacoes");
            const URLsJson = await response.json();
            setGaleria(URLsJson);
            setStatus(" "); 
            console.log("Carregamento concluído.");
          } catch (error) {
            setStatus("Erro ao carregar dados!");
            console.error(error);
          }
      
    };

    const deletePost = async (id) => {
      try {
          const response = await fetch(`http://localhost:8080/publicacoes/${id}`, {
              method: "DELETE",
          });

          if (response.ok) {
              setGaleria((prevGaleria) => prevGaleria.filter((publicacao) => publicacao.id !== id));
              console.log("Publicação excluída com sucesso!");
          } else {
              console.error("Falha ao excluir a publicação.");
          }
      } catch (error) {
          console.error("Erro ao deletar publicação: ", error);
      }
  };

    useEffect(() => { obterURLs(); }, galeria);

    return(
        <>
        <div className={ style.superiorHome }>
            <img src={ imgPerfil } className={ style.perfil }/>
            <div className={ style.textoPerfil }>
                <h1 style={{fontFamily: props.titulo}}>Brigaderia da Dri</h1>
                <p style={{fontFamily: props.txt}}>Faço doces sob encomenda. Peça já o seu! | Telefone: (11)98765-4321</p>
            </div>
        </div>
        <h2>{status}</h2>
        <div>
        <ul className={ style.publis }>
            {galeria.map((imagem)=> (
                <li className={ style.post } key ={imagem.id}>
                    <img src={imagem.url} alt={imagem.descricao} />
                    <button onClick={()=> deletePost(imagem.idPublicacao)}>Excluir</button>
                </li>
            ))}
        </ul>    
        </div>
        </>
    )
}