import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Pagination.css";

export default function Navbar(props) {
  const arr = [];
  for (let i = 0; i < props.numPages; i++) {
    arr.push(i + 1)
  }

  return (
    <div className="pagination">
      <button className="pag-button" onClick={() => {
        if (props.currentPage > 1) {
          props.setCurrentPage(props.currentPage - 1)
          window.scrollTo(0, 0)
        }
      }}><FaArrowLeft /></button>
      {arr.map((num) => {
        return <button
          className={num == props.currentPage ? "pag-button current" : "pag-button"}
          onClick={() => {
            props.setCurrentPage(num)
            window.scrollTo(0, 0)
          }}><span>{num}</span></button>
      })}
      <button className="pag-button" onClick={() => {
        if (props.currentPage < props.numPages) {
          props.setCurrentPage(props.currentPage + 1)
          window.scrollTo(0, 0)
        }
      }}><FaArrowRight /></button>
    </div>
  );
}
