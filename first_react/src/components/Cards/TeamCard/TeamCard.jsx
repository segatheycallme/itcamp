import { FaCartArrowDown } from "react-icons/fa";
import "./TeamCard.css";

export default function Hotel(params) {

  return (
    <div className="team-card">
      <h3>{params.team_name}</h3>
      <div className="centar">
        <span className="left">points: </span><span className="right">{params.points}</span>
        <br /><span className="left">matches_played: </span><span className="right">{params.matches_played}</span>
        <br /><span className="left">goals_scored: </span><span className="right">{params.goals_scored}</span>
        <br /><span className="left">goals_conceded: </span><span className="right">{params.goals_conceded}</span>
        <br /><span className="left">wins: </span><span className="right">{params.wins}</span>
        <br /><span className="left">draws: </span><span className="right">{params.draws}</span>
        <br /><span className="left">losses: </span><span className="right">{params.losses}</span>
      </div>
      <FaCartArrowDown onClick={() => params.kalbek(params.team_name)} className="icon" />
    </div>
  );
}
