import './App.css'
import RoutesMain from './routes/RoutesMain'
import Menu from './components/menu'
import './App.css'
import { ContextProvider } from './components/provider/Context'

function App() {

  return (
    <>
    <Menu>
      <ContextProvider>
        <div className='tudo'> 
          <RoutesMain/>
        </div>
      </ContextProvider>
    </Menu>
    
    </>
  )
}

export default App
