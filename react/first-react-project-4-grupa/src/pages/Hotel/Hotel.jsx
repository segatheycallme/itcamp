import { useParams } from "react-router-dom";
import HotelCard from "../../components/Cards/HotelCard/HotelCard";
import hotels from "../../common/hotels.json";
import "./Hotel.css";

function Hotel() {
  const { id } = useParams();
  const hotel = hotels.find((hotel) => hotel.id === Number(id));

  return (
    <div className="hotels">

      <HotelCard
        key={hotel.id}
        imageUrl={hotel.imageUrl}
        title={hotel.title}
        content={hotel.content}
        total={hotel.total}
        onClick={() => (window.location.href = `/hotels/${hotel.id}`)}
      />

    </div>
  );
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
