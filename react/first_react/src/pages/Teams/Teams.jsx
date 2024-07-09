import "./Teams.css";
import { useState } from "react";
import TeamCard from "../../components/Cards/TeamCard/TeamCard.jsx";
import teamsImport from "../../common/teams.json";

export default function Hotel() {
  const [teams, setTeams] = useState(teamsImport.map((el) => { return { ...el, id: (Math.floor(Math.random() * 10000) + (new Date()).getTime() * 10000) } }))
  const kalbek = (id) => {
    setTeams(teams.filter((el) => el.id !== id))
  }
  return (
    <div className="teams">
      {teams.map((val) => {

        return (<TeamCard
          id={val.id}
          key={val.id}
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
