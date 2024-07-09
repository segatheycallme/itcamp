/* eslint-disable react/prop-types */
import "./HotelCard.css";
import { LiaHotelSolid } from "react-icons/lia";

export default function HotelCard(props) {
  return (
    <div className="hotel-card" style={{ width: 19 * props.size + "%", fontSize: props.size + "em" }}>
      <h2>{props.title}</h2>
      <img src={props.imageUrl} width={270} height={170} />
      <p>{props.content}</p>
      <div className="ono-bitno"><span>{props.rating}</span><span>${props.total}</span></div>
      <button className="show-hotel" onClick={props.onClick} style={{ fontSize: props.size + "em" }}>
        <LiaHotelSolid className="icon" />
        <span>Show Hotel</span>
      </button>
    </div>
  );
}
