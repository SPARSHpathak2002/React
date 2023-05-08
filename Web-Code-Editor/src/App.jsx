import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Introduction from './components/Introduction'
import EditorScreen from './components/EditorScreen'
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Introduction/>}/>
          <Route  path='/editor' element={<EditorScreen/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App