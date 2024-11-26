import { useState } from "react";

function Publicar(){
    const [texto, setTexto] = useState("");

    return (
        <div>
            <p>{texto}</p>
            <button onClick={()=>{setTexto("Publicado com sucesso!")}}>
                Publicar
            </button>
        </div>
    )
}

export default Publicar;