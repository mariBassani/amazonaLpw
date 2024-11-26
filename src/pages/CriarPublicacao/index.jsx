import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../App.css"

export default function CriarPubli(){
    const [imagens, setImagens] = useState([]);
    const [link, setLink] = useState("");
    const [msg, setMsg] = useState("");

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
    };

    return (  //HOOK FORM AQUI!!
        <>
        <h1>Crie uma nova publicação!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label for="url">URL: </label>
        <input 
            {...register("url", {
                required:"O url é obrgatório!",
                pattern: {
                    value: '^https://.*\.(jpeg|jpg|png|webp)$',
                    message: "Formato de URL inválido",},})
            } 
            type="text" 
            id="url"
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
            placeholder="Digite o url da imagem"
        />
        {errors.url && <p style={{ color: "red" }}>{errors.url.message}</p>}

        <label for="desc">Descrição: </label>
        <input type="text" id="desc" placeholder="Adicione uma breve descrição da imagem"/>

        <div>
            <p>{msg}</p>
            <button type="submit" onClick={ ()=>{setMsg("Publicado com sucesso!"); addImg}}>
                Publicar
            </button>
        </div>
        </form>
        </>
    );
}