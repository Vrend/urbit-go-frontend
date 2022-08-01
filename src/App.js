import { useState, useMemo } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './components/HomePage.js';
import GamePage from './components/GamePage.js';
import Urbit from '@urbit/http-api';

//const EXTERNAL = true;

// if(EXTERNAL)// }
// else {
//   const api = new Urbit("");
// } {
//const api = new Urbit("");


let authenticate = async () => {
    let api = await Urbit.authenticate({ship: "zod", url: "localhost:8080", code: "lidlut-tabwed-pillex-ridrup", verbose: true});
    //api.ship = "zod"
    return api;
};


let get_challenges = async (api) => {
  return api.scry({
    app: "urbit-go",
    path: "/challenges"
  });
};



// }
// else {
//   const api = new Urbit("");
// }


function App() {

  const [loaded, setLoaded] = useState({'init':false,'api':null});

  useMemo(() => authenticate().then(result => setLoaded({'init':true,'api':result})), []);

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
