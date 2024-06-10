import { useParams } from "react-router-dom";
import HotelCard from "../../components/Cards/HotelCard/HotelCard";
import hotels from "../../common/hotels.json";
import "./Hotel.css";

export default function Hotel() {
  const { id } = useParams();
  const hotel = hotels.find((hotel) => hotel.id === Number(id));

  return (
    <div className="hotel">

      <HotelCard
        key={hotel.id}
        imageUrl={hotel.imageUrl}
        title={hotel.title}
        content={hotel.content}
        total={hotel.total}
        rating={hotel.rating}
        size={1.2}
        onClick={() => (window.location.href = `/hotels/${hotel.id}`)}
      />

    </div>
  );
}
