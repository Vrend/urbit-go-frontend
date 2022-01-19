import ChallengeEntry from './ChallengeEntry.js';

function ChallengeList() {
  function buildTable() {
    return <ChallengeEntry name='test game' id='.~2022..34..as3.fdsa..1324' challenger='~zod' challenged='~net' komi={7.5} handicap={0} size={9} starter='challenger'/>
  }

  return (
    <div className="container">
      <h1>My Challenges</h1>
      <hr/>
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
