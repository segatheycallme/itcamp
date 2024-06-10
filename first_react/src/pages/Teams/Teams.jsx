import "./Teams.css";
import { useState } from "react";
import TeamCard from "../../components/Cards/TeamCard/TeamCard.jsx";
import teamsImport from "../../common/teams.json";

export default function Hotel() {
  const [teams, setTeams] = useState(teamsImport)
  const kalbek = (name) => {
    setTeams(teams.filter((el) => el.team_name !== name))
  }

  return (
    <div className="teams">
      {teams.map((val, i) => {

        return (<TeamCard
          key={i}
          team_name={val.team_name}
          losses={val.losses}
          points={val.points}
          matches_played={val.matches_played}
          goals_scored={val.goals_scored}
          goals_conceded={val.goals_conceded}
          wins={val.wins}
          draws={val.draws}
          kalbek={kalbek}
        />)
      })}
    </div>
  );
}
