function ChallengeEntry(props) {
  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>{props.id}</td>
        <td>{props.challenger}</td>
        <td>{props.challenged}</td>
        <td>{props.komi}</td>
        <td>{props.handicap}</td>
        <td>{props.size}</td>
        <td>{props.starter}</td>
        <td><button className='btn btn-outline-primary'>Accept</button></td>
        <td><button className='btn btn-outline-danger'>Decline</button></td>
      </tr>
    </>
  );
}

export default ChallengeEntry;
