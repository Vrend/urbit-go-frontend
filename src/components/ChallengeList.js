import ChallengeEntry from "./ChallengeEntry.js";

function ChallengeList() {
  function buildTable() {
    return (
      <>
        <ChallengeEntry
          our="~zod"
          name="test game"
          id=".~2022..34..as3.fdsa..1324"
          challenger="~zod"
          challenged="~net"
          komi={7.5}
          handicap={0}
          size={9}
          starter="challenger"
        />
        <ChallengeEntry
          our="~zod"
          name="test game 2"
          id=".~2022..xx..a3s.hfsd..4321"
          challenger="~dopzod"
          challenged="~zod"
          komi={7.5}
          handicap={0}
          size={9}
          starter="random"
        />
        <ChallengeEntry
          our="~zod"
          name="test game 3"
          id=".~2022..w4..q81.kljh..9562"
          challenger="~zod"
          challenged="~wet"
          komi={7.5}
          handicap={0}
          size={9}
          starter="challenged"
        />
      </>
    );
  }

  return (
    <div className="container">
      <h2>My Challenges</h2>
      <button className="btn btn-success">Send Challenge</button>
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
          <tbody>{buildTable()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ChallengeList;
