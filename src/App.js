import { useState, useMemo } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './components/HomePage.js';
import GamePage from './components/GamePage.js';
import Urbit from '@urbit/http-api';

function App(props) {

  const [loaded, setLoaded] = useState({'init':false,'api':null});

  let authenticate = async (auth_val) => {
      if(auth_val) {
        let api = await Urbit.authenticate({ship: "zod", url: "localhost:8080", code: "lidlut-tabwed-pillex-ridrup", verbose: true});
        return api;
      }
      else {
        let api = new Urbit("");
        api.ship = window.ship;
        return api;
      }
  };

  useMemo(() => authenticate(props.ext_auth).then(result => setLoaded({'init':true,'api':result})), []); // eslint-disable-line react-hooks/exhaustive-deps

  if(loaded['init']) {
    return(
      <Routes>
      <Route path='/' element={<HomePage api={loaded['api']}/>}/>
      <Route path='/game' element={<Navigate to='/'/>}/>
      <Route path='/game/:id' element={<GamePage api={loaded['api']}/>}/>
      </Routes>
    );
  }
  else {
    return(<h1>LOADING</h1>);
  }
}

export default App;
