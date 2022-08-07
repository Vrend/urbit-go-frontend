import GameEntry from "./GameEntry.js";

function GameList(props) {
  function buildTable(games) {
    var entries = [];
    var c = 1;
    for(const game of games) {
      entries.push(<GameEntry
        name={game['name']}
        id={game['game-id']}
        host={game['host']}
        black={game['black']}
        white={game['white']}
        turn={game['turn']}
        key={"game"+c}
        resign_game={props.resign_game}
        />);
        c += 1;
    }
    return(<>{entries}</>)
  }

  return (
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
          <tbody>{buildTable(props.games)}</tbody>
        </table>
      </div>
  );
}

export default GameList;
