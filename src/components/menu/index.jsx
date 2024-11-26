import { Link } from "react-router-dom"
import logo from './amazona.png'
import style from './menu.module.css'

function Menu(props){
    return (
        <>
            <header className={ style.cabecalho }>
                <nav className={ style.navegacao }>
                    <img src={logo}/>
                    <ul className={ style.links }>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/calendario">Calendário</Link></li>
                        <li><Link to="/criarPublicacao">Criar Publicação</Link></li>
                        <li><Link to="/servicos">Serviços</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                {props.children}
            </main>
        </>
    )
}

export default Menu;



