import GameEntry from "./GameEntry.js";

function GameList() {
  function buildTable() {
    return (
      <>
        <GameEntry
          name="test game 4"
          id=".~2022..w4..q81.kljh..0312"
          host="~zod"
          black="~zod"
          white="~net"
          turn={7}
        />
        <GameEntry
          name="test game 5"
          id=".~2022..w4..q81.kljh..6098"
          host="~dopzod"
          black="~dopzod"
          white="~zod"
          turn={2}
        />
      </>
    );
  }

  return (
    <div className="container">
      <h2>My Games</h2>
      <hr />
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Host</th>
              <th scope="col">Black</th>
              <th scope="col">White</th>
              <th scope="col">Turn</th>
            </tr>
          </thead>
          <tbody>{buildTable()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default GameList;
