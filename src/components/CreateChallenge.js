import { useState } from "react";
import { Modal } from "react-bootstrap";

function CreateChallenge(props) {
  const [handicapVal, setHandicapVal] = useState(0);

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
            />
          </div>
          <div className="form-group">
            <label htmlFor="challenge-boardsize" className="form-label">
              Board Size
            </label>
            <select className="form-select" id="challenge-boardsize">
              <option>19x19</option>
              <option>13x13</option>
              <option>9x9</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="challenge-order" className="form-label">
              Goes First
            </label>
            <select className="form-select" id="challenge-order">
              <option>Random</option>
              <option>Challenger</option>
              <option>Challenged</option>
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-outline-success">Submit</button>
        <button className="btn btn-outline-secondary" onClick={props.onCancel}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateChallenge;
