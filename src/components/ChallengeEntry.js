import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog.js";

function ChallengeEntry(props) {
  function acceptHandler() {
    setChallengeConfirmation(true);
  }

  function declineHandler() {
    setConfirmation(true);
  }

  function withdrawHandler() {
    setConfirmation(true);
  }

  function closeConfirmationDialog() {
    setConfirmation(false);
    setChallengeConfirmation(false);
  }

  function confirmWithdraw() {
    setConfirmation(false);
    setChallengeConfirmation(false);
    props.withdraw_challenge(props.challenged);
  }

  function confirmDecline() {
    setConfirmation(false);
    setChallengeConfirmation(false);
    props.decline_challenge(props.challenger);
  }

  function confirmAccept() {
    setConfirmation(false);
    setChallengeConfirmation(false);
    props.accept_challenge(props.challenger);
  }

  const [showConfirmation, setConfirmation] = useState(false);
  const [acceptChallengeConfirmation, setChallengeConfirmation] = useState(false);

  function isOurs() {
    if (props.our === props.challenger) {
      return (
        <>
          <td>
            <button
              className="btn btn-outline-warning"
              onClick={withdrawHandler}
            >
              Withdraw
            </button>
          </td>
          {showConfirmation && (
            <ConfirmationDialog
              onCancel={closeConfirmationDialog}
              onConfirm={confirmWithdraw}
              label="Withdrawal"
            />
          )}
        </>
      );
    } else if (props.our === props.challenged) {
      return (
        <>
          <td>
            <div className="btn-group" role="group">
              <button
                className="btn btn-outline-primary pr-1"
                onClick={acceptHandler}
              >
                Accept
              </button>
              <button
                className="btn btn-outline-danger ml-1"
                onClick={declineHandler}
              >
                Decline
              </button>
            </div>
          </td>
          {showConfirmation && (
            <ConfirmationDialog
              onCancel={closeConfirmationDialog}
              onConfirm={confirmDecline}
              label="Decline"
            />
          )}
          {acceptChallengeConfirmation && (
            <ConfirmationDialog
              onCancel={closeConfirmationDialog}
              onConfirm={confirmAccept}
              label="Accept"
            />
          )}
        </>
      );
    } else {
      return (
        <>
          <td></td>
        </>
      );
    }
  }

  var starter = "Random";
  if (props.starter === "challenger") {
    starter = props.challenger;
  } else if (props.starter === "challenged") {
    starter = props.challenged;
  }

  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>{props.id}</td>
        <td>{props.challenger}</td>
        <td>{props.challenged}</td>
        <td>{props.komi}</td>
        <td>{props.handicap}</td>
        <td>{props.size+'x'+props.size}</td>
        <td>{starter}</td>
        {isOurs()}
      </tr>
    </>
  );
}

export default ChallengeEntry;
