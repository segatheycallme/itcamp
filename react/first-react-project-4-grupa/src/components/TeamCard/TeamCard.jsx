import "./TeamCard.css";
import { useState } from "react";

export default function Hotel(params) {
  const [show, setShow] = useState(false);

  // dodati ikonicu sa korpom koja na kliku brise izabrani tim

  return (
    <div className="team" style={{ height: show ? "15vh" : "7vh" }}>
      <div className="gore">
        <span>{params.team_name}</span>
        <span> {params.points}</span>
        <span> {params.matches_played}</span>
        <span> {params.goals_scored}</span>
        <span> {params.goals_conceded}</span>
        <span> {params.wins}</span>
        <span> {params.draws}</span>
        <span> {params.losses}</span>
        <button onClick={() => setShow(!show)}>Klikni me</button>
        <button onClick={() => params.kalbek(params.team_name)}>Klikni me2</button>
      </div>
      {show ? <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis odit cum quaerat architecto voluptas, autem commodi est harum molestiae dicta sint laudantium laborum nostrum quae officia dignissimos aspernatur sequi culpa.</p> : ""}
    </div>
  );
}
