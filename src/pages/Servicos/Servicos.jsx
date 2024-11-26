import { useEffect } from "react";
import React, { useContext } from "react";
import { Context } from "../../components/provider/Context";
import style from './servicos.module.css'

function Servicos (){
    const { list } = useContext(Context);
    return( 
        <>
        <section className={ style.usuarias }>
            { list.map(usuaria=>(<p>{usuaria.name}, {usuaria.idade}: {usuaria.servico}</p>)) }
        </section>
        </>
    );

}

export default Servicos;