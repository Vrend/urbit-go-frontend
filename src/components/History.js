function History(props) {

    let render_history = (history) => {
        var history_rows = [];
        var turn_count = props.turn - 1;
        var next_turn = history[0];
        var move_diff = null;

        var key_count = 0;

        if(history === null) {
            return(<></>);
        }
        
        if(history.length === 1) {
            move_diff = Object.keys(history[0].m).length > 0 ? "("+Object.keys(history[0].m)[0].replace(" ", ",")+")" : null;
            history_rows.push(
                <tr key={"history"+key_count}>
                    <td>{turn_count}</td>
                    <td>{turn_count%2===1 ? props.black : props.white}</td>
                    <td>{move_diff === null ? "Passed" : move_diff}</td>
                </tr>);
        }


        for(const move of history.slice(1)) {
            move_diff = null;

            for(const coord of Object.keys(next_turn.m)) {
                if(!Object.keys(move.m).includes(coord)) {
                    move_diff = "("+coord.replace(" ", ",")+")"
                    break;
                }
            }
            history_rows.push(
            <tr key={"history"+key_count}>
                <td>{turn_count}</td>
                <td>{turn_count%2===1 ? props.black : props.white}</td>
                <td>{move_diff === null ? "Passed" : move_diff}</td>
            </tr>);
            turn_count -= 1;
            key_count += 1;
            next_turn = move;

            if(turn_count === 1) {
                move_diff = Object.keys(move.m).length > 0 ? "("+Object.keys(move.m)[0].replace(" ", ",")+")" : null;
                history_rows.push(
                    <tr key={"history"+key_count}>
                        <td>{turn_count}</td>
                        <td>{turn_count%2===1 ? props.black : props.white}</td>
                        <td>{move_diff === null ? "Passed" : move_diff}</td>
                    </tr>);
            }

        }
        
        return(<>{history_rows}</>);
    };



    return (
        <div className="h-25 overflow-auto">
            <table className="table table-bordered table-hover text-center">
                <thead className="sticky-top bg-white">
                    <tr>
                        <th scope="col">Turn</th>
                        <th scope="col">Player</th>
                        <th scope="col">Move</th>
                    </tr>
                </thead>
                
                <tbody>
                    {render_history(props.history)}
                </tbody>
                
            </table>
        </div>
    );
}

export default History;
