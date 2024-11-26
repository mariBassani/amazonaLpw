import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import CriarPubli from "../pages/CriarPublicacao/index"
import Calendario from "../pages/Calendario"
import Servicos from "../pages/Servicos/Servicos"

function RoutesMain(){
    return (
        <Routes>
            <Route path="/" element={<Home txt="Didot, serif" titulo="sans-serif"/>}/>
            <Route path="/criarPublicacao" element={<CriarPubli/>}/>
            <Route path="/calendario" element={<Calendario/>}/>
            <Route path="/servicos" element={<Servicos/>}/>
            {/* <Route path="*" element={<ErrorPage/>}/> */}
        </Routes>
    )
}

export default RoutesMain;