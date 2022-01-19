import {Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './components/HomePage.js';
import GamePage from './components/GamePage.js';

function App() {
  return(
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/game' element={<Navigate to='/'/>}/>
    <Route path='/game/:id' element={<GamePage/>}/>
    </Routes>
  );
}

export default App;
