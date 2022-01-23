import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ConfirmationDialog from './ConfirmationDialog.js';

function GameEntry(props) {

  const [showConfirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();

  function closeConfirmationDialog() {
    setConfirmation(false);
  }

  function openGame() {
    navigate('/game/'+props.id);
  }

  function resignHandler() {
    setConfirmation(true);
  }

  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>{props.id}</td>
        <td>{props.host}</td>
        <td>{props.black}</td>
        <td>{props.white}</td>
        <td>{props.turn}</td>
        <td>
          <div className="btn-group" role="group">
            <button className="btn btn-outline-primary" onClick={openGame}>Open</button>
            <button className="btn btn-outline-danger" onClick={resignHandler}>Resign</button>
          </div>
        </td>
        {showConfirmation && <ConfirmationDialog onCancel={closeConfirmationDialog} onConfirm={closeConfirmationDialog} label='Resignation'/>}
      </tr>
    </>
  );
}

export default GameEntry;
