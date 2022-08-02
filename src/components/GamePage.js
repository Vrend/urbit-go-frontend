import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Board from './Board.js';
import ConfirmationDialog from "./ConfirmationDialog.js";

function GamePage(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, set_game] = useState({});
  const [loaded, set_loaded] = useState(false);
  const [sub_id, set_sub_id] = useState(-1);
  const [showConfirm, setConfirm] = useState(false);

  function showResignConfirmation() {
    setConfirm(true);
  }

  function closeConfirmation() {
    setConfirm(false);
  }

  function goBack() {
    setConfirm(false);
    if(sub_id !== -1) {
      props.api.unsubscribe(sub_id);
    }
    navigate("/");
  }

  let resign_game = async () => {
    props.api.poke({
      app: "urbit-go",
      mark: "urbit-go-action",
      json: {"resign":{"id": id.toString()}}
    }).then(goBack());
  }

  let parse_game_json = (json) => {
      set_game({
          black: "~"+json["black"],
          white: "~"+json["white"],
          board: Object.keys(json["game-board"]['m']).map((key) => [key, json["game-board"]['m'][key]]),
          size: json["game-board"]['n'],
          host: "~"+json["host"],
          pass: json["pass"],
          name: json["name"],
          deadStones: json["dead-stones"],
          history: json["history"],
          komi: json["komi"].substring(1),
          turn: json["turn"]
      });
  };

  let get_game = async () => {
    props.api.scry({
      app: "urbit-go",
      path: "/game/"+id.toString()
    }).then(val => parse_game_json(val));
  }


  let subscribe_game = async () => {
    const sub_id = props.api.subscribe({
      app: "urbit-go",
      path: "/game/active/"+id.toString(),
      err: console.log,
      event: parse_game_json,
      quit: console.log
    }).then(val => set_sub_id(val));
  }


  let move = async (x, y) => {
    props.api.poke({
      app: "urbit-go",
      mark: "urbit-go-action",
      json: {"move":{"id": id.toString(), "position":`${x} ${y}`}}
    }).then(get_game());
  }

  if(loaded) {
      return (
        <div className='container py-3'>
          {showConfirm && (<ConfirmationDialog onCancel={closeConfirmation} onConfirm={resign_game} label="Resignation"/>)}
          <div className="row">
            <p className="col"><strong>Game ID:</strong> {id}</p>
            <p className="col"><strong>Name:</strong> {game.name}</p>
            <div className="col">
              <button className="btn btn-danger float-end" onClick={goBack}>Exit</button>
              <button className="btn btn-primary me-2 float-end" onClick={get_game}>refresh</button>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-6">
                <Board move={move} size={game.size} board={game.board}/>
            </div>
            <div className="col-6">
            <h3>Turn: {game.turn}</h3>
            <h3>It is {game.turn%2===1 ? game.black : game.white}'s turn!</h3>
            <br/>
            <button className="btn btn-primary me-5">Pass</button>
            <button className="btn btn-danger" onClick={showResignConfirmation}>Resign</button>
            </div>
          </div>
      </div>
      );
  }
  else {
    get_game();
    if(JSON.stringify(game) !== '{}') {
      subscribe_game();
      set_loaded(true);
    }
    return(<h1>LOADING</h1>);
  }

}

export default GamePage;
