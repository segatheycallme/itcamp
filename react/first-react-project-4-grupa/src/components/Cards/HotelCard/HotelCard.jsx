/* eslint-disable react/prop-types */
import "./HotelCard.css";
import { LiaHotelSolid } from "react-icons/lia";

function HotelCard(props) {
  return (
    <div className="card">
      <img src={props?.imageUrl} width={270} height={170} />
      <div className="card-title">{props?.title}</div>
      <div className="card-content">{props?.content}</div>
      <div className="card-text">Per Night</div>
      <div className="card-total">Total ${props.total}</div>
      <button className="card-price" onClick={props.onClick}>
        <LiaHotelSolid className="icon" />
        <p className="button-text">Show Hotel</p>
      </button>
    </div>
  );
}
export default HotelCard;
