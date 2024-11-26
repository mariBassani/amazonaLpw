import { useEffect, useState } from "react";

import imgPerfil from './perfil.png'
import img1 from './imagens/img1.jpg'
import img2 from './imagens/img2.jpg'
import img3 from './imagens/img3.jpg'
import img4 from './imagens/img4.jpg'
import img5 from './imagens/img5.jpg'
import img6 from './imagens/img6.jpg'
import img7 from './imagens/img7.png'
import style from './home.module.css'

export default function Home(props){
    const [galeria, setGaleria] = useState([]);
    const [status, setStatus] = useState("Carregando publicações...");

    const obterURLs = async () => {
        try{
            const URLs = await fetch("");
            const URLsJson = await URLs.json();
            setGaleria(URLsJson);
            setStatus(" ");
            console.log("carregamento concluído.");
        } catch (error) {
            setStatus("Erro ao carregar dados!!");
            console.error(error);
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
        <ul className={ style.publis }>
            {galeria.map((imagem)=> (
                <li className={ style.post } key ={objeto.id}>
                    <img src={imagem.url} alt={imagem.desc} />
                </li>
            ))}
        </ul>
        </>
    )
}