import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./criarPublicacao.module.css"
import "../../App.css"

export default function CriarPubli(){
    const [imagens, setImagens] = useState([]);
    const [link, setLink] = useState("");
    const [msg, setMsg] = useState("");
    const [sentOk, setSentOk] = useState(false);

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
                        url: url || "Novo Post",
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
        formState: { errors }, reset
    } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
        addImg(data.url)
        setMsg("Publicado com sucesso!")
        reset();
    };

    return (  //HOOK FORM AQUI!!
        <>
        <h1>Crie uma nova publicação!</h1>
        <form className={ style.form } onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="url">URL: </label>
        <input 
            className={ style.input }
            {...register("url", {
                required:"O url é obrigatório!",
                pattern: {
                    value: /^https?:\/\/.*\.(jpeg|jpg|png|webp)$/i,
                    message: "Formato de URL inválido",},})
            } 
            type="text" 
            id="url"
            // value={link} 
            // onChange={(e) => setLink(e.target.value)} 
            placeholder="Digite o url da imagem"
            
        />
        {errors.url && <p className={ style.erro }> {errors.url.message}</p>}
        

        <label className={ style.label } htmlFor="desc">Descrição: </label>
        <input className={ style.input } {...register("desc", { required:"A descrição é obrigatória!"})} type="text" id="desc" placeholder="Adicione uma breve descrição da imagem"/>
        {errors.desc && <p className={ style.erro }> {errors.desc.message}</p>}
        <div>
            <p>{msg}</p>
            <button type="submit">
                Publicar
            </button>
        </div>
        </form>
        </>
    );
}