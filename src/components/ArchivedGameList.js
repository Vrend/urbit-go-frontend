import ArchivedGameEntry from "./ArchivedGameEntry.js";

function ArchivedGameList(props) {
  function buildTable(games) {
    var entries = [];
    var c = 1;
    for(const game of games) {
      entries.push(<ArchivedGameEntry
        name={game['name']}
        id={game['game-id']}
        black={game['black']}
        white={game['white']}
        turn={game['turn']}
        result={game['result']}
        key={"agame"+c}
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
              <th scope="col">Black</th>
              <th scope="col">White</th>
              <th scope="col">Turn</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>{buildTable(props.games)}</tbody>
        </table>
      </div>
  );
}

export default ArchivedGameList;
