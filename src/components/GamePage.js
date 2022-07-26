import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Board from './Board.js';

function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // replace with urbit data
  const p1 = "~zod";
  const p2 = "~net";

  // Replace with urbit data
  const [turn_count, set_turn_count] = useState(1);


  function goBack() {
    navigate("/");
  }

  function pass() {
    console.log("Passing turn!");
    set_turn_count(turn_count+1);
  }

  return (
    <div className='container py-1'>
      <div className="row">
        <p className="col"><strong>Game ID:</strong> {id}</p>
        <button className="btn btn-danger col-2" onClick={goBack}>
          Exit
        </button>
      </div>
      <hr/>
      <div className="row">
        <div className="col-6">
            <Board turn_count={turn_count} set_turn_count={set_turn_count}/>
        </div>
        <div className="col-6">
        <h3>Turn: {turn_count}</h3>
        <h3>It is {turn_count%2===1 ? p1 : p2}'s turn!</h3>
        <br/>
        <button className="btn btn-primary me-5" onClick={pass}>Pass</button>
        <button className="btn btn-danger" onClick={goBack}>Resign</button>
        </div>
      </div>
  </div>
  );
}

export default GamePage;
