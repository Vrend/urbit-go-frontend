import ChallengeList from "./ChallengeList.js";
import GameList from "./GameList.js";
import { useState } from "react";

let parse_challenges_json = (json) => {
  let challenges = json['challenges'];
  var challenge_output = [];
  for(var challenge of challenges) {
    // Add ~ to ship names
    challenge['challenger'] = "~"+challenge['challenger'];
    challenge['challenged'] = "~"+challenge['challenged'];
    // format komi
    challenge['komi'] = challenge['komi'].substring(1);

    challenge_output.push(challenge);
  }
  return challenge_output;
};

function HomePage(props) {

  let get_challenges = async () => {
    return props.api.scry({
      app: "urbit-go",
      path: "/challenges"
    });
  };

  let refresh = () => {
      get_challenges().then(val => set_challenges(parse_challenges_json(val)));
  };

  let send_challenge = async (challenge) => {
    let name = challenge.name;
    let komi = "."+challenge.komi;
    let who = challenge.who;
    let handicap = Number(challenge.handicap);
    var size = 9;
    if(challenge.size === "19x19") {
      size = 19;
    }
    else if(challenge.size === "13x13") {
      size = 13;
    }
    let order = challenge.order.toLowerCase();
    props.api.poke({
      app: "urbit-go",
      mark: "urbit-go-action",
      json: {"challenge":{"name":name, "who": who, "komi": komi, "handicap": handicap, "size": size, "order":order}}
    });
    refresh();
  };

  let withdraw_challenge = async (who) => {
    props.api.poke({
      app: "urbit-go",
      mark: "urbit-go-action",
      json: {"withdraw-challenge":{"who": who}}
    });
    refresh()
  };

  let accept_challenge = async (who) => {
    props.api.poke({
      app: "urbit-go",
      mark: "urbit-go-action",
      json: {"accept-challenge":{"who": who}}
    });
    refresh();
  };

  let decline_challenge = async (who) => {
    props.api.poke({
      app: "urbit-go",
      mark: "urbit-go-action",
      json: {"decline-challenge":{"who": who}}
    });
    refresh();
  };

  const [challenges, set_challenges] = useState([]);

  return (
    <div>
      <br />
      <ChallengeList
        send_challenge={send_challenge}
        withdraw_challenge={withdraw_challenge}
        accept_challenge={accept_challenge}
        decline_challenge={decline_challenge}
        refresh={refresh}
        challenges={challenges}
        our={props.api.ship}/>
      <br />
      <GameList/>
    </div>
  );
}

export default HomePage;
