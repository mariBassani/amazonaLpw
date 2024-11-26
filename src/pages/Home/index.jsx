import imgPerfil from './perfil.png'
import img1 from './imagens/img1.jpg'
import img2 from './imagens/img2.jpg'
import img3 from './imagens/img3.jpg'
import img4 from './imagens/img4.jpg'
import img5 from './imagens/img5.jpg'
import img6 from './imagens/img6.jpg'
import img7 from './imagens/img7.png'
import style from './home.module.css'

function Home(props){
    return(
        <>
        <div className={ style.superiorHome }>
            <img src={ imgPerfil } className={ style.perfil }/>
            <div className={ style.textoPerfil }>
                <h1 style={{fontFamily: props.titulo}}>Brigaderia da Dri</h1>
                <p style={{fontFamily: props.txt}}>Faço doces sob encomenda. Peça já o seu! | Telefone: (11)98765-4321</p>
            </div>
        </div>
        <ul className = { style.publis }>
            <li className={ style.post }><img src={img1}/></li>
            <li className={ style.post }><img src={img2}/></li>
            <li className={ style.post }><img src={img3}/></li>
            <li className={ style.post }><img src={img4}/></li>
            <li className={ style.post }><img src={img5}/></li>
            <li className={ style.post }><img src={img6}/></li>
            <li className={ style.post }><img src={img7}/></li>
        </ul>
        </>
    )
}

export default Home;