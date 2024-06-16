import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import './assets/style.css';
import Login from './views/login/login'; 
import Dashboard from './views/admin/dashboard';
import Company from './views/company/company';
import MessageAlert from './components/toaster/toaster';
import Game from './views/game/game';
import Tournament from './views/tournament/tournament';
import Prize from './views/prize/prize';
import Content from './views/content/content';
import Teams from './views/team/team';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/tournament' element={<Tournament/>}/>
          <Route path='/prize' element={<Prize/>}/>
          <Route path='/content' element={<Content/>}/>
          <Route path='/company' element={<Company/>}/>
          <Route path='/game' element={<Game/>}/>
          <Route path='/team' element={<Teams/>}/>
        </Routes>
      </BrowserRouter>
      <MessageAlert/> 
    </>
  )
}

export default App
