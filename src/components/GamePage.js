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
  const [over, set_over] = useState(false);

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

  let pass = async () => {
    if(game.pass < 2) {
      props.api.poke({
        app: "urbit-go",
        mark: "urbit-go-action",
        json: {"pass":{"id": id.toString()}}
      });
    }
  };

  let resign_game = async () => {
    props.api.poke({
      app: "urbit-go",
      mark: "urbit-go-action",
      json: {"resign":{"id": id.toString()}}
    }).then(goBack());
  };

  let parse_game_json = (json) => {
      set_game({
          black: "~"+json["black"],
          white: "~"+json["white"],
          board: Object.keys(json["game-board"]['m']).map((key) => [key, json["game-board"]['m'][key]]),
          size: json["game-board"]['n'],
          host: "~"+json["host"],
          pass: json["pass"],
          name: json["name"],
          candidateDeadStones: (json["dead-stones"] === null ? [] : json["dead-stones"]["stones"]),
          deadStones: json["dead-stones"],
          history: json["history"],
          komi: json["komi"].substring(1),
          turn: json["turn"],
          result: json["result"]
      });
  };


  let get_game = async () => {
      props.api.scry({
        app: "urbit-go",
        path: "/game/"+id.toString(),
      }).catch(err => goBack()).then(val => parse_game_json(val));
  };


  let subscribe_game = async () => {
    const sub_id = props.api.subscribe({
      app: "urbit-go",
      path: "/game/active/"+id.toString(),
      err: console.log,
      event: parse_game_json,
      quit: console.log
    }).then(val => set_sub_id(val));
  };


  let move = async (x, y) => {
    props.api.poke({
      app: "urbit-go",
      mark: "urbit-go-action",
      json: {"move":{"id": id.toString(), "position":`${x} ${y}`}}
    });
  };

  let deadStonesPrompt = () => {
    if(game.deadStones === null) {
      return(<h3>Select dead stones</h3>);
    }
    else if(game.deadStones['ship'] === props.api.ship) {
      return(<h3>Waiting for {props.api.ship === game.black.substring(1) ? game.white : game.black} to submit dead stones</h3>);
    }
    else {
      return(<h3>Waiting for you to submit dead stones</h3>);
    }
  };

  let submitDeadStones = async () => {
    if(game.candidateDeadStones.length > 0) {
      props.api.poke({
        app: "urbit-go",
        mark: "urbit-go-action",
        json: {"dead-stones":{"id": id.toString(), "stones":game.candidateDeadStones}}
      });
    }
    if(game.candidateDeadStones === game.deadStones) { // game will be over
      set_over(true);
    }
  };

  let toggle_dead_stone = (coords, add) => {
    if(game.deadStones !== null && game.deadStones !== undefined) {
      if(game.deadStones['ship'] === props.api.ship) { // we already submitted
        return;
      }
    }

    if(add) {
      var temp = [...game.candidateDeadStones];
      temp.push(coords);
      set_game({...game, candidateDeadStones: temp});
    }
    else {
      const temp_candidates = game.candidateDeadStones.filter(val => val !== coords);
      set_game({...game, candidateDeadStones: temp_candidates});
    }
  };

  if(loaded) {
      return (
        <div className='container py-3'>
          {showConfirm && (<ConfirmationDialog onCancel={closeConfirmation} onConfirm={resign_game} label="Resignation"/>)}
          <div className="row">
            <p className="col-variable"><strong>Game ID:</strong> {id}</p>
            <p className="col"><strong>Name:</strong> {game.name}</p>
            <p className="col"><strong>Host:</strong> {game.host}</p>
            <p className="col"><strong>White:</strong> {game.white}</p>
            <p className="col"><strong>Black:</strong> {game.black}</p>
            <div className="col">
              <button className="btn btn-danger float-end" onClick={goBack}>Exit</button>
              <button className="btn btn-primary me-2 float-end" onClick={get_game}>refresh</button>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-6">
                <Board
                  move={move}
                  size={game.size}
                  board={game.board}
                  pass={game.pass}
                  deadStones={game.candidateDeadStones}
                  toggle_dead_stone={toggle_dead_stone}
                  />
            </div>
            {game.result === null && (<div className="col-6">
            {game.pass < 2 && (<h3>Turn: {game.turn}</h3>)}
            {(game.pass < 2) && (<h3>It is {game.turn%2===1 ? game.black : game.white}'s turn!</h3>)}
            {(game.pass >= 2) && (deadStonesPrompt())}
            <br/>
            {(game.pass < 2) && (<button className="btn btn-primary me-5" onClick={pass}>Pass</button>)}
            {(game.pass >= 2) && (<button className={"btn btn-primary me-5"+((game.deadStones !== null && game.deadStones['ship'] === props.api.ship) ? " disabled" : "")} onClick={submitDeadStones}>Submit</button>)}
            <button className="btn btn-danger" onClick={showResignConfirmation}>Resign</button>
            </div>)}
            {game.result !== null && (<div className="col-6">
              <h3>Score:</h3>
              <h5>Black: {game.result["black-score"].substring(1)}</h5>
              <h5>White: {game.result["white-score"].substring(1)}</h5>
              <hr/>
              <h2>THE WINNER IS: ~{game.result["result"]}!</h2>
            </div>)}
          </div>
      </div>
      );
  }
  else {
    get_game();
    if(JSON.stringify(game) !== '{}') {
      if(game.result === null) {
        subscribe_game();
      }
      else {
        console.log(game.result);
      }
      set_loaded(true);
    }
    return(<h1>LOADING</h1>);
  }

}

export default GamePage;
