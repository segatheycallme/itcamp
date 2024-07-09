import HotelCard from "../../components/Cards/HotelCard/HotelCard";
import Pagination from "../../components/Pagination/Pagination";
import hotels from "../../common/hotels.json";
import "./Hotels.css";
import { useState } from "react";

function Hotels() {
  const [page, setPage] = useState(1);
  const elementsPerPage = 8
  const numPages = Math.ceil(hotels.length / elementsPerPage);

  return (
    <>
      <div className="hotels">
        {hotels.slice((page - 1) * elementsPerPage, page * elementsPerPage).map((hotel) => (
          <HotelCard
            key={hotel.id}
            imageUrl={hotel.imageUrl}
            title={hotel.title}
            content={hotel.content}
            total={hotel.total}
            rating={hotel.rating}
            size={1}
            onClick={() => (window.location.href = `/hotels/${hotel.id}`)}
          />
        ))}
      </div>
      <Pagination numPages={numPages} currentPage={page} setCurrentPage={setPage} />
    </>
  );
}

export default Hotels;
