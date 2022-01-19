import {useState} from 'react';
import ConfirmationDialog from './ConfirmationDialog.js';

function GameEntry(props) {

  const [showConfirmation, setConfirmation] = useState(false);

  function closeConfirmationDialog() {
    setConfirmation(false);
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
            <button className="btn btn-outline-primary">Open</button>
            <button className="btn btn-outline-danger" onClick={resignHandler}>Resign</button>
          </div>
        </td>
        {showConfirmation && <ConfirmationDialog onCancel={closeConfirmationDialog} onConfirm={closeConfirmationDialog} label='Resignation'/>}
      </tr>
    </>
  );
}

export default GameEntry;
