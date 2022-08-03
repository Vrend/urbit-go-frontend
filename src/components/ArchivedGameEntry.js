import {useNavigate} from 'react-router-dom';

function ArchivedGameEntry(props) {

  const navigate = useNavigate();

  function openGame() {
    navigate('/game/'+props.id);
  }

  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>{props.id}</td>
        <td>{props.black}</td>
        <td>{props.white}</td>
        <td>{props.turn}</td>
        <td>{props.result}</td>
        <td><button className="btn btn-outline-primary" onClick={openGame}>Open</button></td>
      </tr>
    </>
  );
}

export default ArchivedGameEntry;
