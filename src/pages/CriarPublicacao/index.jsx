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
                const response = await fetch( "http://localhost:8080/publicacoes");
                    const data = await response.json();
                    setImagens(data);
                } catch (error) {
                    console.error("Erro ao buscar os dados: ", error);
                }
        };

        fetchImagens();
    }, []);

    const addImg = async (url, descricao) => {
        try{
            const response = await fetch(
                "http://localhost:8080/publicacoes",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: url || "Novo Post",
                        descricao: descricao,
                    }),
                });

                if (!response.ok){
                    throw new Error(`Erro no servidor: ${response.statusText}`)
                }
            const newImg = await response.json();
            setImagens((previaImagens) => [...previaImagens, newImg]);
            setMsg("Publicado com sucesso!!")
            setLink("");
        }catch (error) {
            console.error("Erro ao adicionar publicação: ", error);
            setMsg("Erro ao adicionar publicação.")
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();
    
    const onSubmit = (data) => {
        console.log("Dados do formulário: ", data);
        addImg(data.url, data.descricao)
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
        

        <label className={ style.label } htmlFor="descricao">Descrição: </label>
        <input className={ style.input } {...register("descricao", { required:"A descrição é obrigatória!"})} type="text" id="descricao" placeholder="Adicione uma breve descrição da imagem"/>
        {errors.descricao && <p className={ style.erro }> {errors.descricao.message}</p>}
        <div>
            <p>{msg}</p>
            <button className={ style.btn } type="submit">
                Publicar
            </button>
        </div>
        </form>
        </>
    );
}