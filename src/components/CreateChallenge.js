import { useState, useRef } from "react";
import { Modal } from "react-bootstrap";

function CreateChallenge(props) {
  const [handicapVal, setHandicapVal] = useState(0);
  const nameRef = useRef();
  const shipRef = useRef();
  const komiRef = useRef();
  const handicapRef = useRef();
  const sizeRef = useRef();
  const orderRef = useRef();

  function submitHandler() {

    const challenge = {
      name: nameRef.current.value,
      who: shipRef.current.value,
      komi: komiRef.current.value,
      handicap: handicapRef.current.value,
      size: sizeRef.current.value,
      order: orderRef.current.value
    }
    //console.log(challenge);
    if(challenge.name === '' || challenge.who === '' || challenge.komi === '') {
      console.log('not filled out');
    }
    else if(!challenge.who.startsWith("~")) {
      console.log('Not a ship');
    }
    else {
      props.onSubmit(challenge);
    }
  }

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Send Challenge</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="challenge-name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="challenge-name"
              placeholder="Enter game name"
              required
              ref={nameRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="challenge-who" className="form-label">
              Who
            </label>
            <input
              type="text"
              className="form-control"
              id="challenge-who"
              placeholder="Enter ship name"
              required
              ref={shipRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="challenge-komi" className="form-label">
              Komi
            </label>
            <input
              type="number"
              className="form-control"
              id="challenge-komi"
              placeholder="Enter komi"
              step="0.5"
              defaultValue="7.5"
              required
              ref={komiRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="challenge-handicap" className="form-label">
              Handicap
            </label>
            <span id="handicap-val" className="float-end">
              {handicapVal}
            </span>
            <input
              type="range"
              className="form-range"
              id="challenge-handicap"
              min="0"
              max="9"
              step="1"
              defaultValue="0"
              onChange={(e) => setHandicapVal(e.target.value)}
              ref={handicapRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="challenge-boardsize" className="form-label">
              Board Size
            </label>
            <select className="form-select" id="challenge-boardsize" ref={sizeRef}>
              <option>19x19</option>
              <option>13x13</option>
              <option>9x9</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="challenge-order" className="form-label">
              Goes First
            </label>
            <select className="form-select" id="challenge-order" ref={orderRef}>
              <option>Random</option>
              <option>Challenger</option>
              <option>Challenged</option>
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-outline-success" onClick={submitHandler}>Submit</button>
        <button className="btn btn-outline-secondary" onClick={props.onClose}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateChallenge;
