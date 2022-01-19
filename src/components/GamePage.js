import { useParams, useNavigate } from "react-router-dom";

function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  function goBack() {
    navigate("/");
  }
  return (
    <div className='container'>
      <p>The Game Page for game {id}</p>
      <button className="btn btn-danger" onClick={goBack}>
        Exit
      </button>
    </div>
  );
}

export default GamePage;
