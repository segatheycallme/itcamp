import { useParams } from "react-router-dom";
import "./Hotel.css";
import hotels from "../../common/hotels.json";

function Hotel() {
  const { id } = useParams();
  console.log(hotels);

  return <div>Hotel sa id-jem {id}</div>;
}

export default Hotel;

// Domaci zadatak:

// Obnoviti sledece metode kod nizova:

// forEach()
// map()
// filter()
// reduce()
// find()
// findIndex()
