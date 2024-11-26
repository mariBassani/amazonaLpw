import { useEffect, useState } from "react";
import "../../App.css"
import Publicar from "./publicar";

export default function CriarPubli(){
    const [imagens, setImagens] = useState([]);
    const [link, setLink] = useState("");

    useEffect(() => {
        const fetchImagens = async () => {
            try {
                const response = await fetch(
                    "");
                    const data = await response.json();
                    setImagens(data);
                } catch (error) {
                    console.error("Erro ao buscar os dados: ", error);
                }
        };

        fetchImagens();
    }, imagens);

    const addImg = async () => {
        try{
            const response = await fetch(
                "",
                {
                    metchod: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: link || "Novo Post",
                        completed: false,
                    }),
                }
            );
            const newImg = await response.json();
            setImagens((previaImagens) => [...previaImagens, newImg]);
            setLink("");
        }catch (error) {
            console.error("Erro ao adicionar publicação: ", error);
        }
    };

    return (  //HOOK FORM AQUI!!
        <>
        <h1>Crie uma nova publicação!</h1>
        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Nova publicacao"/>
        <button onClick={addImg}>Publicar</button>
        <Publicar />
        </>
    );
}