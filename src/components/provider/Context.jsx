import React, { createContext, useState} from "react";
// import photos from "../data";
import usuarias from "../data";
export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [ list, setList] = useState(usuarias);

    const listarGaleria = () => setList(photos);
    const listarUsuarias = () => setList(usuarias);
    const novoEvento = () => setList (productsList.filter((product) => product.price > media));
    const excluirEvento = () => setList (productsList.filter((product) => product.price < media));
    // const desconto = () => setList (productsList.map((prod) => {return{...prod, price: prod.price * 0.85}}));

    return(
        <Context.Provider value = {{ list, listarGaleria, listarUsuarias, novoEvento, excluirEvento}}>
            {children}
        </Context.Provider>
    );

};