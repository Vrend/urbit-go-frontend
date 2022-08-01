import {useState} from 'react';
import ChallengeEntry from "./ChallengeEntry.js";
import CreateChallenge from "./CreateChallenge.js";

function ChallengeList(props) {

  const [showChallengeForm, setChallengeForm] = useState(false);

  function createChallengeHandler() {
    setChallengeForm(true);
  }

  function closeChallengeForm() {
    setChallengeForm(false);
  }

  function submitChallengeForm(challenge) {
    setChallengeForm(false);
    props.send_challenge(challenge);
  }

  function buildTable(challenges, our) {
    var entries = [];
    var c = 1;
    for(const challenge of challenges) {
      entries.push(<ChallengeEntry
        our={"~"+our}
        name={challenge['name']}
        id={challenge['game-id']}
        challenger={challenge['challenger']}
        challenged={challenge['challenged']}
        komi={challenge['komi']}
        handicap={challenge['handicap']}
        size={challenge['board-size']}
        starter={challenge['goes-first']}
        key={"entry"+c}
        withdraw_challenge={props.withdraw_challenge}
        accept_challenge={props.accept_challenge}
        decline_challenge={props.decline_challenge}
        />);
      c += 1;
    }
    return(<>{entries}</>);
  }

  return (
    <div className="container">
      <h2>My Challenges</h2>
      <button className="btn btn-success" onClick={createChallengeHandler}>Send Challenge</button>
      <button className="btn btn-primary ms-1" onClick={props.refresh}>Refresh</button>
      {showChallengeForm && <CreateChallenge onSubmit={submitChallengeForm} onClose={closeChallengeForm}/>}
      <hr />
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Challenger</th>
              <th scope="col">Challenged</th>
              <th scope="col">Komi</th>
              <th scope="col">Handicap</th>
              <th scope="col">Board Size</th>
              <th scope="col">Starting Player</th>
            </tr>
          </thead>
          <tbody>{buildTable(props.challenges, props.our)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ChallengeList;
